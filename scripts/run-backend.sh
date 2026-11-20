#!/usr/bin/env bash
# ZTalk backend launcher — reads key from /home/mada/.secrets/ztalk_api_key
export ZTALK_API_KEY="$(tr -d '[:space:]' < /home/mada/.secrets/ztalk_api_key)"
cd /home/mada/projects/ztalk/backend
exec /usr/bin/python3 -m uvicorn app:app --host 127.0.0.1 --port 3012
