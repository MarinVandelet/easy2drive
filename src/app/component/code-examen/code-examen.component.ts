import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-code-examen',
  templateUrl: './code-examen.component.html',
  styleUrls: ['./code-examen.component.css'],
  standalone: false
})
export class CodeExamenComponent implements OnInit {
  idEleve = 18;
  moyenne = 0;
  peutReserver = false;
  showConfirmation = false;

  examensAvenir: any[] = [];
  examensPasses: any[] = [];

  formVisible = false;
  formData = {
    date_passage: '',
    creneau: '',
    centre: ''
  };

  creneaux = [
    '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
    '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'
  ];

  detailAvenir: any = null;
  detailPasse: any = null;

  popupAvisVisible = false;
  selectedStars = 0;
  avisCommentaire = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMoyenne();
    this.getExamensAvenir();
    this.getExamensPasses();
  }

  getMoyenne() {
    this.http.get<any>(`http://forart.alwaysdata.net/get_scores_moyens.php?id_eleve=${this.idEleve}`)
      .subscribe(res => {
        const t = res.moyenne_tests || 0;
        const b = res.moyenne_codeblancs || 0;
        this.moyenne = (t + b) / 2;
        this.peutReserver = this.moyenne > 32;
      });
  }

  getExamensAvenir() {
    this.http.get<any[]>(`http://forart.alwaysdata.net/get_code_a_venir.php?id_eleve=${this.idEleve}`)
      .subscribe(data => this.examensAvenir = data);
  }

  getExamensPasses() {
    this.http.get<any[]>(`http://forart.alwaysdata.net/get_code_examen.php?id_eleve=${this.idEleve}`)
      .subscribe(data => this.examensPasses = data);
  }

  supprimerReservation(id: number) {
    this.http.post('http://forart.alwaysdata.net/supprimer_reservation_code.php', { id })
      .subscribe(() => this.getExamensAvenir());
  }

  ouvrirDetailAvenir(exam: any) {
    this.detailAvenir = exam;
  }

  fermerDetailAvenir() {
    this.detailAvenir = null;
  }

  ouvrirDetailPasse(exam: any) {
    this.detailPasse = exam;
  }

  fermerDetailPasse() {
    this.detailPasse = null;
  }

  ouvrirFormulaire() {
    this.formVisible = true;
  }

  fermerFormulaire() {
    this.formVisible = false;
    this.formData = { date_passage: '', creneau: '', centre: '' };
  }

  validerReservation() {
    const body = { id_eleve: this.idEleve, ...this.formData };
    this.http.post('http://forart.alwaysdata.net/ajouter_reservation_code.php', body)
      .subscribe(() => {
        this.getExamensAvenir();
        this.fermerFormulaire();
        this.showConfirmation = true;
        setTimeout(() => this.showConfirmation = false, 3000);
      });
  }

  ouvrirAvis() {
    this.popupAvisVisible = true;
    this.selectedStars = 0;
    this.avisCommentaire = '';
  }

  fermerAvis() {
    this.popupAvisVisible = false;
  }

  setStars(note: number) {
    this.selectedStars = note;
  }

  envoyerAvis() {
    if (!this.selectedStars || !this.avisCommentaire.trim()) return;

    const body = {
      id_eleve: this.idEleve,
      contenu: this.avisCommentaire,
      etoiles: this.selectedStars
    };

    this.http.post('http://forart.alwaysdata.net/post_avis.php', body)
      .subscribe(() => this.fermerAvis());
  }
}
