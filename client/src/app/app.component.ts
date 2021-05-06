import { Component } from '@angular/core';
import { SocketIoService } from './services/socket-io.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  socketIoService: any;


  ongOnInit() {
    const message = "hello world";
    this.socketIoService.connect(message, () => {
      console.log('client connected');
      console.log(message);

    });



  }
}
