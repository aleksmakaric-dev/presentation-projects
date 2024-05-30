import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IHero } from '../../interfaces/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private apiUrl = environment.heroesApiUrl;

  constructor(private http: HttpClient) {}

  // Get list of heroes or search heroes
  getHeroes(search?: string): Observable<IHero[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<IHero[]>(this.apiUrl, { params });
  }

  // Delete a hero by ID
  deleteHero(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Update a hero by ID
  updateHero(id: number, hero: Partial<IHero>): Observable<IHero> {
    return this.http.put<IHero>(`${this.apiUrl}/${id}`, hero);
  }
}
