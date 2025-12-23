import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../authentication/service/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  readonly #authService = inject(AuthService);
  hasError = signal(false);
  readonly router = inject(Router);
  readonly fb = inject(FormBuilder);


  loading = signal(false);
  errorMessage = signal('');

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      this.loginForm.reset();
      return;
    }

    //Si todo va bien
    const { username = '', password = '' } = this.loginForm.value;

    this.loading.set(true);
    this.errorMessage.set('');

    this.#authService.login(username!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate([
          '/sport/user-sport',
          this.#authService._user()?.id
        ]);

        return;
      }
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
    });
  }



  private mostrarErrorTemporal(msgError: string) {
    this.errorMessage.set(msgError);
    setTimeout(() => this.errorMessage.set(''), 4000);
  }
}
