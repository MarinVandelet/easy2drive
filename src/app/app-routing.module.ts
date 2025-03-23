import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { InscriptionComponent } from './component/inscription/inscription.component';

import { CodeExamenComponent } from './component/code-examen/code-examen.component';
import { CodeEntrainementComponent } from './component/code-entrainement/code-entrainement.component';
import { PermisLeconComponent } from './component/permis-lecon/permis-lecon.component';
import { PermisExamenComponent } from './component/permis-examen/permis-examen.component';

import { MoniteurLeconComponent } from './component/moniteur-lecon/moniteur-lecon.component';
import { MoniteurExamenComponent } from './component/moniteur-examen/moniteur-examen.component';

import { AdminMembresComponent } from './component/admin-membres/admin-membres.component';
import { ModerationComponent } from './component/moderation/moderation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },

  // ✅ Routes Élève - Code
  { path: 'code/examen', component: CodeExamenComponent },
  { path: 'code/entrainement', component: CodeEntrainementComponent },

  // ✅ Routes Élève - Permis
  { path: 'permis/lecon', component: PermisLeconComponent },
  { path: 'permis/examen', component: PermisExamenComponent },

  // ✅ Routes Moniteur
  { path: 'moniteur/lecon', component: MoniteurLeconComponent },
  { path: 'moniteur/examen', component: MoniteurExamenComponent },

  // ✅ Routes Administrateur
  { path: 'admin/membres', component: AdminMembresComponent },
  { path: 'admin/moderation', component: ModerationComponent },

  // ✅ Redirections
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
