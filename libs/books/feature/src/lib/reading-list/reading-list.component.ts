import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, finishBook } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {
  readingList$: ReadingListItem[];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.select(getReadingList).subscribe(items => {
      this.readingList$ = items;
    });
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  finishBook(item) {
    this.store.dispatch(finishBook({ item }));
    //this.getList();
  }
}
