import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  li: any;
  lis: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users').subscribe((Response) => {
      // If response comes hideloader() function is called
      // to hide that loader
      if (Response) {
        hideloader();
      }
      this.li = Response;
      this.lis = this.li;
      console.log(this.li);
    });
    function hideloader() {
      // @ts-ignore
      document.getElementById('loading').style.display = 'none';
    }
  }
}
