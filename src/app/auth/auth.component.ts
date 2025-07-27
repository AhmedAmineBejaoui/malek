import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  // Login
  loginEmail: string = '';
  loginPassword: string = '';
  loginError: string = '';
  isLoading: boolean = false;
  showLoginPassword: boolean = false; // pour afficher/masquer mot de passe login

  // Signup
  showLogin: boolean = true; // true = formulaire login visible, false = signup visible
  signup = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    motdepasse: '',
    confirmation: '',
    conditions: false,
  };
  showSignupPassword: boolean = false;
  showSignupConfirmPassword: boolean = false;
  signupSuccess: boolean = false;

  constructor(private router: Router) {}

  // Toggle affichage mot de passe login
  toggleShowLoginPassword() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  // Toggle affichage mot de passe signup
  toggleShowSignupPassword() {
    this.showSignupPassword = !this.showSignupPassword;
  }

  // Toggle affichage confirmation mot de passe signup
  toggleShowSignupConfirmPassword() {
    this.showSignupConfirmPassword = !this.showSignupConfirmPassword;
  }

  // Changer entre login et signup
  toggleForm() {
    this.showLogin = !this.showLogin;
    this.loginError = '';
    this.signupSuccess = false;
  }

  // Gestion du login
  handleLogin() {
  this.loginError = '';
  this.isLoading = true;

  setTimeout(() => {
    // Simule une authentification réussie
    if (this.loginEmail === 'test@test.com' && this.loginPassword === '1234') {
      localStorage.setItem('token', 'votre_token');
      localStorage.setItem('login', this.loginEmail);
      this.router.navigate(['/admin']); // Redirection vers la main page
    } else {
      this.loginError = 'Email ou mot de passe incorrect';
    }
    this.isLoading = false;
  }, 1000);
}

  // Gestion du signup (à compléter selon besoins)
  handleSignup() {
    if (
      !this.signup.prenom ||
      !this.signup.nom ||
      !this.signup.email ||
      !this.signup.telephone ||
      !this.signup.motdepasse ||
      !this.signup.confirmation ||
      !this.signup.conditions
    ) {
      alert('Veuillez remplir tous les champs et accepter les conditions.');
      return;
    }
    if (this.signup.motdepasse !== this.signup.confirmation) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    // Ici tu peux ajouter un appel API réel
    this.signupSuccess = true;
    setTimeout(() => {
      this.toggleForm();
      this.signupSuccess = false;
    }, 3000);
  }
}
