import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { Location } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations: Location[] = [];

  search (event: KeyboardEvent): void {
    if (event.target) {
      const input = (event.target as HTMLInputElement).value;
      this.locationService.search(input)
        .subscribe(locations => this.locations = locations)
    }
  }

  constructor(private locationService: LocationService) {
    this.search = debounce(this.search, 500) as (event: KeyboardEvent) => void;
  }

  ngOnInit(): void { }
}
