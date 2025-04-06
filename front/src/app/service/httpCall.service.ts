import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ImgContentDetection } from '../models/ImgDetector'
import { Chat, ChatResponse, Message, MessageToSend } from '../models/Chat'

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  private readonly BASE_URL: string = 'http://localhost:8000'
  constructor(private http: HttpClient) { }


  public generate(prompt: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.BASE_URL}/generate-image`, { prompt: prompt }, { responseType: 'blob' as 'json' })
  }

  public detectObjects(file: File): Observable<ImgContentDetection> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this.http.post<ImgContentDetection>(`${this.BASE_URL}/detect-objects`, formData)
  }

  public sendMessage(messageToSend: MessageToSend): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.BASE_URL}/bot/chat`, messageToSend)
  }

  public generateChatId(): Observable<string> {
    return this.http.get<string>(`${this.BASE_URL}/chat/generate`)
  }

  public getChats(): Observable<Chat> {
    return this.http.get<Chat>(`${this.BASE_URL}/bot/chat/ids`)
  }

  public getMessagesByChatRef(chat_ref: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.BASE_URL}/bot/chat/ids/${chat_ref}`)
  }

  public saveChat(chatId: string): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/bot/chat/save`, { chat_id: chatId })
  }
}
