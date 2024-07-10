import {createContext, FC, ReactNode, useEffect, useState} from "react";
import getSelection from "../api/getSelection.ts";
import DirectionType from "../types/DirectionType.ts";


interface SelectionContextProps {
  directions: DirectionType[] | undefined
  directionIdx: number
  statIdx: number
  setDirectionIdx: (directionIdx: number) => void
  setStatIdx: (timeIdx: number) => void
}

export const SelectionContext = createContext<SelectionContextProps>({
  directions: undefined,
  directionIdx: 0,
  statIdx: 0,
  setDirectionIdx: () => {
  },
  setStatIdx: () => {
  }
});

interface SelectionContextProviderProps {
  children: ReactNode
}

export const DirectionContextProvider: FC<SelectionContextProviderProps> = ({children}) => {
  const [directions, setDirections] = useState<DirectionType[] | undefined>(undefined)
  const [directionIdx, setDirectionIdx] = useState<number>(0)
  const [statIdx, setStatIdx] = useState<number>(0)

  useEffect(() => {
    async function getData() {
      const rs = await getSelection()
      if (rs.status !== 'success') {
        return
      }
      setDirections(rs.content)
    }

    getData()
  }, []);

  return (
    <SelectionContext.Provider value={{directions, directionIdx, setDirectionIdx, statIdx, setStatIdx}}>
      {children}
    </SelectionContext.Provider>
  );
}