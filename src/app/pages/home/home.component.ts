import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Film } from '../../types/Films';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
