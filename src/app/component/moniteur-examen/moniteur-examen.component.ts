import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-moniteur-examen',
  standalone: false,
  templateUrl: './moniteur-examen.component.html',
  styleUrls: ['./moniteur-examen.component.css']
})
export class MoniteurExamenComponent implements OnInit {
  examensAVenir: any[] = [];
  examensPasses: any[] = [];
  selectedExamen: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) return;

    this.http.post<any>('https://forart.alwaysdata.net/get_examens_moniteur.php', {
      id_moniteur: user.id
    }).subscribe(res => {
      this.examensAVenir = res.avenir || [];
      this.examensPasses = res.passes || [];
    });
  }

  voirDetails(examen: any) {
    this.selectedExamen = examen;
  }

  fermerModal() {
    this.selectedExamen = null;
  }
}
