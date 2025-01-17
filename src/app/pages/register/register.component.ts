import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../utils/CustomValidators';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  subscription = new Subscription;
  registerForm: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
    }, 
    [passwordMatchValidator()]);
  }

  onSubmit() {
    const { username, password } = this.registerForm.value;

    this.subscription.add(this.api.register(username, password).subscribe({
      next: () => { 
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err),
    }))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
