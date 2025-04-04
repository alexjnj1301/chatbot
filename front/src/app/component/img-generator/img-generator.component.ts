import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MatFormField, MatInput, MatLabel } from '@angular/material/input'
import { HttpCallsService } from '../../service/httpCall.service'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-img-generator',
  imports: [
    FormsModule,
    MatButton,
    MatInput,
    MatLabel,
    MatFormField
  ],
  templateUrl: './img-generator.component.html',
  styleUrl: './img-generator.component.scss'
})
export class ImgGeneratorComponent {
  prompt: string = ''
  imageUrl: string = ''
  isLoading: boolean = false

  public constructor(private httpCallService: HttpCallsService) {}

  public generateImage(): void {
    this.isLoading = true
    this.httpCallService.generate(this.prompt).subscribe({
      next: response => {
        console.log(response)
        this.imageUrl = URL.createObjectURL(response)
        this.isLoading = false
      },
      error: (error: any) => {
        console.error(error)
        this.isLoading = false
      }
    })
  }
}
