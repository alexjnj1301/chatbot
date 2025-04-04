from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from chat_bot import chat_with_bot, ChatRequest, generate_chat_id
from image_generatorer import generate
from img_det import image_content_detectortry

#start the app via the commande: uvicorn app:app --reload

app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class PrompText(BaseModel):
    prompt: str

@app.post("/generate-image")
def generate_image(prompt_data: PrompText):
    #get the prompt from the request body
    prompt = prompt_data.prompt
    response = generate(prompt)
    return response

@app.post("/detect-objects")
async def detect_objects(file: UploadFile = File(...)):
    return await image_content_detectortry(file)

@app.get("/chat/generate")
def generateChatId():
    return generate_chat_id()

@app.post("/bot/chat")
def chatWithBot(request: ChatRequest):
    response = chat_with_bot(request)
    return {"response": response[0], "conversation_history": response[1]}

@app.get("/test")
def test():
    return {"message": "Hello World"}