import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private subscription = new Subscription;
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private auth: AuthService,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    })
  }

  onSubmit() { 
    const { username, password } = this.loginForm.value;

    this.subscription.add(this.auth.login(username, password).subscribe({
      next: () => this.loginError = false,
      error: (err) => this.loginError = true,
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
