#!/usr/bin/env python3
import json, time, sys, urllib.request, urllib.error, os

TOKEN = open(os.path.expanduser('~/.config/undangin/vercel.token')).read().strip()
TEAM='team_wYvRGvgtrsM47fZa4eU4sm1M'; BASE='https://api.vercel.com'

def req(m,u,b=None):
    d=json.dumps(b).encode() if b is not None else None
    r=urllib.request.Request(u,data=d,method=m)
    r.add_header('Authorization','Bearer '+TOKEN)
    r.add_header('Content-Type','application/json')
    try:
        with urllib.request.urlopen(r) as x: return json.loads(x.read().decode())
    except urllib.error.HTTPError as e:
        return {'_err':e.code,'_body':e.read().decode()[:400]}

body={'name':'zhi-talk','target':'production',
      'gitSource':{'type':'github','repoId':1163158149,'ref':'master'}}
dep=req('POST',f'{BASE}/v13/deployments?teamId={TEAM}&skipAutoDetectionConfirmation=1',body)
if not dep.get('id'):
    print(json.dumps(dep)[:400]); sys.exit(1)
print('triggered id', dep['id'], 'state', dep.get('readyState'), 'gitSha', dep.get('gitSource',{}).get('sha'))
did=dep['id']
for i in range(36):
    time.sleep(5)
    st=req('GET',f'{BASE}/v13/deployments/{did}?teamId={TEAM}')
    rs=st.get('readyState'); sha=st.get('gitSource',{}).get('sha')
    print(i,rs,sha)
    if rs=='READY':
        print('url',st.get('url'),'alias',st.get('alias'))
        sys.exit(0)
    if rs in ('ERROR','CANCELED'):
        print(json.dumps(st)[:500]); sys.exit(1)
print('timeout')
