import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  addNoteWithFile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/notes`, formData);
  }

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/notes`);
  }
}
