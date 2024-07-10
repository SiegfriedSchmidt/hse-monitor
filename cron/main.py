import io
import json

import pandas
import requests
import hashlib
import openpyxl
import numpy as np
import pandas as pd
import pydantic


class TableHead(pydantic.BaseModel):
    name: str
    time: str
    budget_places: int
    paid_places: int


def download_file(url):
    return requests.get(url, allow_redirects=True).content


def write_file(content: bytes, path):
    with open(path, 'wb') as file:
        file.write(content)


def read_file(path):
    with open(path, 'rb') as file:
        return file.read()


def md5(content: bytes):
    return hashlib.md5(content).hexdigest()


def get_table_head(file: io.BytesIO):
    wb = openpyxl.load_workbook(file)
    ws = wb.active
    name = ws['A2'].value
    time = ws['F5'].value
    budget_places = ws['F8'].value
    paid_places = ws['F10'].value
    return TableHead(name=name, time=time, budget_places=budget_places, paid_places=paid_places)


def add_stat(values: [], text: str, value: str | int, diff=0):
    values.append({'text': text, 'value': str(value), 'diff': diff})


def print_stat(string: str, data):
    print(f'{string:<27}{data}')


def get_stats(df: pandas.DataFrame, head: str, budget_places: int):
    values = []

    all_applications = df.shape[0]
    add_stat(values, "Количество заявлений:", all_applications)

    target = df[df['Поступление на места в рамках квоты\nцелевого приема'] == 'Да'].shape[0]
    add_stat(values, "Целевое:", target)

    wat = df[df['Право поступления\nбез вступительных испытаний'] == 'Да'].shape[0]
    add_stat(values, "БВИ:", wat)

    separate_quota = df[df['Поступление на места\nв рамках отдельной квоты'] == 'Да'].shape[0]
    add_stat(values, "Отдельная квота:", separate_quota)

    special_right = df[df['Поступление на места в рамках квоты \nдля лиц, имеющих особое право'] == 'Да'].shape[0]
    add_stat(values, "Особое право:", special_right)

    original = df[df['Оригинал аттестата'] == 'Да'].shape[0]
    add_stat(values, "Оригинал аттестата:", original)

    last_budget = df.iloc[budget_places - 1]
    if (last_budget['Поступление на места в рамках квоты\nцелевого приема'] == "Да") or \
            (last_budget['Право поступления\nбез вступительных испытаний'] == "Да") or \
            (last_budget['Поступление на места\nв рамках отдельной квоты'] == "Да") or \
            (last_budget['Поступление на места в рамках квоты \nдля лиц, имеющих особое право'] == "Да"):
        last_budget = "Занято абитуриентами в приоритетном порядке"
    else:
        last_budget = last_budget["Сумма конкурсных баллов"]
    add_stat(values, "Проходной балл на бюджет:", last_budget)

    budget = df[df['Вид места'] == 'Б'].shape[0]
    add_stat(values, "Бюджет:", budget)

    paid = df[df['Вид места'] == 'К'].shape[0]
    add_stat(values, "Коммерция:", paid)

    budget_paid = df[(df['Вид места'] == 'Б; К') | (df['Вид места'] == 'К; Б')].shape[0]
    add_stat(values, "Бюджет и коммерция:", budget_paid)

    return {'type': 'stats', 'head': head, 'values': values}


def parse_xlsx(file: io.BytesIO):
    table_head = get_table_head(file)
    stats = {'type': 'stats', 'head': 'Информация о направлении', 'values': [
        {'text': 'Бюджетные места', 'value': str(table_head.budget_places), 'diff': 0},
        {'text': 'Платные места', 'value': str(table_head.paid_places), 'diff': 0}
    ]}
    print(json.dumps(stats, ensure_ascii=False))

    df = pd.read_excel(file, index_col=0, header=14, engine='openpyxl')
    df: pandas.DataFrame = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    # print(df.columns)
    stats = get_stats(df, 'Общая статистика', table_head.budget_places)
    print(json.dumps(stats, ensure_ascii=False))

    df_first_priority: pandas.DataFrame = df[df['Приоритет иных мест'] == 1]
    stats = get_stats(df_first_priority, 'Первый приоритет', table_head.budget_places)
    print(json.dumps(stats, ensure_ascii=False))


def main():
    # content = download_file('https://enrol.hse.ru/storage/public_report_2024/moscow/Bachelors/BD_moscow_AM_O.xlsx')
    # content = download_file('https://enrol.hse.ru/storage/public_report_2024/moscow/Bachelors/BD_moscow_AMI_O.xlsx')
    # write_file(content, 'files/Направление 01.03.04 Прикладная математика.xlsx')
    # write_file(content, 'files/Направление 01.03.02 Прикладная математика и информатика.xlsx')
    # content = read_file('files/Направление 01.03.04 Прикладная математика.xlsx')
    content = read_file('files/Направление 01.03.02 Прикладная математика и информатика.xlsx')
    md5_hash = md5(content)
    print(md5_hash)
    parse_xlsx(io.BytesIO(content))


if __name__ == '__main__':
    main()
