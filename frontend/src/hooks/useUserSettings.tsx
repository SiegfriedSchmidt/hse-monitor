import {useContext} from "react";
import {UserSettingsContext} from "../context/UserSettingsContext.tsx";
import UserSettings from "../types/UserSettings.ts";

export default function useUserSettings() {
  const {userSettings, setUserSettings} = useContext(UserSettingsContext);

  function addUserSettings(userSettings: UserSettings) {
    setUserSettings(userSettings);
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  }

  function removeUserSettings() {
    setUserSettings(null)
    localStorage.removeItem("userSettings")
  }

  return {userSettings, addUserSettings, removeUserSettings};
}