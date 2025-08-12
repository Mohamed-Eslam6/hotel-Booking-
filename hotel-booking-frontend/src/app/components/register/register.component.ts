import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  passwordMismatch = false;
  submitted = false;

  constructor(private api: ApiService, private router: Router) {}

  register() {
    this.submitted = true;
    this.error = '';
    this.passwordMismatch = false;

    if (!this.name.trim()) return;
    if (!this.email.trim() || !this.validateEmail(this.email)) return;
    if (!this.password) return;
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.api.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.error = 'Registration failed'
    });
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
