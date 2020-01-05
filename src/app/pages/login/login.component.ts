import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',gi
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any; 
  password: any; 
  error: any;

  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this.error = this.authService.login(this.username, this.password);
    if(!this.error) {
      localStorage.setItem('token', 'ey34flf876fg8g4fd9fg79df8889usdf078sd6f79g68dfgdfgdfg')
      this._router.navigate(['/home']); 
    }
  }

}
