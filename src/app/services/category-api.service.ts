import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
 
@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  private baseUrl = 'https://localhost:44336/api/category';
 
  constructor(private http: HttpClient) {}
 
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }
}