import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ConnexionComponent } from './component/connexion/connexion.component';

// Routes définies
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Rediriger vers la page d'accueil par défaut
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
