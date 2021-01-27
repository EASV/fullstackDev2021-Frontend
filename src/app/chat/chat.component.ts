import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message = new FormControl('');
  messages: string[] = [];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.listenForMessages()
      .subscribe(message => {
        this.messages.push(message);
      });
  }

  sendMessage(): void {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
  }


}
