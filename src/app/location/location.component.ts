import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../location';
import { Weather } from '../weather';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  location?: Location;
  weather?: Weather;

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
    this.weatherService.getWeatherNow(location)
      .subscribe(weather => this.weather = weather);
  }

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getLocation().then(location => {
      this.getWeather(location);
    });
  }
}
