import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {

  socket: any;
  message: string = "";

  constructor(@Inject(DOCUMENT) private document: HTMLDocument) { }

  ngOnInit(): void {
    this.setupSocketConnection();

  }

  setupSocketConnection() {
    this.socket = io(environment.socketUrl);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        const list = document.getElementById('message-list')
        if (list != null) list.appendChild(element);
      }
    });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('li') || null;
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    const list = document.getElementById('message-list')
    if (list != null) list.appendChild(element);
    this.message = '';
  }

}
