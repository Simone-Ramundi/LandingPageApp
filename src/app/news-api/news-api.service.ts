import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap, pluck} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Article {
  title: string;
  url: string;
}

interface NewsApiResponse {
  totalResult: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '8b18fbdc167e4d529fd1f790f999763b';
  private country = 'it';

  private pagesInput: Subject<number>;
  pagesOutput: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject(); 
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page)=>{
        return new HttpParams()
        .set('apiKey', this.apiKey)
        .set('country', this.country)
        .set('pageSize', String(this.pageSize))
        .set('page', String(page));
      }),
      switchMap((params)=>{
        return this.http.get<NewsApiResponse>(this.url, {params})
      }),
      tap(response=>{
        const totalPages = Math.ceil(response.totalResult / this.pageSize);
        // 55 / 10 = 5.5 -> 6 pages
        this.numberOfPages.next(totalPages);
      }),
      pluck('articles')
    );
  }

  getPage(page:number){
    this.pagesInput.next(page)
  }
}
