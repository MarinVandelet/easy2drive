import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  avisList: any[] = [];
  offset: number = 0;
  limit: number = 3;
  hasMore: boolean = true;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAvis();
  }

  loadAvis(): void {
    if (this.isLoading || !this.hasMore) return;

    this.isLoading = true;
    const url = `https://forart.alwaysdata.net/api/get_avis.php?offset=${this.offset}`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        console.log("✔️ Avis reçus :", data);
        if (data && data.length > 0) {
          this.avisList = [...this.avisList, ...data];
          this.offset += this.limit;
        } else {
          this.hasMore = false;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error("❌ Erreur lors du chargement des avis :", error);
        this.isLoading = false;
      }
    });
  }
}
