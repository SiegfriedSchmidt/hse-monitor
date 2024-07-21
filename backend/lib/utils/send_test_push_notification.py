import requests


def send_push_notification(token, domain, title, body):
    rs = requests.post(
        domain + '/api/internal/send_push_notifications',
        headers={'token': token},
        json={'title': title, 'body': body}
    )

    if rs.status_code != 200:
        return print(rs.text)
    else:
        print(rs.json())
