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
      .fromEvent<string>('messages');
  }

  listenForClients(): Observable<any> {
    return this.socket
      .fromEvent<any>('clients');
  }

  sendName(name: string): void {
    this.socket.emit('name', name);
  }
}
