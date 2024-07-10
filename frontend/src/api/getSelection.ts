import {api} from "./api.ts";

const stubDirections = [
  'Прикладная математика и информатика',
  'Прикладная математика',
  'ИВТ',
  'Программная инженерия',
  'Информационная безопасность',
]

const stubDates = [
  '10.07.2024 11:00:38',
  '09.07.2024 11:00:38',
  '08.07.2024 11:00:38',
  '07.07.2024 11:00:38',
  '06.07.2024 11:00:38'
]

export default async function getSelection(): Promise<{
  status: string,
  content: { 'directions': string[], 'dates': string[] }
}> {
  // return await api.get("/getSelection");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({status: 'success', content: {directions: stubDirections, dates: stubDates}})
    }, 1000)
  })
}