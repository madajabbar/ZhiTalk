#!/usr/bin/env python3
import json, sys, urllib.request, urllib.error, base64

tok = open('/home/mada/.cloudflared/cert.pem').read()
jwt = tok.split('-----')[2].strip() + '=' * (-len(tok.split('-----')[2].strip()) % 4)
info = json.loads(base64.urlsafe_b64decode(jwt))
ZONE = info['zoneID']
API = info['apiToken']
ZONE_ID = '91eedb18862476ecf36b10470a372849'  # akusedang.online

def req(method, url, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, method=method)
    r.add_header('Authorization', 'Bearer ' + API)
    r.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(r) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return {'_http_error': e.code, '_body': e.read().decode()[:400]}

act = sys.argv[1]
if act == 'zones':
    print(json.dumps(req('GET', 'https://api.cloudflare.com/client/v4/zones?name=akusedang.online')))
elif act == 'list':
    print(json.dumps(req('GET', f'https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records?type=CNAME&per_page=100')))
elif act == 'create':
    body = {'type': 'CNAME', 'name': 'ztalk', 'content': 'cname.vercel-dns.com', 'proxied': False, 'ttl': 1}
    print(json.dumps(req('POST', f'https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records', body)))
elif act == 'delete':
    rid = sys.argv[2]
    print(json.dumps(req('DELETE', f'https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records/{rid}')))
