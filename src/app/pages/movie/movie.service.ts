import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovie(): Observable<any> {
    return this.http
      .get(`/3/list/1?api_key=ee3f9462b1eccd01a2d74243b3f7329c`)
      .pipe(
        map((response: any) =>
          response && response.items.length ? response : {}
        ),
        catchError((error) => of({}))
      );
  }
}
