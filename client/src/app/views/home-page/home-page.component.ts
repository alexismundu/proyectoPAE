import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Book } from './home-page.component.type';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  books: Book[] | [] = [];
  constructor(private http: HttpClient) {
    this.http.get('../../../assets/libros.json').subscribe((response: any) => {
      if (response) {
        hideloader();
      }
      this.books = response.data;
      console.log(this.books);
    });
    function hideloader() {
      let loading: any = document.getElementById('loading');
      if (loading) loading.style.display = 'none';
    }
  }

  ngOnInit(): void {}
}
