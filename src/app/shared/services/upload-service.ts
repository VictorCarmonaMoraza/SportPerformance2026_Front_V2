import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/upload-file`;

  // metrics-service.ts
  uploadMetricsFile(file: File, deportistaId: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('deportista_id', String(deportistaId));

    return this.http.post(`${this.baseUrl}/uploadfile`, formData);

  }

}
