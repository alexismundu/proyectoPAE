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

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TopBarComponent,
    HomePageComponent,
    BookListComponent,
    BookListItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
