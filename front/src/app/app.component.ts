import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatProgressBar } from '@angular/material/progress-bar'
import { ImgGeneratorComponent } from './component/img-generator/img-generator.component'
import { ImgContentDetectorComponent } from './component/img-content-detector/img-content-detector.component'
import { ChatBotComponent } from './component/chat-bot/chat-bot.component'

@Component({
  selector: 'app-root',
  imports: [MatTabGroup, MatTab, ReactiveFormsModule, FormsModule, MatProgressBar, ImgGeneratorComponent, ImgContentDetectorComponent, ChatBotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AI-Interface'
  isLoading: boolean = false
}
