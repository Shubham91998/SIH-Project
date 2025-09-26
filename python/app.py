from fastapi import FastAPI
import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
import asyncio

import os
TWILIO_API_KEY = os.environ.get("TWILIO_API_KEY")

app = FastAPI()
client = Groq(api_key="")

origins = [
    "http://localhost:5173",
    # Add other allowed origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for testing only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    question: str

from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
import asyncio

@app.post("/nlp/stream")
async def nlp_stream(data: Question):
    question = data.question

    async def generate():
        # Example: replace with actual streaming from your AI client
        answer = f"Simulated streaming answer to: {question}"
        for char in answer:
            yield char
            await asyncio.sleep(0.02)

    return StreamingResponse(generate(), media_type="text/plain")

@app.post("/nlp/predict")
async def nlp_predict(data: Question):
    try:
        response = await asyncio.to_thread(
            lambda: client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": "You are a helpful health assistant."},
                    {"role": "user", "content": data.question}
                ],
                max_completion_tokens=256,
                temperature=0.5,
            )
        )
        answer = response.choices[0].message.content
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def read_root():
    return {"message": "AI chatbot backend running via Groq API."}








# removed dl

from fastapi import Request, Form
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client

# Twilio client setup (use environment variables recommended)
account_sid = ''
auth_token = ''
twilio_client = Client(account_sid, auth_token)


from fastapi import Request
from twilio.twiml.messaging_response import MessagingResponse

@app.post("/whatsapp_webhook")
async def whatsapp_webhook(request: Request):
    form_data = await request.form()
    incoming_msg = form_data.get('Body')
    from_number = form_data.get('From')
    num_media = int(form_data.get('NumMedia', 0))

    if num_media > 0:
        reply_text_wtsp = "Image received. Processing under development."
    else:
        try:
            response = await asyncio.to_thread(
                lambda: client.chat.completions.create(
                    model="llama-3.3-70b-versatile",
                    messages=[
                        {"role": "system", "content": "You are a helpful health assistant."},
                        {"role": "user", "content": incoming_msg}
                    ],
                    max_completion_tokens=256,
                    temperature=0.5,
                )
            )
            reply_text_wtsp = response.choices[0].message.content
        except Exception as e:
            reply_text_wtsp = "Sorry, an error occurred while processing your message."

    resp = MessagingResponse()
    resp.message(reply_text_wtsp)
    return str(resp)

@app.post("/sms_webhook")
async def sms_webhook(request: Request):
    form_data = await request.form()
    incoming_msg = form_data.get('Body')
    from_number = form_data.get('From')

    try:
        response = await asyncio.to_thread(
            lambda: client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": "You are a helpful health assistant."},
                    {"role": "user", "content": incoming_msg}
                ],
                max_completion_tokens=256,
                temperature=0.5,
            )
        )
        reply_text_sms = response.choices[0].message.content
    except Exception as e:
        reply_text_sms = "Sorry, an error occurred while processing your message."

    resp = MessagingResponse()
    resp.message(reply_text_sms)
    return str(resp)


if __name__ == "__main__":
    
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


