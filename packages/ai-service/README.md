# AI Service

## Run

1. Install [uv](https://github.com/astral-sh/uv).
2. In this directory, run `uv sync`.
3. Start the service:
   ```sh
   uv run uvicorn main:app --reload --port 8000
   ```

The `/stt` endpoint accepts `{ "audioUrl"?: string }` and returns `{ "transcript": "stub" }`.
