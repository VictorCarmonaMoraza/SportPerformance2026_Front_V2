import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetricsService } from '../../../../shared/services/metrics-service';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../../../../shared/services/sport-service';
import { SportApi } from '../../../../shared/interfaces/sport-interface';

@Component({
  selector: 'app-create-user-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user-page.html',
  styleUrl: './create-user-page.css',
})
export class CreateUserPage implements OnInit {

  #metrics = inject(MetricsService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  userId = signal<number>(0);
  #sportService = inject(SportService);



  deportistaForm!: FormGroup;

  ngOnInit(): void {
    this.userId.set(Number(this.route.snapshot.paramMap.get('id')));
    this.deportistaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(1)]],
      disciplina_deportiva: ['', Validators.required],
      nacionalidad: [''],
      telefono: [''],
    });
  }

  save() {
    //recoger los datos del formulario
    if (this.deportistaForm.invalid) {
      this.deportistaForm.markAllAsTouched();
      return;
    }

    const payload = {
      usuario_id: this.userId(),
      ...this.deportistaForm.value
    };

    this.#metrics.createDeportista(payload).subscribe({
      next: (res: SportApi.SportResponse) => {
        const deportistaId = res.data.id;

        console.log('ID devuelto por backend:', deportistaId);

        this.#sportService.setUserId(deportistaId);
        this.#sportService.reloadInfoUser();

        this.closeModal();
      },
      error: err => {
        console.error('❌ Error:', err);
      }
    });
  }


  closeModal() {
    const dialog = document.getElementById('my_modal_1') as HTMLDialogElement;
    dialog?.close();
  }
}
