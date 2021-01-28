import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = new FormControl('');
  messages: string[] = [];
  sub: Subscription = new Subscription();
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.sub = this.chatService.listenForMessages()
      .subscribe(message => {
        console.log('hellloooo');
        this.messages.push(message);
      });
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  sendMessage(): void {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
  }
}
