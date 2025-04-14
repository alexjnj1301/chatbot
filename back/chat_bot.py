import time
import uuid
from langchain.chat_models import init_chat_model
from pydantic import BaseModel

def get_api_key():
    return open("api_key_chat_bot", "r").read().strip()

model = init_chat_model(model="gpt-4o-mini", model_provider="openai", api_key=get_api_key())

# Structure de la requête
class ChatRequest(BaseModel):
    input_text: str
    chat_id: str
    time: str

# Structure du message de la conversation
class ChatMessage(BaseModel):
    chat_id: str
    role: str
    content: str
    time: str

class SaveChatIdRequest(BaseModel):
    chat_id: str

# Générer un chat_id unique
def generate_chat_id():
    return str(uuid.uuid4()).replace("-", "")[:16]

# Stockage global pour gérer les chats et les conversations
chatIds = []  # Tableau des chat_ids
chatMessages = []  # Tableau des chatMessages

# Sauvegarder un chat_id et son historique de messages
def save_chat(request: ChatRequest):
    save_chat_id(SaveChatIdRequest(chat_id=request.chat_id))
    # Ajouter le message de l'utilisateur
    user_message = ChatMessage(
        chat_id=request.chat_id,
        role="user",
        content=request.input_text,
        time=request.time
    )
    chatMessages.append(user_message)

def save_chat_id(request: SaveChatIdRequest):
    # Ajouter chat_id si il n'existe pas
    if request.chat_id not in chatIds:
        chatIds.append(request.chat_id)

# Charger le fichier de contexte
def load_context_from_file(file_path: str):
    try:
        with open(file_path, 'r') as f:
            context = f.read()
        return context
    except Exception as e:
        print(f"Erreur lors du chargement du fichier de contexte : {e}")
        return ""

# Récupérer l'historique des messages pour un chat_id donné
def get_messages_by_chat_id(chat_id: str):
    # Filtrer les messages en fonction du chat_id
    return [message for message in chatMessages if message.chat_id == chat_id]

# Fonction pour obtenir tous les chat_ids enregistrés
def get_chat_ids():
    return chatIds

# Fonction pour interagir avec le bot
def chat_with_bot(request: ChatRequest):
    # Enregistrer le message utilisateur
    save_chat(request)

    # Récupérer l'historique complet des messages pour ce chat_id
    conversation_history = get_messages_by_chat_id(request.chat_id)

    # Si un fichier de contexte est fourni, charger son contenu et l'ajouter à l'historique
    context = load_context_from_file('context.txt')
    if context:
        context_message = ChatMessage(
            chat_id=request.chat_id,
            role="assistant",
            content=context,
            time=str(time.time())
        )
        conversation_history.insert(0, context_message)  # Ajouter le contexte au début de l'historique

    # Envoi de la conversation au modèle GPT
    response = model.invoke([message.dict() for message in conversation_history])

    # Ajouter la réponse du bot dans l'historique
    bot_message = ChatMessage(
        chat_id=request.chat_id,
        role="assistant",
        content=response.content,
        time=str(time.time())
    )
    chatMessages.append(bot_message)

    # Retourner la réponse et l'historique mis à jour
    return response, [message.dict() for message in chatMessages if message.chat_id == request.chat_id]
