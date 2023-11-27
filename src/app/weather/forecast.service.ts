import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getForecast(){
    return this.getCurrentLocation()
    .pipe(
      map(coords => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', '6c320dae9fe183693afb249edb194b69')
      }),
      switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params })),
    )
  }

  getCurrentLocation(){
    return new Observable<GeolocationCoordinates>((observer)=>{
        window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
        );
      });
  }
}
