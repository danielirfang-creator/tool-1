import json, os

tools_path = 'src/config/tools.ts'
os.makedirs(os.path.dirname(tools_path), exist_ok=True)

# We will write tools.ts by combining header, flooring, painting, concrete, garden, rooms, conversions
print('gen_tools.py ready')
