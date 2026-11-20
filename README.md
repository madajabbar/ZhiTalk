# ZTalk

Aplikasi belajar Mandarin untuk Mada — latihan menulis hanzi, pelajaran HSK1,
dan tugas dari Moona. Mobile-first PWA, backend FastAPI + SQLite di Hermes.

## Arsitektur

| Layer | Di mana | URL |
|---|---|---|
| Frontend (PWA) | Vercel | https://ztalk.akusedang.online |
| Backend API + DB | Hermes (systemd user) | https://api-ztalk.akusedang.online |
| Domain | Cloudflare (akusedang.online) | ztalk + api-ztalk → CNAME |

Backend berjalan di server Hermes lewat unit systemd user:
- `ztalk-api.service` — uvicorn pada `127.0.0.1:3012` (script `scripts/run-backend.sh`)
- `ztalk-tunnel.service` — Cloudflare tunnel `ztalk` → `api-ztalk.akusedang.online`

## API — untuk Moona (tulis & baca tugas)

Semua rute berikut butuh header `x-api-key: <ZTALK_API_KEY>`.
Nilai kunci disimpan di server (env/`/home/mada/.secrets/ztalk_api_key`),
**tidak pernah** di repo atau chat.

| Metode | Rute | Deskripsi |
|---|---|---|
| `POST` | `/api/assignments` | Buat tugas. Body `{title, characters: "你好 我 是", due_note}` |
| `GET` | `/api/assignments` | Daftar semua tugas (terbuka, dilihat Mada) |
| `GET` | `/api/assignments/{id}/submissions` | Baca kiriman Mada untuk satu tugas (karakter, skor, kesalahan, gambar) |
| `DELETE` | `/api/assignments/{id}` | Hapus tugas |

### Rute aplikasi Mada (terbuka)

| Metode | Rute | Deskripsi |
|---|---|---|
| `POST` | `/api/attempts` | Simpan hasil latihan menulis. Body `{character, mistakes, score, image(dataURL), assignment_id?}` |
| `GET` | `/api/progress` | Progres agregat: total, penguasaan %, streak (hari), skor per hanzi |

Contoh membaca kiriman:

```bash
curl https://api-ztalk.akusedang.online/api/assignments/1/submissions \
  -H "x-api-key: $ZTALK_API_KEY"
```

## Menjalankan backend secara lokal

```bash
export ZTALK_API_KEY="$(cat /home/mada/.secrets/ztalk_api_key)"
cd backend
python3 -m uvicorn app:app --host 127.0.0.1 --port 3012
```

## Deploy frontend (Vercel)

```bash
vercel --prod   # atau via API, lihat scripts/deploy-vercel.sh
```

Domain `ztalk.akusedang.online` → CNAME `cname.vercel-dns.com` (proxy OFF).

## STATUS

Lihat `STATUS.md`.
