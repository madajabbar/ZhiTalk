#!/usr/bin/env python3
import json, sys, urllib.request, urllib.error

TOKEN=open('/home/mada/.config/undangin/vercel.token').read().strip()
PRJ='prj_n2bgZcLa6EVFSIrDKyw9w3CC4DYx'
TEAM='team_wYvRGvgtrsM47fZa4eU4sm1M'
BASE='https://api.vercel.com'

def req(m,u,b=None):
    d=json.dumps(b).encode() if b is not None else None
    r=urllib.request.Request(u,data=d,method=m)
    r.add_header('Authorization','Bearer '+TOKEN)
    r.add_header('Content-Type','application/json')
    try:
        with urllib.request.urlopen(r) as x: return json.loads(x.read().decode())
    except urllib.error.HTTPError as e:
        return {'_err':e.code,'_body':e.read().decode()[:400]}

act=sys.argv[1]
if act=='dom':
    print(json.dumps(req('GET',f'{BASE}/v10/projects/{PRJ}/domains/ztalk.akusedang.online?teamId={TEAM}'),indent=1))
elif act=='redeploy':
    body={'name':'zhi-talk','target':'production',
          'gitSource':{'type':'github','repoId':1163158149,'ref':'master'}}
    print(json.dumps(req('POST',f'{BASE}/v13/deployments?teamId={TEAM}&skipAutoDetectionConfirmation=1',body),indent=1))
elif act=='deployments':
    deps=req('GET',f'{BASE}/v6/deployments?projectId={PRJ}&teamId={TEAM}&limit=5')
    for d in deps.get('deployments',[]):
        print(d.get('uid'),d.get('state'),d.get('url'),'alias=',d.get('alias'),'target=',d.get('target'))
