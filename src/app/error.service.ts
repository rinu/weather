import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  message: string = '';

  show (message: string) {
    this.message = message;
  }

  clear () {
    this.message = '';
  }

  setMessageFromHttpError (operation = 'operation', error: HttpErrorResponse) {
    this.message = operation + ' ';
    if (error.error && error.error.message) {
      this.message += error.error.message;
    } else {
      this.message += error.statusText;
    }
  }

  handle<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.setMessageFromHttpError(operation, error);

      return of(result as T);
    };
  }
}
