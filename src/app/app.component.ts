import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { User } from './Models/user';
import { BookService } from './Services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Book Listing CRUD';

  user:User = {
    firstName:"Darshan",
    lastName:"Khairnar",
    gender:"Male",
    dateOfBirth:'2000-12-07',
    address:'Anand Nagar, Malegaon, Soygaon',
    email:"darshankhairnar72@gmail.com",
    password:"darshan@123"
  }

  constructor(private bookService:BookService){}

  ngOnInit():void{
    // this.bookService.registerUser(this.user)
  }
}
