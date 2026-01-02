import { Component } from '@angular/core';

@Component({
  selector: 'app-load-page',
  imports: [],
  templateUrl: './load-page.html',
  styleUrl: './load-page.css',
})
export class LoadPage {

  // Extensiones permitidas
  private readonly allowedExtensions = ['xls', 'xlsx', 'csv', 'xml'];

  selectedFile: File | null = null;
  errorMessage: string | null = null;

  /**
   * Evento al seleccionar archivo (click o drag&drop)
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const extension = this.getFileExtension(file.name);

    if (!this.allowedExtensions.includes(extension)) {
      this.resetFile();
      this.errorMessage = 'Formato de archivo no permitido. Solo XLS, XLSX, CSV o XML.';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = null;
  }

  /**
   * Obtiene la extensión del archivo
   */
  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() ?? '';
  }

  /**
   * Limpia la selección
   */
  resetFile(): void {
    this.selectedFile = null;
  }

  /**
   * Enviar archivo al backend
   */
  upload(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Debes seleccionar un archivo.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Aquí irá la llamada HTTP (HttpClient)
    // this.http.post('/api/metrics/import', formData).subscribe(...)
  }
}
