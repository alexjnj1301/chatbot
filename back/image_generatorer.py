from diffusers import StableDiffusionPipeline
from datetime import datetime
from io import BytesIO
from fastapi import Response

def generate(prompt):
    model_id = "sd-legacy/stable-diffusion-v1-5"
    pipe = StableDiffusionPipeline.from_pretrained(model_id)

    # Déplacer le modèle sur le CPU
    pipe = pipe.to("cpu")

    # Générer l'image à partir du prompt
    image = pipe(prompt).images[0]

    # Sauvegarder l'image dans un buffer mémoire (au lieu de la sauvegarder sur disque)
    img_byte_arr = BytesIO()
    image.save(img_byte_arr, format='PNG')  # Enregistrer l'image dans le format PNG
    img_byte_arr.seek(0)  # Revenir au début du flux de données

    # Retourner l'image sous forme de réponse HTTP
    return Response(content=img_byte_arr.read(), media_type="image/png")
