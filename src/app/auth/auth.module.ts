import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // << important pour ngModel
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router'; // pour les routes enfants

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule // facultatif ici mais conseillé si tu as des routes
  ]
})
export class AuthModule {}
