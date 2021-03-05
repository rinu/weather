import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './location';
import { Weather } from './weather';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  getWeatherNow (location: Location): Observable<Weather> {
    const appId = 'bd5117c50a8b3ab7984d451bb8b799b8';
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${appId}`) as Observable<Weather>;
  }

  constructor(private httpClient: HttpClient) { }
}
