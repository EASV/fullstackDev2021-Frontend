import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(): void {
    console.log(this.message.value);
  }
}
