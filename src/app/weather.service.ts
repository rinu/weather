import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './location';
import { Weather } from './weather';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  getWeatherNow (location: Location): Observable<Weather> {
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${environment.weatherToken}`) as Observable<Weather>;
  }

  constructor(private httpClient: HttpClient) { }
}
