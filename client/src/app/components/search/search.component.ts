import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  form:FormGroup

  constructor(private formBuilder:FormBuilder, private sessionService:SessionService, private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      movies_books: ['movies'],
      search_text: ['']
    })
  }

  search() {
    if(this.form.get('movies_books').value == "movies"){
      this.router.navigate(['/movies-search', this.form.get('search_text').value])
    } else {
      this.router.navigate(['/books-search', this.form.get('search_text').value])
    }
    console.log('buscando')
  }

}
