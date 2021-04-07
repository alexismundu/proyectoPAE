import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/views/movie-details/movie-details.component.type';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[] | [] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
