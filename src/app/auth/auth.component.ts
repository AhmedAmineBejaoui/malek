import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  showLogin = true;
  loginForm: FormGroup;
  signupForm: FormGroup;
  isLoading = false;
  loginError = '';

  signupError = '';
  signupSuccess = false;
  loginSuccess = false;
  showLoginPassword = false;
  showSignupPassword = false;
  showSignupConfirmPassword = false;


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.signupForm = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.pattern(/^\+?\d{8,15}$/)]],
      motdepasse: ['', [Validators.required, Validators.minLength(8)]],
      confirmation: ['', [Validators.required, Validators.minLength(8)]],
      conditions: [false, Validators.requiredTrue]
    });
  }


  toggleShowLoginPassword() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleShowSignupPassword() {
    this.showSignupPassword = !this.showSignupPassword;
  }

  toggleShowSignupConfirmPassword() {
    this.showSignupConfirmPassword = !this.showSignupConfirmPassword;
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
    this.loginError = '';
    this.signupError = '';
    this.signupSuccess = false;
    this.loginSuccess = false;
  }

  handleLogin() {
    this.loginError = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.auth.login({ email, password }).subscribe({
      next: () => {
        localStorage.setItem('token', 'fake_token');
        localStorage.setItem('login', email);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loginError = err.error?.error || 'Erreur lors de la connexion';
      }
    }).add(() => this.isLoading = false);
  }

  handleSignup() {

    this.signupError = '';
    if (this.signupForm.invalid ||
        this.signupForm.value.motdepasse !== this.signupForm.value.confirmation) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const payload = {
      username: this.signupForm.value.nom,
      userfirstname: this.signupForm.value.prenom,
      email: this.signupForm.value.email,
      mobile: this.signupForm.value.telephone,
      password: this.signupForm.value.motdepasse
    };
    this.auth.signup(payload).subscribe({
      next: () => {
        this.signupSuccess = true;
        setTimeout(() => {
          this.toggleForm();
          this.signupSuccess = false;
        }, 3000);
      },
      error: err => {
        this.signupError = err.error?.error || 'Erreur lors de l\'inscription';
      }
    });
  }
}

