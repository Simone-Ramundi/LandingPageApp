import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '8b18fbdc167e4d529fd1f790f999763b';
  private country = 'it';

  constructor() { }
}