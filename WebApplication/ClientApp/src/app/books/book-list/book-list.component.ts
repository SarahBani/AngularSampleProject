import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IBook } from '../../models/IBook.model';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent extends BaseLoading implements OnInit, OnDestroy {

  private books: IBook[] = [];
  private operationCompletedSubscription: Subscription;

  constructor(private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillList();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.bookService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.fillList();
        }
      });
  }

  private fillList(): void {
    super.showLoader();
    this.bookService.getList().subscribe((books) => {
      this.books = books;
      super.hideLoader();
    }, error => super.showError(error));
  }

  private onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  private onRefresh(): void {
    this.fillList();
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
