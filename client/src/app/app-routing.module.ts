import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './views/users/users.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { BookDetailsComponent } from './views/book-details/book-details.component';
import { MovieDetailsComponent } from './views/movie-details/movie-details.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { MapsComponent } from './views/maps/maps.component';
import { BooksSearchComponent } from './components/books-search/books-search.component';
import { MoviesSearchComponent } from './components/movies-search/movies-search.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'books-search/:keyword', component: BooksSearchComponent },
  { path: 'movies-search/:keyword', component: MoviesSearchComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
