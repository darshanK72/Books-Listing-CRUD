import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginUser(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.loginUser(
        loginForm.value.email,
        loginForm.value.password
      );
    }
  }

  loginWithGoogle() {
    this.authService.googleSingIn();
  }
}
