import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const body = {
      email: this.email,
      password: this.password
    };

    this.http.post('https://forart.alwaysdata.net/connexion.php', body).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('userToken', response.token); // Sauvegarder le token
          localStorage.setItem('userInfo', JSON.stringify(response.user)); // Sauvegarder l'utilisateur connecté
          this.router.navigate(['/dashboard']); // Rediriger après connexion
        } else {
          this.errorMessage = response.message; // Afficher les erreurs
        }
      },
      (error) => {
        this.errorMessage = 'Une erreur est survenue lors de la connexion';
        console.error(error);
      }
    );
  }
}
