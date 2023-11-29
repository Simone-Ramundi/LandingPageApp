import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  
  // todo: make sure we receive this value from the parent component
  numberOfPages = 5;
  currentPage = 1;

  pageOptions: number[];

  constructor() {
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2
    ].filter(pageNumber => pageNumber >= 1 && pageNumber <= this.numberOfPages);
   }

  ngOnInit() {
  }

}