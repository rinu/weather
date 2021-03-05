import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../location';
import { Weather } from '../weather';
import { Forecast } from '../forecast';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';
import { LocationStorageService } from '../location-storage.service';

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
          });
      }
    });
  }

  getWeather (location: Location) {
    this.weatherService.now(location)
      .subscribe(weather => this.weather = weather);
  }

  getForecast (location: Location) {
    this.weatherService.forecast(location)
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
    private locationStorageService: LocationStorageService
  ) { }

  ngOnInit(): void {
    this.getLocation().then(location => {
      this.getWeather(location);
      this.getForecast(location);
      this.storeLocation(location);
    });
  }
}
