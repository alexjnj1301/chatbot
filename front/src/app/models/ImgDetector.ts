export interface detection {
  label: string
  confidence: number
  box: number[]
}

export interface ImgContentDetection {
  detections: detection[]
}
