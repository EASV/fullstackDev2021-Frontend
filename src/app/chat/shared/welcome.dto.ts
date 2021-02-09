import { ChatClient } from './chat-client.model';
import { ChatMessage } from './chat-message.model';

export interface WelcomeDto {
  clients: ChatClient[];
  client: ChatClient;
  messages: ChatMessage[];
}
