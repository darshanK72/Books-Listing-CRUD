import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private bookService:BookService){}

  loginUser(loginForm:NgForm){
    console.log(loginForm.value);

    if(loginForm.valid){
      this.bookService.loginUser(loginForm.value.email,loginForm.value.password)
    }

  }

  loginWithGoogle(){
    this.bookService.googleSingIn();
  }
}
