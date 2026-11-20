#!/usr/bin/env python3
"""Deploy static ZTalk PWA to Vercel project zhi-talk. No build, output=root."""
import base64, json, os, sys, time, urllib.request, urllib.error

TOKEN = open(os.path.expanduser('~/.config/undangin/vercel.token')).read().strip()
PROJ = 'prj_n2bgZcLa6EVFSIrDKyw9w3CC4DYx'
TEAM = 'team_wYvRGvgtrsM47fZa4eU4sm1M'
BASE = 'https://api.vercel.com'
ROOT = '/home/mada/projects/ztalk'
FILES = ['index.html', 'app.js', 'styles.css', 'manifest.webmanifest', 'sw.js', 'icon.svg']

def req(method, url, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, method=method)
    r.add_header('Authorization', 'Bearer ' + TOKEN)
    r.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(r) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        print('HTTP', e.code, e.read().decode(), file=sys.stderr)
        sys.exit(1)

files = []
for f in FILES:
    with open(os.path.join(ROOT, f), 'rb') as fh:
        files.append({'file': f, 'data': base64.b64encode(fh.read()).decode()})

payload = {
    'name': 'zhi-talk',
    'project': PROJ,
    'files': files,
    'target': 'production',
    'projectSettings': {'framework': None, 'buildCommand': None, 'outputDirectory': None},
}
dep = req('POST', f'{BASE}/v13/deployments?teamId={TEAM}', payload)
did = dep.get('id') or dep.get('error', {}).get('message', 'unknown')
print('deployment_id', did)
if dep.get('error'):
    sys.exit(1)

for i in range(30):
    time.sleep(5)
    st = req('GET', f'{BASE}/v13/deployments/{did}?teamId={TEAM}')
    rs = st.get('readyState')
    print(i, rs)
    if rs == 'READY':
        print('deployment_url', 'https://' + st['url'])
        sys.exit(0)
    if rs in ('ERROR', 'CANCELED'):
        print(st, file=sys.stderr)
        sys.exit(1)
print('timeout', file=sys.stderr)
sys.exit(1)
