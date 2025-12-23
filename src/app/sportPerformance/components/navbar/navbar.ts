import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AuthService } from '../../../auth/authentication/service/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // router = inject(Router);
  readonly router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);

  exit() {
    //Limpiamos localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  //Este fragmento convierte los parámetros de la ruta en una Signal de Angular.
  // ✅ SIEMPRE obtiene el id, aunque la ruta cambie
  idRuta = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let current = this.activatedRoute.root;
        while (current.firstChild) {
          current = current.firstChild;
        }
        return Number(current.snapshot.paramMap.get('id'));
      })
    ),
    { initialValue: null }
  );
}
