import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location';
import { Weather } from './weather';
import { Forecast } from './forecast';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/';

  now (location: Location): Observable<Weather> {
    return this.httpClient.get(`${this.baseUrl}weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${environment.weatherToken}`) as Observable<Weather>;
  }

  forecast (location: Location): Observable<Forecast> {
    return this.httpClient.get(`${this.baseUrl}onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${environment.weatherToken}`) as Observable<Forecast>;
  }

  constructor(private httpClient: HttpClient) { }
}
