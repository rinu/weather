import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocationStorageService {
  private key: string = 'locations';

  get () {
    return this.storage.get(this.key);
  }

  set (value: any) {
    this.storage.set(this.key, value);
  }

  has () {
    return this.storage.has(this.key);
  }

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
}
