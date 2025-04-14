# Rendu 2 : Machine Learning

## Description

Ce projet a pour objectif d'apprendre à utiliser des modèles d'IA pour la création et l'analyse d'images, ainsi que d'implémenter un chatbot. Le système est basé sur plusieurs modèles pré-entraînés pour la génération d'images, l'analyse d'images, et l'interaction avec un chatbot via un modèle de langage.

### Technologies utilisées

- **Backend** : Python avec **FastAPI** pour créer l'API RESTful.
- **Frontend** : **Angular** avec **Material Design** pour l'interface utilisateur.
- **Modèles IA** :
    - **Stable Diffusion** pour la génération d'images via le modèle `sd-legacy/stable-diffusion-v1-5` disponible sur Hugging Face.
    - **DETR-ResNet-50** pour l'analyse d'images (détection d'objets) disponible sur Hugging Face.
    - **GPT-4o-mini** pour le chatbot, utilisant **LangChain** et accessible via l'API d'OpenAI.

### Objectifs du projet

- **Création d'images** : Utilisation du modèle `StableDiffusionPipeline` pour générer des images à partir de prompts texte.
- **Analyse d'images** : Utilisation du modèle `DETR-ResNet-50` pour détecter des objets dans des images envoyées via l'API.
- **Chatbot** : Implémentation d'un chatbot utilisant le modèle **GPT-4o-mini** avec LangChain pour répondre aux utilisateurs et gérer l'historique des conversations.

## Fonctionnalités

1. **Génération d'images à partir de texte** : Les utilisateurs peuvent envoyer un prompt et obtenir une image générée via Stable Diffusion.
2. **Analyse d'images** : Les utilisateurs peuvent télécharger des images, et le modèle analysera l'image pour détecter les objets qu'elle contient.
3. **Chatbot interactif** : Les utilisateurs peuvent démarrer une conversation avec le bot. Si un `chat_id` est nécessaire, il sera généré automatiquement. Le modèle GPT-4o-mini est utilisé pour répondre aux utilisateurs en prenant en compte l'historique de la conversation.

## Installation

### Backend (FastAPI)

1. Clonez ce dépôt et naviguez dans le dossier **backend**.
2. Installez les dépendances Python :
   ```bash
   pip install -r requirements.txt
   ```
3. **Génération d'une clé API OpenAI** :
    - Allez sur le [site OpenAI](https://platform.openai.com/) et générez une clé API.
    - Créez un fichier nommé `api_key_chat_bot` dans le dossier `back` et copiez-y votre clé API.

4. Lancez le serveur backend avec **Uvicorn** :
   ```bash
   uvicorn app:app --reload
   ```

### Frontend (Angular)

1. Clonez ce dépôt et naviguez dans le dossier frontend.
2. Installez les dépendances avec npm :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   ng serve
   ```

### Modèles Hugging Face

- **Stable Diffusion** et **DETR-ResNet-50** sont utilisés via les pipelines de Hugging Face. Assurez-vous d'avoir accès aux modèles sur Hugging Face ou d'utiliser les API associées.

## Exemple d'Utilisation

### API

1. **Générer une image** :
    - **Endpoint** : `/generate-image`
    - **Méthode** : `POST`
    - **Body** :
      ```json
      {
        "prompt": "A beautiful landscape"
      }
      ```
    - **Réponse** : L'image générée en format PNG.

2. **Analyser une image** :
    - **Endpoint** : `/detect-objects`
    - **Méthode** : `POST`
    - **Body** :
        - Fichier image à télécharger.
    - **Réponse** : Liste des objets détectés dans l'image avec leurs labels et scores de confiance.

3. **Interagir avec le chatbot** :
    - **Endpoint** : `/bot/chat`
    - **Méthode** : `POST`
    - **Body** :
      ```json
      {
        "input_text": "Hello, how are you?",
        "chat_id": "some-chat-id",
        "time": "1609459200000"
      }
      ```
    - **Réponse** : La réponse du chatbot avec l'historique mis à jour.

4. **Générer un chat_id** :
    - **Endpoint** : `/chat/generate`
    - **Méthode** : `GET`
    - **Réponse** : Un `chat_id` généré pour une nouvelle conversation.

### Frontend (Angular)

Le frontend est une interface utilisateur où l'utilisateur peut :
- Entrer un prompt pour générer une image.
- Télécharger une image pour la détection d'objets.
- Discuter avec le chatbot en envoyant des messages et recevoir des réponses.

### Fichiers de Contexte (optionnel)

Le fichier `context.txt` peut être utilisé pour ajouter un contexte spécifique à l'assistant dans le chatbot. Ce fichier est chargé et inclus dans l'historique de la conversation avant chaque réponse.

## Chatbot : Mise en place de l'historique de conversation et gestion de la mémoire

Le chatbot du projet utilise le modèle **GPT-4o-mini** pour interagir avec l'utilisateur. Pour garantir une expérience de conversation fluide et cohérente, l'historique des messages est conservé à chaque étape de la conversation.

1. **Gestion de l'historique** :
   L'historique des conversations est conservé pour chaque `chat_id`. Chaque message envoyé par l'utilisateur ainsi que chaque réponse générée par le bot est sauvegardé sous forme de messages (`ChatMessage`) dans une liste associée au `chat_id`. Cela permet de suivre l'évolution de la conversation au fil du temps.

2. **Contexte du chatbot** :
   Un fichier de contexte (`context.txt`) est utilisé pour fournir des informations supplémentaires au chatbot. Ce fichier est chargé et ajouté au début de chaque conversation avant d'envoyer la requête au modèle GPT-4o-mini. Cela permet d'incorporer un contexte spécifique (par exemple, des préférences de l'utilisateur ou des informations générales) dans l'historique des messages.

3. **Mémoire de l'assistant** :
   Lorsqu'un utilisateur envoie un message, celui-ci est enregistré avec un `chat_id` unique. Le chatbot est capable de se "souvenir" de l'historique des conversations pour chaque `chat_id`, ce qui lui permet de répondre de manière cohérente et contextuelle. Le modèle GPT-4o-mini prend en compte cet historique pour générer des réponses pertinentes.

