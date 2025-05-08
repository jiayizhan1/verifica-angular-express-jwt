import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AutoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private authService: AuthService, private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.apiUrl}/auto`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  getModelliByMarche(marche: string[]) {
    return this.http.get(`${this.apiUrl}/marche-auto`, {
      params: { marche },
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }
}
