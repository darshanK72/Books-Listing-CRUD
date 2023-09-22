import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private bookService:BookService){}
  
  registerUser(registerForm:NgForm){
    console.log(registerForm);
    let user = registerForm.value;
    this.bookService.registerUser(user);
  }

  loginWithGoogle(){
    this.bookService.googleSingIn();
  }
}
