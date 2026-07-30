import os
import json
import urllib.request
import urllib.error
import ssl

with open('/home/henrique-carvalho/Documentos/dev/moraris/docker-compose.yaml', 'r') as f:
    compose_content = f.read()

# I will use the variables defined in update_stack.py but update DATABASE_URL 
# to match the current .env.
env_vars = [
    {"name":"SECRET_KEY","value":"sua-secret-key-super-segura"},
    {"name":"DEBUG","value":"True"},
    {"name":"ALLOWED_HOSTS","value":"moraris.griddmkt360.com.br, www.moraris.griddmkt360.com.br"},
    {"name":"DATABASE_URL","value":"postgresql://postgres.ndlcnmaaeoscvjbawjzj:LnueYwzF5WsHfpra@aws-1-us-east-2.pooler.supabase.com:6543/postgres"},
    {"name":"SUPABASE_URL","value":"postgresql://postgres.ndlcnmaaeoscvjbawjzj:LnueYwzF5WsHfpra@aws-1-us-east-2.pooler.supabase.com:6543/postgres"},
    {"name":"SUPABASE_ANON_KEY","value":"${SUPABASE_ANON_KEY}"},
    {"name":"USE_SUPABASE_STORAGE","value":"True"},
    {"name":"AWS_ACCESS_KEY_ID","value":"aa5da95edc16e4b99866c540fc19fe6e"},
    {"name":"AWS_SECRET_ACCESS_KEY","value":"3ed48c8c14d3e8cefb6b5a38a824c4a38b8bd932eb2a1c4be7943a7e91169d11"},
    {"name":"AWS_STORAGE_BUCKET_NAME","value":"moraris"},
    {"name":"AWS_S3_ENDPOINT_URL","value":"https://ndlcnmaaeoscvjbawjzj.storage.supabase.co/storage/v1/s3"},
    {"name":"AWS_S3_REGION_NAME","value":"us-east-2"}
]

payload = {
    "StackFileContent": compose_content,
    "Env": env_vars,
    "Prune": True
}

req = urllib.request.Request(
    'https://portainer.griddmkt360.com.br/api/stacks/8?endpointId=3',
    data=json.dumps(payload).encode('utf-8'),
    headers={
        'X-API-Key': 'ptr_9n29x5w2M1Io7IQAZAUcjrR+4lnmsjcnLVh3m/oJ4ng=',
        'Content-Type': 'application/json'
    },
    method='PUT'
)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    with urllib.request.urlopen(req, context=ctx) as response:
        print(f"Status Code: {response.getcode()}")
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code} - {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
