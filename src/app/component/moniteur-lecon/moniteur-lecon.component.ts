import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-moniteur-lecon',
  standalone: false,
  templateUrl: './moniteur-lecon.component.html',
  styleUrls: ['./moniteur-lecon.component.css']
})
export class MoniteurLeconComponent implements OnInit {
  leconsAVenir: any[] = [];
  leconsPassees: any[] = [];
  selectedLecon: any = null;

  showAvisModal = false;
  avisContenu = '';
  messageAvis = '';
  leconSelectionneePourAvis: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) return;

    this.http.post<any>('https://forart.alwaysdata.net/get_lecons_moniteur.php', {
      id_moniteur: user.id
    }).subscribe(res => {
      this.leconsAVenir = res.avenir || [];
      this.leconsPassees = res.passees || [];
    });
  }

  voirDetails(lecon: any) {
    this.selectedLecon = lecon;
  }

  fermerModal() {
    this.selectedLecon = null;
  }

  annulerLecon(id: number) {
    if (confirm("Voulez-vous vraiment annuler cette leçon ?")) {
      this.http.post('https://forart.alwaysdata.net/supprimer_lecon_moniteur.php', { id }).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  ouvrirAvis(lecon: any) {
    this.leconSelectionneePourAvis = lecon;
    this.avisContenu = lecon.avis || '';
    this.messageAvis = '';
    this.showAvisModal = true;
  }

  fermerAvisModal() {
    this.showAvisModal = false;
    this.leconSelectionneePourAvis = null;
  }

  envoyerAvis() {
    if (!this.leconSelectionneePourAvis?.id) return;

    const body = {
      id_lecon: this.leconSelectionneePourAvis.id,
      avis: this.avisContenu.trim()
    };

    this.http.post('https://forart.alwaysdata.net/post_avis_lecon.php', body).subscribe((res: any) => {
      if (res.success) {
        this.messageAvis = "✅ Avis enregistré.";
        this.showAvisModal = false;
        this.ngOnInit();
      }
    });
  }

  supprimerAvis() {
    if (!this.leconSelectionneePourAvis?.id) return;

    const body = {
      id_lecon: this.leconSelectionneePourAvis.id,
      avis: ''
    };

    this.http.post('https://forart.alwaysdata.net/post_avis_lecon.php', body).subscribe((res: any) => {
      if (res.success) {
        this.messageAvis = "✅ Avis supprimé.";
        this.showAvisModal = false;
        this.ngOnInit();
      }
    });
  }
}
