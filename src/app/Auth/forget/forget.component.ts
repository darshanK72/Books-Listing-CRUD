import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {

  email!: string;
  
  constructor(private authService:AuthService) {}

  forgetPassword(forgetForm:NgForm){
    this.email = forgetForm.value.email;
    this.authService.forgetPassword(this.email);
  }
}
