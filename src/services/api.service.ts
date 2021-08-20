import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base: string = environment.api;

  constructor(private http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.base}${url}`);
  }

  public post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.base}${url}`, data);
  }

  public put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.base}${url}`, data);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.base}${url}`);
  }

  public postUrl<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${url}`, data);
  }
}
