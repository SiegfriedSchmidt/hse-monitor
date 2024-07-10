import {api} from "./api.ts";

const stubStatistic = [
  {
    "type": "stats",
    "head": "Информация о направлении",
    "values": [{"text": "Бюджетные места", "value": "165", "diff": 0}, {
      "text": "Платные места",
      "value": "80",
      "diff": 0
    }]
  },
  {
    "type": "stats",
    "head": "Общая статистика",
    "values": [{"text": "Количество заявлений:", "value": "1375", "diff": 0}, {
      "text": "Целевое:",
      "value": "17",
      "diff": 1
    }, {"text": "БВИ:", "value": "118", "diff": 0}, {
      "text": "Отдельная квота:",
      "value": "63",
      "diff": 0
    }, {"text": "Особое право:", "value": "56", "diff": 0}, {
      "text": "Оригинал аттестата:",
      "value": "159",
      "diff": -1
    }, {
      "text": "Проходной балл на бюджет:",
      "value": "Занято абитуриентами в приоритетном порядке",
      "diff": 0
    }, {"text": "Бюджет:", "value": "727", "diff": 0}, {
      "text": "Коммерция:",
      "value": "146",
      "diff": 0
    }, {"text": "Бюджет и коммерция:", "value": "502", "diff": 0}]
  },
  {
    "type": "stats",
    "head": "Первый приоритет",
    "values": [{"text": "Количество заявлений:", "value": "621", "diff": 0}, {
      "text": "Целевое:",
      "value": "5",
      "diff": 0
    }, {"text": "БВИ:", "value": "115", "diff": 0}, {
      "text": "Отдельная квота:",
      "value": "19",
      "diff": 0
    }, {"text": "Особое право:", "value": "30", "diff": 0}, {
      "text": "Оригинал аттестата:",
      "value": "106",
      "diff": 0
    }, {
      "text": "Проходной балл на бюджет:",
      "value": "Занято абитуриентами в приоритетном порядке",
      "diff": 0
    }, {"text": "Бюджет:", "value": "357", "diff": 0}, {
      "text": "Коммерция:",
      "value": "0",
      "diff": 0
    }, {"text": "Бюджет и коммерция:", "value": "264", "diff": 0}]
  }

]

export default async function getStatistic(directionIdx: number, dateIdx: number): Promise<{
  status: string,
  content: any[]
}> {
  // return await api.get("/getStatistic");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({status: 'success', content: stubStatistic})
    }, 1000)
  })
}