import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { NEVER, catchError, of } from 'rxjs';

import { SportApi } from '../../interfaces/sport-interface';
import { UserService } from '../../services/user-service';
import { CreateUserPage } from '../../../sportPerformance/pages/user-info-page/create-user-page/create-user-page';

@Component({
  selector: 'app-info-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CreateUserPage],
  templateUrl: './info-user-profile.html',
  styleUrl: './info-user-profile.css',
})
export class InfoUserProfile implements OnInit {

  /* =======================
   * DEPENDENCIAS
   * ======================= */
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);

  /* =======================
   * INPUTS
   * ======================= */
  readonly deportista = input.required<SportApi.Deportista>();

  /* =======================
   * FORMULARIO
   * ======================= */
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      edad: [{ value: null, disabled: true }],
      disciplina: [{ value: '', disabled: true }],
      telefono: [{ value: '', disabled: true }],
    });
  }

  /* =======================
   * SINCRONIZAR FORM ↔ DEPORTISTA
   * ======================= */
  constructor() {
    effect(() => {
      const d = this.deportista();
      if (!d || !this.form) return;

      this.form.patchValue({
        nombre: d.nombre,
        edad: d.edad,
        disciplina: d.disciplina_deportiva,
        telefono: d.telefono,
      });
    });
  }

  /* =======================
   * FOTO DE USUARIO (RESOURCE)
   * ======================= */
  readonly userPhotoResource = rxResource({
    params: () => {
      const d = this.deportista();
      return d?.usuario_id ? { id: d.usuario_id } : null;
    },
    stream: ({ params }) => {
      if (!params) return NEVER;

      return this.userService.getUserPhoto(params.id).pipe(
        catchError(() => of(null)) // ✔️ si no hay foto → null
      );
    },
  });

  /* =======================
   * FOTO FINAL PARA LA VISTA
   * ======================= */
  readonly photoSrc = computed(() => {
    const result = this.userPhotoResource.value();
    return result?.foto_url ?? 'assets/images/no-image.jpg';
  });

  /* =======================
 * DEBUG RESOURCE FOTO
 * ======================= */
  readonly debugUserPhotoResource = effect(() => {
    const error = this.userPhotoResource.error();

    if (error) {
      console.error('🔥 userPhotoResource EN ERROR', {
        error,
        cause: (error as any)?.cause,
      });
    }
  });

}
