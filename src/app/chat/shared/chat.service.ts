import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

  listenForMessages(): Observable<string> {
    return this.socket
      .fromEvent<string>('newMessage');
  }

  listenForClients(): Observable<string[]> {
    return this.socket
      .fromEvent<string[]>('clients');
  }

  getAllMessages(): Observable<string[]> {
    return this.socket
      .fromEvent<string[]>('allMessages');
  }
  sendNickName(nickname: string): void {
    this.socket.emit('nickname', nickname);
  }
  disconnect(): void {
    this.socket.disconnect();
  }
  connect(): void {
    this.socket.connect();
  }
}
