import subprocess
import os
from pathlib import Path


def generate_secret():
    return subprocess.run(['openssl', 'rand', '-base64', '32'], stdout=subprocess.PIPE).stdout.decode()


def generate_webpush_keys():
    subprocess.run(['vapid', '--gen'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    output = subprocess.run(['vapid', '--applicationServerKey'], stdout=subprocess.PIPE).stdout.decode()
    return output.split()[-1].strip()


def mv_pem_keys(secret_folder_path):
    subprocess.run(['mv', 'private_key.pem', secret_folder_path], stdout=subprocess.DEVNULL)
    subprocess.run(['mv', 'public_key.pem', secret_folder_path], stdout=subprocess.DEVNULL)


def main():
    secret_folder_path = Path(os.environ.get("SECRET_FOLDER_PATH", Path(__file__).parent.parent.absolute() / 'secret'))
    env_file_path = secret_folder_path / '.env'
    pem_private_key_path = secret_folder_path / 'private_key.pem'
    pem_public_key_path = secret_folder_path / 'public_key.pem'

    print('Start generate secrets tool...')
    if secret_folder_path.exists():
        print('Secret folder already exists.')
        env_file_exists = env_file_path.exists()
        pem_private_key_exists = pem_private_key_path.exists()
        pem_public_key_exists = pem_public_key_path.exists()

        if not env_file_exists:
            print('.env file missing.')
        if not pem_private_key_exists:
            print('Webpush pem private key missing.')
        if not pem_public_key_exists:
            print('Webpush pem public key missing.')

        if env_file_exists and pem_private_key_exists and pem_public_key_exists:
            print('All secrets already generated.')
            exit()

        if env_file_exists:
            os.remove(env_file_path)
        if pem_private_key_exists:
            os.remove(pem_private_key_path)
        if pem_public_key_exists:
            os.remove(pem_public_key_path)

    else:
        os.mkdir(secret_folder_path)
        print('Creating secret folder.')

    print('Generating webpush server keys.')
    application_server_key = generate_webpush_keys()
    mv_pem_keys(secret_folder_path)

    print('Generating other secrets.')
    with open(secret_folder_path / '.env', 'w') as file:
        file.writelines([
            f'JWT_SECRET_KEY={generate_secret()}',
            f'INTERNAL_TOKEN={generate_secret()}',
            f'APPLICATION_SERVER_KEY={application_server_key}\n'
        ])

    print('All secrets generated successfully.')


if __name__ == '__main__':
    main()
