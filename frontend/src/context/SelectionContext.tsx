import {createContext, FC, ReactNode, useEffect, useState} from "react";
import getSelection from "../api/getSelection.ts";


interface SelectionContextProps {
  directions: string[]
  directionIdx: number
  dates: string[]
  dateIdx: number
  setDirectionIdx: (directionIdx: number) => void
  setDateIdx: (directionIdx: number) => void
}

export const SelectionContext = createContext<SelectionContextProps>({
  directions: [],
  directionIdx: 0,
  dates: [],
  dateIdx: 0,
  setDirectionIdx: () => {
  },
  setDateIdx: () => {
  }
});

interface SelectionContextProviderProps {
  children: ReactNode
}

export const DirectionContextProvider: FC<SelectionContextProviderProps> = ({children}) => {
  const [directions, setDirections] = useState<string[]>([])
  const [directionIdx, setDirectionIdx] = useState<number>(0)
  const [dates, setDates] = useState<string[]>([])
  const [dateIdx, setDateIdx] = useState<number>(0)

  useEffect(() => {
    async function getData() {
      const rs = await getSelection()
      if (rs.status !== 'success') {
        return
      }
      setDirections(rs.content.directions)
      setDates(rs.content.dates)
    }

    getData()
  }, []);

  return (
    <SelectionContext.Provider value={{directions, directionIdx, setDirectionIdx, dates, dateIdx, setDateIdx}}>
      {children}
    </SelectionContext.Provider>
  );
}