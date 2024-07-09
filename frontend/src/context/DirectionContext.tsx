import {createContext, FC, ReactNode, useEffect, useState} from "react";
import getDirections from "../api/getDirections.ts";


interface DirectionContextProps {
  directions: string[]
  directionIdx: number
  setDirectionIdx: (directionIdx: number) => void
}

export const DirectionContext = createContext<DirectionContextProps>({
  directions: [],
  directionIdx: -1,
  setDirectionIdx: () => {
  }
});

interface DirectionContextProviderProps {
  children: ReactNode
}

export const DirectionContextProvider: FC<DirectionContextProviderProps> = ({children}) => {
  const [directions, setDirections] = useState<string[]>([])
  const [directionIdx, setDirectionIdx] = useState<number>(0)

  useEffect(() => {
    async function getData() {
      const rs = await getDirections()
      if (rs.status !== 'success') {
        return
      }
      setDirections(rs.content)
    }

    getData()
  }, []);

  return (
    <DirectionContext.Provider value={{directions, directionIdx, setDirectionIdx}}>
      {children}
    </DirectionContext.Provider>
  );
}