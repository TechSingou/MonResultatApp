import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExamenComponent } from './examen/examen.component';
import { ConcoursComponent } from './concours/concours.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { HomeComponent } from './home/home.component';
import { AddResultatExamenComponent } from './add-resultat-examen/add-resultat-examen.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'examens', component: ExamenComponent },
  { path: 'concours', component: ConcoursComponent },
  { path: 'actualites', component: ActualiteComponent },
  { path: 'addResultatExamen', component: AddResultatExamenComponent },
  {path:'accueil',component:HomeComponent},
  {path:'',redirectTo:'/accueil',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
