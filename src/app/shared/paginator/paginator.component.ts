import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  // Making sure we receive this value from the parent component
  // DECLARATION:
  @Input() numberOfPages: number;
  pageOptions: number[];

  // INITIALIZATION:
  currentPage = 1;

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