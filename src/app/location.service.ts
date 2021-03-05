import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  search (input: string): Observable<Location[]> {
    return this.httpClient.get('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + encodeURIComponent(input)) as Observable<Location[]>;
  }

  get (id: string): Observable<Location[]> {
    return this.httpClient.get('https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=' + id) as Observable<Location[]>;
  }

  constructor(private httpClient: HttpClient) { }
}
