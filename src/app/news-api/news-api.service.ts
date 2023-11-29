import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '8b18fbdc167e4d529fd1f790f999763b';
  private country = 'it';

  pagesInput: Subject<number>;
  pagesOutput: Observable<any>;
  numberOfPages: Observable<number>;

  constructor() { 
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page)=>{
        return new HttpParams()
        .set('api', this.apiKey)
        .set('country', this.country)
        .set('pageSize', String(this.pageSize))
        .set('page', String(page));
      })
    )
  }
}
