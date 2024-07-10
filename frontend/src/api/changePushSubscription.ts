import {api} from "./api.ts";

interface subscriptionParamsInterface {
  pushEnabled: boolean,
  subscription?: string,
  subId?: number
}

export default async function changePushSubscription(params: subscriptionParamsInterface) {
  return await api.post("/push/change_subscription", params)
}