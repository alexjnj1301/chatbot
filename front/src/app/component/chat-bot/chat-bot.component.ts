import { Component } from '@angular/core'
import { MatFormField, MatInput, MatSuffix } from '@angular/material/input'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { Chat, ChatResponse, Message, MessageToSend } from '../../models/Chat'
import { DatePipe, NgClass } from '@angular/common'
import { HttpCallsService } from '../../service/httpCall.service'
import { SnackBarService } from '../../service/SnackBar-service'
import { Constants } from '../../constants'

@Component({
  selector: 'app-chat-bot',
  imports: [
    MatInput,
    MatFormField,
    MatSuffix,
    MatIconButton,
    MatIcon,
    FormsModule,
    NgClass,
    DatePipe,
    MatButton,
  ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  chatId: string = ''
  message: string = ''
  messages: Message[] = []
  messageToSend: MessageToSend | undefined
  isBotTyping: boolean = false
  chats: Chat[] = []

  public constructor(private httpCallService: HttpCallsService,
                     public constants: Constants,
                     private snackBarService: SnackBarService) {
    // this.getChats()
  }

  public getDate(): string {
    return new Date().getTime().toString()
  }

  // public getChats(): void {
  //   this.httpCallService.getChats().subscribe({
  //     next: (value: Chat[]) => {
  //       this.chats = value
  //       console.log(this.chats)
  //     },
  //     error: err => {
  //       console.log(err)
  //       this.snackBarService.openErrorSnackBar('Erreur lors de la récupération des chats')
  //     }
  //   })
  // }

  // public getMessagesByChatRef(chat_ref: string): void {
  //   this.httpCallService.getMessagesByChatRef(chat_ref).subscribe({
  //     next: (value: Message[]) => {
  //       this.messages = value
  //       console.log("message du chat " + chat_ref, this.messages)
  //     },
  //     error: err => {
  //       console.log(err)
  //       this.snackBarService.openErrorSnackBar('Erreur lors de la récupération des messages')
  //     }
  //   })
  // }

  public send(): void {
    if(!this.chatId) this.generateChatId()
    this.isBotTyping = true
    const date = this.getDate()

    this.messageToSend = {
      input_text: this.message,
      chat_id: this.chatId,
      conversation_history: this.messages,
      time: date
    }

    this.httpCallService.sendMessage(this.messageToSend).subscribe({
      next: (value: ChatResponse) => {
        this.messages = value.conversation_history
        this.isBotTyping = false
      },
      error: err => {
        console.log(err)
        this.isBotTyping = false
        this.snackBarService.openErrorSnackBar('Erreur lors de l\'envoi du message, veuillez réessayer')
      }
    })

    this.message = ''
  }

  public generateChatId(): void {
    this.httpCallService.generateChatId().subscribe({
      next: value => {
        this.chatId = value
        // this.httpCallService.saveChat(this.chatId).subscribe({
        //   next: value => {
        //     this.snackBarService.openInfoSnackBar('Chat créé avec succès')
        //   },
        //   error: err => {
        //     console.log(err)
        //     this.snackBarService.openErrorSnackBar('Erreur lors de la création du chat')
        //   }
        // })
      },
      error: err => {
        console.log(err)
      }
    })
  }

  public return(): void {
    this.chatId = ''
    // this.getChats()
  }

  public goToChat(chat_ref: string) {
    this.chatId = chat_ref
    // this.getMessagesByChatRef(chat_ref)
  }
}
