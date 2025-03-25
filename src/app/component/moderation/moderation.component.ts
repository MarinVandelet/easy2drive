import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.css']
})
export class ModerationComponent implements OnInit {
  avisNonModeres: any[] = [];
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerAvis();
  }

  chargerAvis() {
    this.http.get<any[]>('https://forart.alwaysdata.net/get_avis_a_moderer.php')
      .subscribe(data => {
        this.avisNonModeres = data;
      });
  }

  publierAvis(id: number) {
    this.http.post('https://forart.alwaysdata.net/publier_avis.php', { id })
      .subscribe(() => {
        this.message = '✅ Avis publié avec succès.';
        this.chargerAvis();
      });
  }

  supprimerAvis(id: number) {
    this.http.post('https://forart.alwaysdata.net/supprimer_avis.php', { id })
      .subscribe(() => {
        this.message = '❌ Avis supprimé.';
        this.chargerAvis();
      });
  }
}
