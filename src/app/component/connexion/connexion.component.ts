import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  standalone: false,
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  login() {
    this.errorMessage = '';

    const body = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://forart.alwaysdata.net/connexion.php', body).subscribe(
      (response) => {
        if (response.success) {
          console.log('✅ Connexion réussie :', response.user);
          localStorage.setItem('user', JSON.stringify(response.user)); 
          window.location.href = '/home'; 
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error('Erreur HTTP :', error);
        this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer plus tard.';
      }
    );
  }
}
