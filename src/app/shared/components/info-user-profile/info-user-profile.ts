import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SportApi } from '../../interfaces/sport-interface';
import { UserService } from '../../services/user-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NEVER } from 'rxjs';

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

  userPhoto = rxResource


  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [{ value: this.deportista().nombre, disabled: true }],
      edad: [{ value: this.deportista().edad, disabled: true }],
      disciplina: [{ value: this.deportista().disciplina_deportiva, disabled: true }],
      nacionalidad: [{ value: this.deportista().nacionalidad, disabled: true }],
      telefono: [{ value: this.deportista().telefono, disabled: true }],
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
    console.log('foto:', this.photoSrc());

  });





}

