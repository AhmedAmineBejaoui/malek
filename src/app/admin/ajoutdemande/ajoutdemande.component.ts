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


    const resume = JSON.stringify(this.demandeForm.value, null, 2);
    console.log('Envoi mail simule:', resume);

    this.success = true;
    setTimeout(() => this.success = false, 3000);

  }
}
