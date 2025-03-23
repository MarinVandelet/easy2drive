import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  avisList: any[] = [];
  offset: number = 0;
  hasMore: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAvis();
  }

  loadAvis(): void {
    const url = `https://forart.alwaysdata.net/get_avis.php?offset=${this.offset}`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        if (!Array.isArray(data)) {
          console.error("RÃ©ponse inattendue :", data);
          return;
        }

        this.avisList = [...this.avisList, ...data];
        this.offset += 3;

        if (data.length < 3) {
          this.hasMore = false;
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des avis :", error);
      }
    });
  }
}