import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { InscriptionComponent } from './component/inscription/inscription.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CodeExamenComponent } from './component/code-examen/code-examen.component';
import { CodeEntrainementComponent } from './component/code-entrainement/code-entrainement.component';
import { PermisLeconComponent } from './component/permis-lecon/permis-lecon.component';
import { PermisExamenComponent } from './component/permis-examen/permis-examen.component';
import { MoniteurLeconComponent } from './component/moniteur-lecon/moniteur-lecon.component';
import { MoniteurExamenComponent } from './component/moniteur-examen/moniteur-examen.component';
import { AdminMembresComponent } from './component/admin-membres/admin-membres.component';
import { ModerationComponent } from './component/moderation/moderation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ConnexionComponent,
    InscriptionComponent,
    CodeExamenComponent,
    CodeEntrainementComponent,
    PermisLeconComponent,
    PermisExamenComponent,
    MoniteurLeconComponent,
    MoniteurExamenComponent,
    AdminMembresComponent,
    ModerationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
