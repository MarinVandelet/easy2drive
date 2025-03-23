import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-permis-lecon',
  standalone: false,
  templateUrl: './permis-lecon.component.html',
  styleUrls: ['./permis-lecon.component.css']
})
export class PermisLeconComponent implements OnInit {
  creneaux = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'];
  semaineDebut: Date = this.getDebutSemaine(new Date());
  joursSemaine: Date[] = [];
  lecons: any[] = [];

  popupVisible = false;
  leconActive: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.genererSemaine();
    this.chargerLecons();
  }

  getDebutSemaine(date: Date): Date {
    const jour = new Date(date);
    const jourSemaine = jour.getDay();
    const diff = jour.getDate() - jourSemaine + (jourSemaine === 0 ? -6 : 1);
    return new Date(jour.setDate(diff));
  }

  genererSemaine() {
    this.joursSemaine = [];
    for (let i = 0; i < 7; i++) {
      const jour = new Date(this.semaineDebut);
      jour.setDate(this.semaineDebut.getDate() + i);
      this.joursSemaine.push(jour);
    }
  }

  changerSemaine(direction: number) {
    this.semaineDebut.setDate(this.semaineDebut.getDate() + 7 * direction);
    this.genererSemaine();
    this.chargerLecons();
  }

  chargerLecons() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) return;

    const body = {
      id_eleve: user.id,
      semaine_debut: this.semaineDebut.toISOString().split('T')[0]
    };

    this.http.post<any[]>('https://forart.alwaysdata.net/get_lecons_conduite.php', body)
      .subscribe(data => {
        this.lecons = data;
      });
  }

  getLecon(jour: Date, creneau: string) {
    const dateStr = jour.toISOString().split('T')[0];
    return this.lecons.find(l => l.date_lecon === dateStr && l.creneau === creneau);
  }

  ouvrirPopup(lecon: any) {
    this.leconActive = lecon;
    this.popupVisible = true;
  }

  fermerPopup() {
    this.popupVisible = false;
    this.leconActive = null;
  }
}
