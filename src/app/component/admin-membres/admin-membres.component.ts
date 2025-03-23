import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-admin-membres',
  templateUrl: './admin-membres.component.html',
  styleUrls: ['./admin-membres.component.css']
})
export class AdminMembresComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  editingUser: any = null;

  newUser = {
    prenom: '',
    nom: '',
    email: '',
    password: '',
    role: 'eleve',
    date_naissance: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('https://forart.alwaysdata.net/get_users.php').subscribe(data => {
      const rolesPriority: any = { admin: 0, moniteur: 1, eleve: 2 };

      this.users = data.sort((a, b) => {
        const roleA = rolesPriority[a.role] ?? 99;
        const roleB = rolesPriority[b.role] ?? 99;
        return roleA - roleB;
      });

      this.applyFilter();
    });
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();

    this.filteredUsers = this.users.filter(user =>
      (user.nom?.toLowerCase().includes(term) ||
       user.prenom?.toLowerCase().includes(term) ||
       user.email?.toLowerCase().includes(term) ||
       user.role?.toLowerCase().includes(term)) &&
      (this.selectedRole === '' || user.role === this.selectedRole)
    );
  }

  createMembre() {
    const { prenom, nom, email, password, role, date_naissance } = this.newUser;

    // Vérifie les champs vides
    if (!prenom || !nom || !email || !password || !role || !date_naissance) {
      alert("⚠️ Tous les champs sont obligatoires.");
      return;
    }

    // Vérifie le mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("⚠️ Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.");
      return;
    }

    // Vérifie l'âge pour les élèves
    if (role === 'eleve') {
      const birthDate = new Date(date_naissance);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isOldEnough = age > 16 || (age === 16 && today >= new Date(birthDate.setFullYear(birthDate.getFullYear() + 16)));

      if (!isOldEnough) {
        alert("⚠️ L'élève doit avoir au moins 16 ans.");
        return;
      }
    }

    // Envoi à l'API
    this.http.post('https://forart.alwaysdata.net/create_user.php', this.newUser).subscribe((res: any) => {
      if (res.success) {
        this.loadUsers();
        this.newUser = {
          prenom: '',
          nom: '',
          email: '',
          password: '',
          role: 'eleve',
          date_naissance: ''
        };
      } else {
        alert(res.message || "❌ Erreur lors de l'ajout.");
      }
    });
  }

  openEditModal(user: any) {
    this.editingUser = { ...user };
  }

  closeEditModal() {
    this.editingUser = null;
  }

  updateUser() {
    this.http.post('https://forart.alwaysdata.net/update_user.php', this.editingUser).subscribe((res: any) => {
      if (res.success) {
        this.loadUsers();
        this.closeEditModal();
      } else {
        alert(res.message || 'Erreur lors de la mise à jour');
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce membre ?')) {
      this.http.post('https://forart.alwaysdata.net/delete_user.php', { id }).subscribe((res: any) => {
        if (res.success) {
          this.loadUsers();
        } else {
          alert(res.message || 'Erreur lors de la suppression');
        }
      });
    }
  }
}
