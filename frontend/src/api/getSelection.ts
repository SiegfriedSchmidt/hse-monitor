import {api} from "./api.ts";
import DirectionType from "../types/DirectionType.ts";

const stubStats = [
  {id: 0, time: '10.07.2024 11:00:38'},
  {id: 1, time: '09.07.2024 11:00:38'},
  {id: 2, time: '08.07.2024 11:00:38'},
  {id: 3, time: '07.07.2024 11:00:38'},
  {id: 4, time: '06.07.2024 11:00:38'}
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
  const rs = await api.get("/stats/getSelection");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rs)
    }, 1000)
  })
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({status: 'success', content: stubDirections})
  //   }, 5000)
  // })
}