import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { Location } from '../location';
import { LocationService } from '../location.service';
import { LocationStorageService } from '../location-storage.service';
import { ErrorService } from '../error.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations: Location[] = [];
  storeLocations: Location[] = [];

  search (event: KeyboardEvent): void {
    if (event.target) {
      const input = (event.target as HTMLInputElement).value;
      this.locationService.search(input)
        .pipe(catchError(this.errorService.handle<any>('search')))
        .subscribe(locations => {
          if (locations) {
            this.locations = locations
          }
        })
    }
  }

  setLocationsFromStorage () {
    this.storeLocations = this.locationStorageService.get();
  }

  constructor(
    private locationService: LocationService,
    private locationStorageService: LocationStorageService,
    private errorService: ErrorService
  ) {
    this.search = debounce(this.search, 500) as (event: KeyboardEvent) => void;
  }

  ngOnInit(): void {
    this.setLocationsFromStorage();
  }
}
