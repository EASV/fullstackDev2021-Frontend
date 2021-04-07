import {ChatClient} from '../shared/chat-client.model';

export class ListenForClients {
  static readonly type = '[Chat] Listen For Clients';
}

export class StopListeningForClients {
  static readonly type = '[Chat] Stop Listening For Clients';
}

export class UpdateClients {
  constructor(public clients: ChatClient[]) {}

  static readonly type = '[Chat] Update Clients';
}
