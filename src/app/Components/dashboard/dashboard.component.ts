import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  bookList:Book[] = [];

  constructor(private bookService:BookService){}

  ngOnInit(){
    this.bookService.getAllBooks().then((books)=>{
      books.forEach((book)=>{
        book.data()['id'] = book.id;
        let b = {
          ...book.data(), bookId: book.id
        }
        this.bookList.push(b as unknown as Book);
      });
    })
  }

}
