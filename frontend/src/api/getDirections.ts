import {api} from "./api.ts";

const stubDirections = [
  'Прикладная математика и информатика',
  'Прикладная математика',
  'ИВТ',
  'Программная инженерия',
  'Информационная безопасность',
]

export default async function getDirections(): Promise<{ status: string, content: string[] }> {
  // return await api.get("/getDirections");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({status: 'success', content: stubDirections})
    }, 1000)
  })
}