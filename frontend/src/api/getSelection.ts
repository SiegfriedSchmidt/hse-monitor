import {api} from "./api.ts";
import DirectionType from "../types/DirectionType.ts";

const stubStats = [
  {id: 0, time: new Date('10.07.2024 11:00:38')},
  {id: 1, time: new Date('09.07.2024 11:00:38')},
  {id: 2, time: new Date('08.07.2024 11:00:38')},
  {id: 3, time: new Date('07.07.2024 11:00:38')},
  {id: 4, time: new Date('06.07.2024 11:00:38')}
]

const stubDirections: DirectionType[] = [
  {
    name: 'Прикладная математика и информатика',
    stats: stubStats
  },
  {
    name: 'Прикладная математика',
    stats: stubStats
  },
  {
    name: 'ИВТ',
    stats: stubStats
  },
  {
    name: 'Программная инженерия',
    stats: stubStats
  },
  {
    name: 'Информационная безопасность',
    stats: stubStats
  }
]


export default async function getSelection(): Promise<{
  status: string,
  content: DirectionType[]
}> {
  // return await api.get("/getSelection");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({status: 'success', content: stubDirections})
    }, 1000)
  })
}