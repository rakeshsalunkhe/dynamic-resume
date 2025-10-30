import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../config/app-settings';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient) {}

  getResumeData(): Observable<any> {
    console.log(AppSettings.RESUME_JSON_PATH);
    return this.http.get<any>(AppSettings.RESUME_JSON_PATH);
  }
}
