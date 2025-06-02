
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import openai  # Para Mental (GPT-3.5)
import requests  # Para Emocional (Claude) y Espiritual (Llama vía Hugging Face)

app = FastAPI()

# Configura APIs (usa variables de entorno)
openai.api_key = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
HF_API_KEY = os.getenv("HF_API_KEY")

class UserInput(BaseModel):
    mental: str
    emotional: str
    spiritual: str

@app.post("/generate-plan")
async def generate_plan(user_input: UserInput):
    try:
        # 1. Objetivo Mental: Plan con OpenAI
        mental_plan = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Crea un plan semanal para: {user_input.mental}"}]
        )

        # 2. Objetivo Emocional: Análisis con Claude (vía API HTTP)
        emotional_response = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers={"x-api-key": ANTHROPIC_API_KEY},
            json={
                "model": "claude-3-haiku-20240307",
                "messages": [{"role": "user", "content": f"Analiza este estado emocional: {user_input.emotional}"}]
            }
        )

        # 3. Objetivo Espiritual: Reflexión con Llama 2 (Hugging Face)
        spiritual_response = requests.post(
            "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
            headers={"Authorization": f"Bearer {HF_API_KEY}"},
            json={"inputs": f"Genera una reflexión sobre: {user_input.spiritual}"}
        )

        return {
            "mental": mental_plan.choices[0].message.content,
            "emotional": emotional_response.json().get("content", "Error"),
            "spiritual": spiritual_response.json()[0].get("generated_text", "Error")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))