import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ChatClient} from '../shared/chat-client.model';
import {ListenForClients, StopListeningForClients, UpdateClients} from './chat.actions';
import {ChatService} from '../shared/chat.service';
import {Subscription} from 'rxjs';

export interface ChatStateModel {
  chatClients: ChatClient[];
  chatClient: ChatClient;
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    chatClients: [{id: '33', nickname: 'bob'}],
    chatClient: {id: '2', nickname: 'd'}
  }
})
@Injectable()
export class ChatState {
  private clientsUnsub: Subscription | undefined;
  constructor(private chatService: ChatService) { }
  @Selector()
  static clients(state: ChatStateModel): ChatClient[] {
    return state.chatClients;
  }

  @Action(ListenForClients)
  getClients(ctx: StateContext<ChatStateModel>): void {
    // Old state Object...
    // {
    //     chatClients: [
    //       //    {id: '33', nickname: 'bob'},
    //       //    {id: '22', nickname: 'dd'}
    //     //    ],
    //     chatClient: {id: '2', nickname: 'd'}
    //   }
    this.clientsUnsub = this.chatService.listenForClients()
      .subscribe(clients => {
        ctx.dispatch(new UpdateClients(clients));
      });
  }

  @Action(StopListeningForClients)
  stopListeningForClients(ctx: StateContext<ChatStateModel>): void {
    if (this.clientsUnsub) {
      this.clientsUnsub.unsubscribe();
    }
  }
  @Action(UpdateClients)
  updateClients(ctx: StateContext<ChatStateModel>, uc: UpdateClients): void {
    // Old state Object...
    // {
    //     chatClients: [
    //       //    {id: '33', nickname: 'bob'},
    //       //    {id: '22', nickname: 'dd'}
    //     //    ],
    //     chatClient: {id: '2', nickname: 'd'}
    //   }
    this.chatService.listenForClients()
      .subscribe(clients => {
        const state = ctx.getState();
        const oldClients = [...state.chatClients];
        oldClients.push({id: '22', nickname: 'dd'});
        // New state Object...
        // {
        //    chatClients: [
        //    {id: '33', nickname: 'bob'},
        //    {id: '22', nickname: 'dd'},
        // {id: '22', nickname: 'dd'}
        //    ],
        //    chatClient: {id: '2', nickname: 'd'}
        // }
        const newState: ChatStateModel = {
          ...state,
          chatClients: uc.clients
        };
        ctx.setState(newState);
      });
  }
}
