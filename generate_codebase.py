import os

def save(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content.strip() + '\n')
    print(f'[OK] {path}')

print('generate_codebase.py initialized')
