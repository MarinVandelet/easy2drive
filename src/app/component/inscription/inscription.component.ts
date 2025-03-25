import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  prenom: string = '';
  nom: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    const body = {
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://forart.alwaysdata.net/inscription.php', body).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = response.message;
          this.prenom = this.nom = this.email = this.password = '';
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error(error);
        this.errorMessage = "Une erreur est survenue lors de l'inscription.";
      }
    );
  }
}
