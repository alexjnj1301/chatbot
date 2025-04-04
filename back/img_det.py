from io import BytesIO

import torch
from PIL import Image
from fastapi import HTTPException, UploadFile
from fastapi.responses import JSONResponse
from transformers import DetrImageProcessor, DetrForObjectDetection

processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50")
model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50")

async def image_content_detectortry(file: UploadFile):
    try:
        image_data = await file.read()
        image = Image.open(BytesIO(image_data))

        inputs = processor(images=image, return_tensors="pt")

        outputs = model(**inputs)

        target_sizes = torch.tensor([image.size[::-1]])
        results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.9)[0]

        detections = []
        for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
            box = [round(i, 2) for i in box.tolist()]
            detection = {
                "label": model.config.id2label[label.item()],
                "confidence": round(score.item(), 3),
                "box": box
            }
            detections.append(detection)

        return JSONResponse(content={"detections": detections})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
