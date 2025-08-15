# ChatterVision

Real-time video chat with live transcription.

## Quickstart

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Copy example env files:
   ```sh
   cp backend/.env.example backend/.env
   cp frontend/.env.local.example frontend/.env.local
   cp ai-service/.env.example ai-service/.env
   ```
3. Start services:
   ```sh
   pnpm dev:backend   # backend on :3001
   pnpm dev:frontend  # frontend on :3000
   # optional: pnpm dev:all to run both
   # optional: pnpm --filter ai-service dev
   ```

## 60-second demo checklist

- Visit http://localhost:3000.
- Click **Check Health** to see `{ ok: true }` from the backend.
- Open DevTools, click **Ping Socket**, and watch `pong` log.
- Click **Start Camera** to preview video; **Stop Camera** to release tracks.
