import {createContext, FC, ReactNode, useState} from "react";
import UserSettings from "../types/UserSettings.ts";


interface UserSettingsContextProps {
  userSettings: UserSettings,
  setUserSettings: (userSettings: UserSettings) => void
}

export const UserSettingsContext = createContext<UserSettingsContextProps>({
  userSettings: {pushEnabled: false, subId: 0},
  setUserSettings: () => {
  }
});

interface UserSettingsContextProviderProps {
  children: ReactNode
}

export const UserSettingsContextProvider: FC<UserSettingsContextProviderProps> = ({children}) => {
  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    const storedUserSettings = localStorage.getItem("userSettings")
    return storedUserSettings ? JSON.parse(storedUserSettings) : {pushEnabled: false, subId: 0}
  })

  return (
    <UserSettingsContext.Provider value={{userSettings, setUserSettings}}>
      {children}
    </UserSettingsContext.Provider>
  );
}