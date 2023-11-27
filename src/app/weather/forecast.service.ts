import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor() { }

  getForecast(){
    return this.getCurrentLocation()
    .pipe(
      map(coords => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', '6c320dae9fe183693afb249edb194b69')
      })
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
