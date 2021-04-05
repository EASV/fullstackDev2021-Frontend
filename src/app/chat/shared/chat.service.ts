import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ChatClient} from './chat-client.model';
import {ChatMessage} from './chat-message.model';
import {WelcomeDto} from './welcome.dto';
import {map, tap} from 'rxjs/operators';
import {SocketChat} from '../../app.module';
import {JoinChatDto} from './join-chat.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: SocketChat) { }

  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

  sendTyping(typing: boolean): void {
      this.socket.emit('typing', typing);
  }

  listenForMessages(): Observable<ChatMessage> {
    return this.socket
      .fromEvent<ChatMessage>('newMessage');
  }

  listenForClients(): Observable<ChatClient[]> {
    return this.socket
      .fromEvent<ChatClient[]>('clients');
  }

  listenForWelcome(): Observable<WelcomeDto> {
    return this.socket
      .fromEvent<WelcomeDto>('welcome');
  }

  listenForClientTyping(): Observable<ChatClient> {
    return this.socket
      .fromEvent<ChatClient>('clientTyping');
  }

  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }
  listenForConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('connect')
      .pipe(
        map( (value) => {
          return this.socket.ioSocket.id;
        })
      );
  }
  listenForDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('disconnect').pipe(
        map( () => {
          return this.socket.ioSocket.id;
        })
      );
  }

  joinChat(dto: JoinChatDto): void {
    this.socket.emit('joinChat', dto);
  }
  disconnect(): void {
    this.socket.disconnect();
  }
  connect(): void {
    this.socket.connect();
  }
}
