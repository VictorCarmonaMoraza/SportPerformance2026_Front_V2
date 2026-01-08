import { Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MetricsService } from '../../../shared/services/metrics-service';
import { UploadService } from '../../../shared/services/upload-service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-load-page',
  imports: [DecimalPipe],
  templateUrl: './load-page.html',
  styleUrl: './load-page.css',
})
export class LoadPage implements OnInit {

  deportistaId: number | null = Number(localStorage.getItem('deportistaId'));
  private readonly uploadService = inject(UploadService);
  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;


  // Extensiones permitidas
  private readonly allowedExtensions = ['xls', 'xlsx', 'csv', 'xml'];

  selectedFile: File | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const storedId = localStorage.getItem('deportistaId');
    this.deportistaId = storedId ? Number(storedId) : null;

    console.log('ID deportista:', this.deportistaId);
  }

  /* ===============================
   * INPUT FILE (CLICK)
   * =============================== */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.processFile(file);
  }

  /* ===============================
   * PROCESAR FICHERO
   * =============================== */
  private processFile(file: File): void {
    const extension = this.getFileExtension(file.name);

    if (!this.allowedExtensions.includes(extension)) {
      this.resetFile();
      this.errorMessage =
        'Formato de archivo no permitido. Solo XLS, XLSX, CSV o XML.';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = null;
  }

  /* ===============================
   * UTILIDADES
   * =============================== */
  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() ?? '';
  }

  resetFile(): void {
    this.selectedFile = null;
  }

  /* ===============================
   * SUBIR ARCHIVO
   * =============================== */
  upload(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Debes seleccionar un archivo.';
      return;
    }

    if (!this.deportistaId) {
      this.errorMessage = 'No hay deportista seleccionado.';
      return;
    }

    this.uploadService
      .uploadMetricsFile(this.selectedFile, this.deportistaId)
      .subscribe({
        next: response => {
          console.log('Upload OK:', response);
          this.errorMessage = null;
          this.resetForm();
        },
        error: err => {
          console.error('Upload ERROR:', err);
          this.errorMessage = 'Error al subir el archivo.';
          this.resetForm();
        },
      });
  }

  private resetForm(): void {
    this.selectedFile = null;
    this.errorMessage = null;

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }


}
