import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocGenerateService {

  private apiUrl = 'http://localhost:3000/generate-doc'; 

  constructor(private http: HttpClient) {}

  generateText(userInput: string): Observable<any> {
    const body = { prompt: userInput, max_tokens: 100 }; 
    return this.http.post(this.apiUrl, body);
  }
}
