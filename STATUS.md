# ZTalk — Status Deploy (Frontend Vercel)

Tanggal: 2026-11-20
Oleh: Zeta (brief Moona, 20 Nov 18:52 WIB)
HEAD repo: 230e996 (PWA frontend + backend Phase 1 MVP)

## Vercel

- Project: `zhi-talk`
- ID: `prj_n2bgZcLa6EVFSIrDKyw9w3CC4DYx`
- Team: `team_wYvRGvgtrsM47fZa4eU4sm1M`
- Framework: none (static). No build command. Root = repo root. Output = root.
- Deployment URL: `https://zhi-talk-mkbngf4z1-madajabbar22-gmailcoms-projects.vercel.app` (production, gitSha 230e996)
- Enable: `https://zhi-talk.vercel.app`

## Domain & DNS

- Domain terpasang di Vercel: `ztalk.akusedang.online` (verified, 2026-11-20 11:54 WIB)
- Cloudflare CNAME: `ztalk` -> `cname.vercel-dns.com`, monitoring OFF (DNS record id `45472c13fc3abc65e1093f7ba4555a3c`, dibuat 2026-11-20 18:58 WIB). Tidak ada record ztalk lama yang bertabrakan.
- Backend URL: `https://api-ztalk.akusedang.online` (tunnel systemd ztalk-tunnel, 127.0.0.1:3012) — TIDAK disentuh.

## Verifikasi (2026-11-20, ±19:05 WIB)

| Target | Hasil |
|---|---|
| `https://ztalk.akusedang.online/` | 200, `<title>ZTalk — Belajar Mandarin</title>` |
| `/app.js` | 200 |
| `/styles.css` | 200 |
| `/manifest.webmanifest` | 200 (JSON valid, name=ZTalk — Belajar Mandarin) |
| `/sw.js` | 200 |
| `/icon.svg` | 200 |
| API base di app.js | `https://api-ztalk.akusedang.online` |
| `https://api-ztalk.akusedang.online/api/progress` | 200, `{"totalAttempts":2,"masteryPct":100.0,...}` |

## Catatan

- Deploy via Vercel REST API (token `~/.config/undangin/vercel.token`, chmod 600, tidak dicetak), file blobs langsung untuk file statis. Deploy kedua (gitSource github ref master) agar alias `ztalk.akusedang.online` terpasang.
- Auto-deploy git tidak dipakai karena khawatir verifikasi email author (lihat undangin DEPLOY.md); trigger via API.
- Deployment protection (SSO) ON untuk `vercel.app` (`all_except_custom_domains`), jadi URL vercel.app redirect login; custom domain `ztalk.akusedang.online` publik.
- Resolver DNS lokal (tailscale magicDNS 100.100.100.100) sempat NXDOMAIN (negative cache); record DIEN confirmed di NS Cloudflare & resolver publik (1.1.1.1/8.8.8.8).

## Skrip deploy (repo, scripts/)

- `scripts/deploy-vercel.py` — deploy file statis via API (files blobs).
- `scripts/trig.py` — trigger deploy gitSource (ref master) + polling READY.
- `scripts/vc.py` — helper API: domain, redeploy, list deployments.
- `scripts/cfdns.py` — Cloudflare DNS (CNAME list/create/delete) via token dari `~/.cloudflared/cert.pem`.

## Polish pass (2026-11-20, ±19:05 WIB, Zeta w/ Moona)

- Seal: `Z不` → single `学` (top bar), cocok dengan icon & hero seal. `Z不` hilang dari halaman.
- Emoji UI → inline SVG stroke (stroke=currentColor, 1.7, 24x24): tab bar (Beranda/Latihan/Pelajaran/Tugas/Progres), heads kartu Tugas & Latihan, tombol hear vocab, judul pelajaran & tugas. Filter grayscale/opacity `.tab-ic` dihapus, warna via currentColor (ink2 inactive / accent active).
- Ornamen 祥云 (cloud) inline SVG di hero, opacity ≤0.08 accent tone, pointer-events none, tanpa layout shift.
- Dark mode `@media (prefers-color-scheme: dark)` — redefinisikan semua var CSS; topbar & tabbar background pindah ke `--topbar-bg`/`--tabbar-bg` agar ikut gelap. Light mode pixel-identical.
- Cleanup assignment: DELETE `/api/assignments/2` & `/3` → 200 (Latihan 1 — Salam, Latihan via tunnel). GET `/api/assignments` = `[...id 1 'Latihan']` (bukan bagian scope ber). Attempts/progress tidak disentuh.
- Verifikasi konten (post-deploy): seal `学`, no `Z不`, no emoji tab; `/styles.css` memuat `prefers-color-scheme`; `/app.js`, `/manifest.webmanifest`, `/sw.js`, `/icon.svg` 200; `/api/progress` 200; `/api/assignments` list sisa id 1.
