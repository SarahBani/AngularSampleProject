import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoadingComponent } from '../../base/base-loading.component';
import { IBook } from '../../models/IBook.model';
import { BookService } from '../../services/book-service';
import { ILoaderService } from '../../services/ILoader-service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent extends BaseLoadingComponent implements OnInit, OnDestroy {

  private model: IBook;
  private operationCompletedSubscription: Subscription;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) {
    super(bookService);
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillData();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.bookService.operationCompleted
      .subscribe((hasSucceed: boolean) => { // When delete button pressed
        super.hideLoader();
        if (hasSucceed) {
          this.redirectBack();
        }
      });
  }

  private fillData(): void {
    super.showLoader();
    this.route.params.subscribe((params: Params) => {
      const id: number = +params['id'];
      this.bookService.getItem(id).subscribe((book: IBook) => {
        super.hideLoader();
        if (book == null) {
          this.redirectBack();
          return;
        }
        this.model = book;
      }, error => super.showError(error));
    });
  }

  private onBack(): void {
    this.redirectBack();
  }
  private onDelete(): void {
    this.bookService.delete(this.model.id);
  }

  private onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  private redirectBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
