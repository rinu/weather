import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { Location } from '../location';
import { Weather } from '../weather';
import { Forecast } from '../forecast';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';
import { LocationStorageService } from '../location-storage.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  location?: Location;
  weather?: Weather;
  forecast?: Forecast;

  getLocation (): Promise<Location> {
    return new Promise<Location>((resolve, reject) => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.locationService.get(id)
          .subscribe(locations => {
            this.location = locations[0];
            resolve(this.location);
          }, error => reject(error));
      }
    });
  }

  getWeather (location: Location) {
    this.weatherService.now(location)
      .pipe(catchError(this.errorService.handle<any>('getWeather')))
      .subscribe(weather => this.weather = weather);
  }

  getForecast (location: Location) {
    this.weatherService.forecast(location)
      .pipe(catchError(this.errorService.handle<any>('getForecast')))
      .subscribe(forecast => this.forecast = forecast);
  }

  storeLocation (location: Location) {
    let locations = [];
    if (this.locationStorageService.has()) {
      locations = this.locationStorageService.get();
    }
    const index = locations.findIndex((loc: Location) => loc.display_name === location.display_name);
    if (index !== -1) {
      locations.splice(index, 1);
    }
    locations.unshift(location);
    locations = locations.slice(0, 5);
    this.locationStorageService.set(locations);
  }

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private weatherService: WeatherService,
    private locationStorageService: LocationStorageService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getLocation().then(location => {
      if (location) {
        this.getWeather(location);
        this.getForecast(location);
        this.storeLocation(location);
      }
    }, error => {
      this.errorService.setMessageFromHttpError('getLocation', error);
    });
  }
}
