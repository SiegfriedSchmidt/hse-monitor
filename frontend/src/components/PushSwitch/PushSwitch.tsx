import React from 'react';
import {Flex, Switch, Text} from "@chakra-ui/react";
import useUserSettings from "../../hooks/useUserSettings.tsx";
import getPushApplicationServerKey from "../../api/getPushApplicationServerKey.ts";
import useConfiguredToast from "../../hooks/useConfiguredToast.tsx";
import changePushSubscription from "../../api/changePushSubscription.ts";
import {getPushPermission, registerServiceWorker, subscribeNotifications} from "../../utils/pushNotifications.ts";

const PushSwitch = () => {
  const {userSettings, addUserSettings} = useUserSettings()
  const {errorToast, successToast} = useConfiguredToast()

  async function onChange(checked: boolean) {
    if (checked) {
      try {
        let rs = await getPushApplicationServerKey()
        if (rs.status !== "success") {
          return errorToast('Ошибка получения ключа для подписки!')
        }

        await registerServiceWorker('./service-worker.js')
        await getPushPermission()
        const subscription = await subscribeNotifications(rs.content.applicationServerKey)

        rs = await changePushSubscription({pushEnabled: checked, subscription})
        if (rs.status !== "success") {
          return errorToast('Ошибка отправки подписки на сервер!')
        }
        addUserSettings({pushEnabled: checked, subId: rs.content})
        successToast('Всплывающие уведомления включены')
      } catch (error) {
        console.error(error)
        return errorToast(`Ошибка подписки на уведомления! ${error}`)
      }
    } else {
      const rs = await changePushSubscription({pushEnabled: checked, subId: userSettings.subId})
      if (rs.status !== "success") {
        return errorToast('Ошибка выключения уведомлений!')
      }
      addUserSettings({pushEnabled: checked, subId: 0})
      successToast('Всплывающие уведомления выключены')
    }
  }

  return (
    <Flex m={5} alignItems='center'>
      <Text mr={5}>Включить всплывающие уведомления</Text>
      <Switch size='lg' defaultChecked={userSettings.pushEnabled} onChange={(e) => onChange(e.currentTarget.checked)}/>
    </Flex>
  );
};

export default PushSwitch;