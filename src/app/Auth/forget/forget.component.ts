import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {

  email!: string;
  
  constructor(private bookService:BookService) {}

  forgetPassword(forgetForm:NgForm){
    this.email = forgetForm.value.email;
    this.bookService.forgetPassword(this.email);
  }
}
