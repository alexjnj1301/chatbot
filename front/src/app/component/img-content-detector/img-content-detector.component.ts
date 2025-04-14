import { Component, ElementRef, ViewChild } from '@angular/core'
import { HttpCallsService } from '../../service/httpCall.service'
import { detection, ImgContentDetection } from '../../models/ImgDetector'
import { MatButton } from '@angular/material/button'
import { MatDivider } from '@angular/material/divider'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-img-content-detector',
  templateUrl: './img-content-detector.component.html',
  imports: [
    MatDivider,
    MatButton,
    MatProgressSpinner
  ],
  styleUrls: ['./img-content-detector.component.scss'],
})
export class ImgContentDetectorComponent {
  @ViewChild('imageElement') imageElement: ElementRef | undefined

  selectedFile: File | null = null
  detections: detection[] = []
  imageUrl: string | null = null
  imageWidth: number = 0
  imageHeight: number = 0
  imageDisplayWidth: number = 0
  imageDisplayHeight: number = 0
  isLoading: boolean = false

  public constructor(private httpService: HttpCallsService) {}

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      this.imageUrl = reader.result as string
      const img = new Image()
      img.src = this.imageUrl as string
      img.onload = () => {
        this.imageWidth = img.width
        this.imageHeight = img.height

        this.calculateImageDisplaySize()
      }
    }
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile)
    }
    this.detections = []
  }

  private calculateImageDisplaySize(): void {
    if (this.imageElement && this.imageElement.nativeElement) {
      const imgElement = this.imageElement.nativeElement
      this.imageDisplayWidth = imgElement.width*0.9
      this.imageDisplayHeight = imgElement.height*0.9
    }
  }

  public detect(): void {
    this.isLoading = true
    if (this.selectedFile) {
      this.httpService.detectObjects(this.selectedFile).subscribe({
        next: (response: ImgContentDetection) => {
          this.detections = this.adjustBoundingBoxes(response.detections)
          this.isLoading = false
        },
        error: (error: Error) => {
          console.error('Error detecting objects:', error)
          this.isLoading = false
        },
      })
    }
  }

  public adjustBoundingBoxes(detections: any[]): any[] {
    return detections.map(detection => {
      const widthRatio = this.imageDisplayWidth / this.imageWidth;
      const heightRatio = this.imageDisplayHeight / this.imageHeight;

      const adjustedBox = detection.box.map((coordinate: number, index: number) => {
        if (index === 0 || index === 2) {
          return coordinate * widthRatio;
        } else if (index === 1 || index === 3) {
          return coordinate * heightRatio
        }
        return coordinate
      })

      return {
        ...detection,
        box: adjustedBox,
      }
    })
  }
}
