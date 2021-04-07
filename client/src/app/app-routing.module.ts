import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './views/users/users.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { BookDetailsComponent } from './views/book-details/book-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'books/:id', component: BookDetailsComponent },
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
