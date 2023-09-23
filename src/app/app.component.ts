import { Component, OnInit } from '@angular/core';
import { User } from './Models/user';
import { BookService } from './Services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Book Listing CRUD';

  constructor(){}

  ngOnInit():void{
  }
}
