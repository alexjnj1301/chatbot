export interface Message {
  content: string
  role: string
  chat_id: string
  time: string
}

export interface MessageToSend {
  input_text: string
  chat_id: string
  conversation_history: Message[]
  time: string
}

export interface ChatResponse {
  response: {
    content: string
  },
  conversation_history: Message[]
}

export interface Chat {
  id: number
  chat_ref: string
  user_id: number
}
