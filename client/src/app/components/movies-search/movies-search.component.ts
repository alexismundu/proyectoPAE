import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Movie } from 'src/app/views/movie-details/movie-details.component.type';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss']
})
export class MoviesSearchComponent implements OnInit {
  // @Input() movies: Movie[] | [] = [];
  movieKeyword: string | null;
  movies: Movie[] | null;

  constructor(private session: SessionService, private route:ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.movieKeyword = routeParams.get('keyword'); 
    this.session.searchMovies(this.movieKeyword).subscribe({
      next: this.handleGetMovies.bind(this),
      error: this.handleGetMoviesError,
    })
  }

  ngOnInit(): void {

  }

  setCurrentMovie(movie: Movie) {
    this.session.setCurrentMovie(movie);
  }

  handleGetMovies(data: any) {
    this.movies = data.length > 10 ? data.slice(0, 10) : data;
  }

  handleGetMoviesError(e: string) {
    console.log('MovieDetails error: ', e);
  }

}
