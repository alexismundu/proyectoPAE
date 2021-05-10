import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './views/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookListItemComponent } from './components/book-list-item/book-list-item.component';
import { BookDetailsComponent } from './views/book-details/book-details.component';
import { SessionService } from './services/session.service';
import { MovieListItemComponent } from './components/movie-list-item/movie-list-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './views/movie-details/movie-details.component';
import { ChatInboxComponent } from './components/chat-inbox/chat-inbox.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickDirective } from './directives/click.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TopBarComponent,
    HomePageComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    MovieListItemComponent,
    MovieListComponent,
    MovieDetailsComponent,
    ChatInboxComponent,
    LoginComponent,
    SignUpComponent,
    ClickDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatChipsModule,
  ],
  providers: [SessionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
