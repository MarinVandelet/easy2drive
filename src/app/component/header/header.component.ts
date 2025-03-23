import { Component, OnInit } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = null;
  role: string = '';

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.role = this.user.role;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    window.location.href = '/connexion';
  }
}
