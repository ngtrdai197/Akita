import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '@/shared/interfaces';
import { BooksQuery } from './state/books.query';
import { Order } from '@datorama/akita';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books$: Observable<IBook[]>;
  book$: Observable<IBook>;
  private selectLoading$: Observable<boolean>;
  constructor(private readonly booksQuery: BooksQuery) {}

  ngOnInit() {
    this.books$ = this.booksQuery.selectAll({
      sortBy: 'name',
      sortByOrder: Order.ASC,
    });
    this.selectLoading$ = this.booksQuery.selectLoading();
  }

  getBook(name: string) {
    this.books$ = this.booksQuery.getBookByName(name);
  }
}
