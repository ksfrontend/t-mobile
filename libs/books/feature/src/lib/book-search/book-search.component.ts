import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks, getReadingList,
  ReadingListBook, removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  readingList: ReadingListItem[];

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    this.store.select(getReadingList).subscribe(list => {
      this.readingList = list;
    })
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    const snackBarRef = this.snackBar.open('Added to reading list.', 'Undo', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      const item = this.readingList.find(m => m.bookId === book.id);
      this.store.dispatch(removeFromReadingList({ item }));
    });
  }

  removeBookToReadingList(book: Book) {
    const item = this.readingList.find(m => m.bookId === book.id);
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this.snackBar.open('Removed from reading list.', 'Undo', {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book }));
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
