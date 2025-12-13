import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../authentication/service/auth-service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
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
    console.log({ username, password })

    this.loading.set(true);
    this.errorMessage.set('');


    this.#authService.login(username!, password!).subscribe({
      next: (res) => {
        console.log('✅ Login correcto:', res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.usuario));
        //Navegamos a la ruta de la informacion del usaurio
        this.router.navigate(['info/sportPerformance/user-sport']);
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        this.mostrarErrorTemporal(err.error?.error || 'Error al iniciar sesión');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }


  private mostrarErrorTemporal(msgError: string) {
    this.errorMessage.set(msgError);
    setTimeout(() => this.errorMessage.set(''), 4000);
  }
}
