import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    const authData = {
      "user1": {
        "name": "Admin",
        "permission": "admin",
        "password": "Admin"
      },
      "user2": {
        "name": "MyName",
        "permission": "none",
        "password": "test"
      }
    };

    const user = Object.values(authData).find(u => u.name === this.username && u.password === this.password);

    if (user) {
      console.log('Login successful');
      this.router.navigate(['/home'], { state: { user } });
    } else {
      this.error = 'Invalid username or password';
    }
  }
}