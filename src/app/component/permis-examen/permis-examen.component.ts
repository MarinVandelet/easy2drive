import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-permis-examen',
  templateUrl: './permis-examen.component.html',
  styleUrls: ['./permis-examen.component.css']
})
export class PermisExamenComponent implements OnInit {
  examensAVenir: any[] = [];
  examensPasses: any[] = [];
  selectedExam: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerExamens();
  }

  chargerExamens() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) return;

    const body = { id_eleve: user.id };

    this.http.post<any[]>('https://forart.alwaysdata.net/get_examensavenir.php', body)
      .subscribe(data => {
        this.examensAVenir = data.filter(e => new Date(e.date_passage) > new Date());
      });

    this.http.post<any[]>('https://forart.alwaysdata.net/get_examens_permis.php', body)
      .subscribe(data => {
        this.examensPasses = data;
      });
  }

  voirDetails(exam: any) {
    this.selectedExam = exam;
  }

  fermerModal() {
    this.selectedExam = null;
  }
}
