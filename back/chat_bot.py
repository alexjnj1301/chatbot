import time
import uuid

from langchain.chat_models import init_chat_model
from pydantic import BaseModel

def get_api_key():
    return open("api_key_chat_bot", "r").read().strip()

model = init_chat_model(model="gpt-4o-mini", model_provider="openai", api_key=get_api_key())

class ChatRequest(BaseModel):
    input_text: str
    chat_id: str
    conversation_history: list
    time: str

class ConversationHistory(BaseModel):
    chat_id: str
    role: str
    content: str
    time: str

def generate_chat_id():
    return str(uuid.uuid4()).replace("-", "")[:16]

def chat_with_bot(chat: ChatRequest):
    if chat.conversation_history is None:
        chat.conversation_history = []

    # update history
    history = {"chat_id": chat.chat_id, "role": "user", "content": chat.input_text, "time": chat.time}
    chat.conversation_history.append(history)

    response = model.invoke(chat.conversation_history)

    # update history
    history = {"chat_id": chat.chat_id, "role": "assistant", "content": response.content, "time": str(time.time())}
    chat.conversation_history.append(history)

    return response, chat.conversation_history

# exemple de conversation en console
# conversation_history = []
#
# chat_id = generate_chat_id()
#
# while True:
#     user_input = input("You: ")
#     if user_input.lower() == "exit":
#         break
#
#     response, conversation_history = chat_with_bot(user_input, chat_id, conversation_history)
#
#     print(f"Bot: {response.content}")
