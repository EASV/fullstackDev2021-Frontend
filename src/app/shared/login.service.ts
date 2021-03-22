import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  clientIdIdentifier = 'clientId';
  constructor() { }

  saveClientId(clientId: string): void {
    localStorage.setItem(this.clientIdIdentifier, clientId);
  }

  getClientId(): string | undefined {
    const cid = localStorage.getItem(this.clientIdIdentifier);
    if (cid) {
      return cid;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
  }
}
