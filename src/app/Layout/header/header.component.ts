import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

   isLoggedIn$!: Observable<boolean>;
   userData$!:Observable<any>;

  constructor(private bookService:BookService){}

  ngOnInit(): void {
   this.isLoggedIn$ = this.bookService.isLoggedIn;
   this.userData$ = this.bookService.getLoggedInUser;
  }
}
