import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private bookService:BookService,private router:Router){}

  logout(){
    this.bookService.logoutUser()
  }

  cancle(){
    this.router.navigate(["dashboard"]);
  }
}
