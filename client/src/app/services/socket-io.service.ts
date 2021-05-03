import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socketClient:any;

  constructor() { }

  connect(message:any, cb:any) {
    this.socketClient = socketIo.io(environment.socketUrl);
    cb();
  }

  on(eventName:any, cb:any) {
    this.socketClient.on(eventName, cb);
  }

  emit(eventName: any, data: any) {
    this.socketClient.emit(eventName, data);

  }
  broadcast(eventName:any, data:any) { }
  disconnect() {
    if (this.socketClient && this.socketClient.connected) {
      this.socketClient.disconnect();
    }
  }

}
