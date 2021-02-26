import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getAllBooks, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,
              private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));

    const snackBarRef = this.snackBar.open('Removed from reading list.', 'Undo', {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(() => {
      this.store.select(getAllBooks).subscribe(books => {
        const book = books.find(b => b.id === item.bookId);
        if (book)
          this.store.dispatch(addToReadingList({ book }));
      });
    });
  }
}
