import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/views/book-details/book-details.component.type';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Input() books: Book[] | [] = [];

  constructor() {}

  ngOnInit(): void {}
}
