import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService:AuthService){}
  
  registerUser(registerForm:NgForm){
    console.log(registerForm);
    let user = registerForm.value;
    this.authService.registerUser(user);
  }

  loginWithGoogle(){
    this.authService.googleSingIn();
  }
}
