"""ZTalk backend — API + SQLite on Hermes machine.

Runs: uvicorn app:app --host 127.0.0.1 --port 3011
Auth: API key via header `x-api-key` (env ZTALK_API_KEY). Required for:
  - POST /api/assignments (Moona posts assignment)
  - GET  /api/assignments/{id}/submissions (Moona reads submissions)
  - DELETE /api/assignments/{id}
Read routes for Mada's app (assignments list, attempts save, progress) are open.
"""
import os, sqlite3, base64, datetime, pathlib, uuid

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ROOT = pathlib.Path(__file__).resolve().parent
DATA = ROOT / "data"
IMG = DATA / "images"
IMG.mkdir(parents=True, exist_ok=True)
DB = DATA / "ztalk.db"

KEY = os.environ.get("ZTALK_API_KEY", "")
if not KEY:
    raise SystemExit("ZTALK_API_KEY env required")

app = FastAPI(title="ZTalk API")
app.mount("/images", StaticFiles(directory=IMG), name="images")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


def conn():
    c = sqlite3.connect(DB)
    c.row_factory = sqlite3.Row
    return c


def init():
    c = conn()
    c.executescript("""
    CREATE TABLE IF NOT EXISTS assignments(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      characters TEXT NOT NULL,
      due_note TEXT DEFAULT '',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS attempts(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character TEXT NOT NULL,
      mistakes INTEGER DEFAULT 0,
      score REAL DEFAULT 0,
      image TEXT DEFAULT '',
      assignment_id INTEGER,
      created_at TEXT NOT NULL
    );
    """)
    c.commit(); c.close()


def require_key(x_api_key: str = Header(default="")):
    if not KEY or x_api_key != KEY:
        raise HTTPException(401, "unauthorized")


class AssignmentIn(BaseModel):
    title: str = Field(min_length=1)
    characters: str
    due_note: str = ""


class AttemptIn(BaseModel):
    character: str
    mistakes: int = 0
    score: float = 0
    image: str = ""      # data URL, optional
    assignment_id: int | None = None


@app.on_event("startup")
def _init(): init()


# ---------- Moona: assignments ----------
@app.post("/api/assignments")
def create_assignment(a: AssignmentIn, x_api_key: str = Header(default="")):
    require_key(x_api_key)
    c = conn()
    cur = c.execute("INSERT INTO assignments(title,characters,due_note,created_at) VALUES(?,?,?,?)",
                    (a.title, a.characters, a.due_note, datetime.datetime.now().isoformat()))
    c.commit()
    aid = cur.lastrowid
    c.close()
    return {"id": aid, "ok": True}


@app.get("/api/assignments")
def list_assignments():
    c = conn()
    rows = c.execute("SELECT * FROM assignments ORDER BY id DESC").fetchall()
    c.close()
    return [dict(r) for r in rows]


@app.get("/api/assignments/{aid}/submissions")
def assignment_submissions(aid: int, x_api_key: str = Header(default="")):
    require_key(x_api_key)
    c = conn()
    rows = c.execute(
        "SELECT character,mistakes,score,image,created_at FROM attempts WHERE assignment_id=? ORDER BY id",
        (aid,)).fetchall()
    c.close()
    return [dict(r) for r in rows]


@app.delete("/api/assignments/{aid}")
def delete_assignment(aid: int, x_api_key: str = Header(default="")):
    require_key(x_api_key)
    c = conn()
    c.execute("DELETE FROM assignments WHERE id=?", (aid,))
    c.commit(); c.close()
    return {"ok": True}


# ---------- Mada: attempts ----------
@app.post("/api/attempts")
async def save_attempt(req: Request):
    a = AttemptIn(**await req.json())
    img_path = ""
    if a.image.startswith("data:image/png;base64,"):
        raw = a.image.split(",", 1)[1]
        name = f"{uuid.uuid4().hex[:12]}.png"
        (IMG / name).write_bytes(base64.b64decode(raw))
        img_path = f"/images/{name}"
    c = conn()
    cur = c.execute(
        "INSERT INTO attempts(character,mistakes,score,image,assignment_id,created_at) VALUES(?,?,?,?,?,?)",
        (a.character, a.mistakes, a.score, img_path, a.assignment_id,
         datetime.datetime.now().isoformat()))
    c.commit(); aid = cur.lastrowid; c.close()
    return {"id": aid, "ok": True, "image": img_path}


# ---------- Progress (open, Mada's app) ----------
@app.get("/api/progress")
def progress():
    c = conn()
    tot, = c.execute("SELECT COUNT(*) FROM attempts").fetchone()
    per = c.execute(
        "SELECT character, COUNT(*) n, ROUND(AVG(score),1) avg, SUM(mistakes) err "
        "FROM attempts GROUP BY character ORDER BY n DESC").fetchall()
    pct = c.execute("SELECT ROUND(100.0*SUM(CASE WHEN score>=70 THEN 1 ELSE 0 END)/COUNT(*),0) FROM attempts").fetchone()[0]
    last = c.execute("SELECT MAX(created_at) FROM attempts").fetchone()[0]
    days = [r[0] for r in c.execute("SELECT DISTINCT substr(created_at,1,10) FROM attempts ORDER BY 1 DESC").fetchall()]
    c.close()
    chars = {r["character"]: {"tries": r["n"], "avgScore": r["avg"], "mistakes": r["err"]} for r in per}
    return {"totalAttempts": tot, "masteryPct": pct if pct is not None else 0,
            "lastPractice": last, "days": days, "characters": chars}
