import { Component, computed, effect, inject, input, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SportApi } from '../../interfaces/sport-interface';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-info-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './info-user-profile.html',
  styleUrl: './info-user-profile.css',
})
export class InfoUserProfile implements OnInit {
  form!: FormGroup;
  fb = inject(FormBuilder);
  userService = inject(UserService);
  deportista = input.required<SportApi.Deportista>();

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      edad: [{ value: null, disabled: true }],
      disciplina: [{ value: '', disabled: true }],
      telefono: [{ value: '', disabled: true }],
    });

    this.syncFormWithDeportista();
  }

  syncFormWithDeportista() {
    effect(() => {
      const d = this.deportista();
      if (!d) return;

      this.form.patchValue({
        nombre: d.nombre,
        edad: d.edad,
        disciplina: d.disciplina_deportiva,
        telefono: d.telefono,
      });
    });
  }

  userPhotoResource = rxResource({
    params: () => ({ id: this.deportista().usuario_id }),
    stream: ({ params }) => {
      return this.userService.getUserPhoto(params.id);
    }
  });

  photoSrc = computed(() => {
    const result = this.userPhotoResource.value();
    return result?.foto_url ?? 'assets/images/no-image.jpg';
  });
}

