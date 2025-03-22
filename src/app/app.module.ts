import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Import du module de routage
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { FormsModule } from '@angular/forms';  // Import de FormsModule pour utiliser ngModel

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ConnexionComponent,  // Déclaration de tous les composants
  ],
  imports: [
    BrowserModule,  // Import du module de base pour le rendu dans le navigateur
    AppRoutingModule,  // Import du module de routage pour la gestion des routes
    FormsModule,  // Import de FormsModule pour utiliser ngModel dans les formulaires
  ],
  providers: [],
  bootstrap: [AppComponent]  // Composant principal qui démarre l'application
})
export class AppModule { }
