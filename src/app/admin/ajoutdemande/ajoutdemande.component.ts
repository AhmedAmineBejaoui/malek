import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajoutdemande',
  templateUrl: './ajoutdemande.component.html',
  styleUrls: ['./ajoutdemande.component.scss']
})
export class AjoutdemandeComponent {
  demandeForm: FormGroup;
  success = false;

  types = ['Support', 'Requête'];
  sousTypes = ['Changement carte', 'Carte perdue'];
  cartes = ['Visa', 'Master Card'];

  constructor(private fb: FormBuilder) {
    this.demandeForm = this.fb.group({
      type: ['', Validators.required],
      sousType: ['', Validators.required],
      carte: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  envoyer() {
    if (this.demandeForm.invalid) {
      this.demandeForm.markAllAsTouched();
      return;
    }


    const { type, sousType, carte, description } = this.demandeForm.value;
    const message = `From: mokhtar.hammami@stb.com.tn\nTo: malekghrairi825@gmail.com\nSubject: Nouvelle demande STB\n\nType: ${type}\nSous-type: ${sousType}\nCarte: ${carte}\nDescription: ${description}`;
    console.log('Envoi mail simule:\n' + message);

    this.success = true;
    setTimeout(() => (this.success = false), 3000);

  }
}
