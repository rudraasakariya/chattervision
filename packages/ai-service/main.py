from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class STTRequest(BaseModel):
    audioUrl: str | None = None

@app.post("/stt")
async def stt(req: STTRequest):
    return {"transcript": "stub"}
