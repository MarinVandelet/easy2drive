import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-code-entrainement',
  standalone: false,
  templateUrl: './code-entrainement.component.html',
  styleUrls: ['./code-entrainement.component.css']
})
export class CodeEntrainementComponent implements OnInit {
  derniersTests: any[] = [];
  examensBlancs: any[] = [];

  selectedItem: any = null;
  modalType: 'entrainement' | 'examen' = 'entrainement';

  moyenneTest: number = 0;
  moyenneExamen: number = 0;

  graphData: { score: number; label: string }[] = [];
  width = 600;
  height = 200;
  stepX = 40;
  points = '';
  tooltip: { label: string, x: number, y: number } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) return;

    const body = { id_eleve: user.id };

    this.http.post<any[]>('https://forart.alwaysdata.net/get_tests.php', body).subscribe(data => {
      this.derniersTests = data.map(t => ({
        ...t,
        duree: t.duree ?? 30
      }));
      this.calculerMoyennes();
      this.generateGraphData();
    });

    this.http.post<any[]>('https://forart.alwaysdata.net/get_code_blancs.php', body).subscribe(data => {
      this.examensBlancs = data.map(e => ({
        ...e,
        duree: e.duree ?? 40
      }));
      this.calculerMoyennes();
      this.generateGraphData();
    });
  }

  calculerMoyennes() {
    const totalTest = this.derniersTests.reduce((acc, val) => acc + val.score, 0);
    this.moyenneTest = this.derniersTests.length ? Math.round(totalTest / this.derniersTests.length) : 0;

    const totalExamen = this.examensBlancs.reduce((acc, val) => acc + val.score, 0);
    this.moyenneExamen = this.examensBlancs.length ? Math.round(totalExamen / this.examensBlancs.length) : 0;
  }

  generateGraphData() {
    this.graphData = [...this.derniersTests.map(t => ({ score: t.score, label: 'Test ' + t.date_passage })), ...this.examensBlancs.map(e => ({ score: e.score, label: 'Examen ' + e.date_passage }))];
    this.stepX = this.graphData.length > 1 ? this.width / (this.graphData.length - 1) : this.width;
    this.points = this.graphData.map((p, i) => `${i * this.stepX},${this.height - (p.score * this.height / 40)}`).join(' ');
  }

  openModal(item: any, type: 'entrainement' | 'examen') {
    this.selectedItem = item;
    this.modalType = type;
  }

  closeModal() {
    this.selectedItem = null;
  }

  getScoreClass(score: number): string {
    return score >= 35 ? 'score-vert' : 'score-rouge';
  }

  showTooltip(point: any, event: MouseEvent) {
    this.tooltip = {
      label: `${point.label} : ${point.score}/40`,
      x: event.offsetX + 15,
      y: event.offsetY - 10
    };
  }

  hideTooltip() {
    this.tooltip = null;
  }
}
