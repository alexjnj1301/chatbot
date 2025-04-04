import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class Constants {
  public readonly TOKEN_KEY = 'access_token'
  public readonly CURRENT_USER_KEY = 'current_user'
  public readonly SENDER_USER = 'user'
  public readonly SENDER_BOT = 'assistant'
}
