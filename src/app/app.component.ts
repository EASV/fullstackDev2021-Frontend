import { Component } from '@angular/core';
import {Select} from '@ngxs/store';
import {ChatState} from './chat/state/chat.state';
import {Observable} from 'rxjs';
import {ChatClient} from './chat/shared/chat-client.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-app-y2021-frontend';
  @Select(ChatState.clientsOnline)
  clientsOnline$: Observable<number> | undefined;

  @Select(ChatState.loggedInClient)
  chatClient$: Observable<ChatClient> | undefined;

}
