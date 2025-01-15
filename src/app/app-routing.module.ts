import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { MovieCatalogComponent } from './pages/movie-catalog/movie-catalog.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { authGuard } from './guards/auth.guard';
import { loggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'catalog', component: MovieCatalogComponent },
      { path: 'pricing-plan', component: HomeComponent },
      { path: 'help', component: HomeComponent },
      { path: 'movie/:id', component: MovieDetailsComponent },
    ],
  },
  { path: 'register', component: RegisterComponent, canActivate: [loggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loggedGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
