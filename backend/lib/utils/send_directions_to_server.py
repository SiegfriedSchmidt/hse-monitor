import requests


def decorator_add_direction(token, domain):
    def wrapped(name, url):
        add_one_direction(token, domain, name, url)

    return wrapped


def add_one_direction(token, domain, name, url):
    rs = requests.post(
        domain + '/api/internal/add_direction',
        headers={'token': token},
        json={'name': name, 'url': url}
    )

    if rs.status_code != 200:
        return print(rs.text)
    else:
        print(rs.json())


def add_hse_directions(token, domain):
    add_direction = decorator_add_direction(token, domain)
    add_direction(
        'Прикладная математика',
        'https://enrol.hse.ru/storage/public_report_2024/moscow/Bachelors/BD_moscow_AM_O.xlsx'
    )
    add_direction(
        'Информатика и вычислительная техника',
        'https://enrol.hse.ru/storage/public_report_2024/moscow/Bachelors/BD_moscow_IVT_O.xlsx'
    )
    add_direction(
        'Прикладная математика и информатика',
        'https://enrol.hse.ru/storage/public_report_2024/moscow/Bachelors/BD_moscow_AMI_O.xlsx'
    )
    add_direction(
        'Программная инженерия',
        'https://enrol.hse.ru/storage/public_report_2024/moscow/Bachelors/BD_moscow_SE_O.xlsx'
    )
