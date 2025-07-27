import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  signupSuccess = false;

  loginSuccess = false;

  showLoginPassword = false;
  showSignupPassword = false;
  showSignupConfirmPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
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

    setTimeout(() => {
      if (email === 'test@test.com' && password === '1234') {
        localStorage.setItem('token', 'fake_token');
        localStorage.setItem('login', email);

        this.loginSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
          this.loginSuccess = false;
        }, 1500);

      } else {
        this.loginError = 'Email ou mot de passe incorrect';
      }
      this.isLoading = false;
    }, 1000);
  }

  handleSignup() {
    if (this.signupForm.invalid ||
        this.signupForm.value.motdepasse !== this.signupForm.value.confirmation) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.signupSuccess = true;
    setTimeout(() => {
      this.toggleForm();
      this.signupSuccess = false;
    }, 3000);
  }
}

