import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IBook } from '../../models/IBook.model';
import { BookService } from '../../services/book-service';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent extends BaseLoading implements OnInit, OnDestroy {

  private model: IBook;
  private shortSummary: string;
  private isFullSummaryDisplayed: boolean = false;
  private operationCompletedSubscription: Subscription;
  //public modalClosed: Subject<void> = new Subject<void>();

  // @ViewChild('newComment') newComment;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService) {
    super(bookService);
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillData();
    if (window.location.href.endsWith('new-comment')) {
      this.onNewComment();
    }
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
      const id: string = params['id'];
      this.bookService.getItem(id).subscribe((book: IBook) => {
        super.hideLoader();
        if (book == null) {
          this.redirectBack();
          return;
        }
        this.model = book;
        this.setShortSummary();
      }, error => super.showError(error));
    });
  }

  private setShortSummary() {
    const summary = this.model.summary;
    if (summary != null && summary.length > 100) {
      this.shortSummary = summary.substring(0, 100) + ' ...';
    }
    else {
      this.shortSummary = summary;
    }
  }

  private onSummaryClick() {
    this.isFullSummaryDisplayed = !this.isFullSummaryDisplayed;
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

  private onNewComment(): void {
    // this.newComment.createComponent(CommentNewComponent);
    this.router.navigate(['new-comment'], { relativeTo: this.route });
    var modalContainerResult = this.modalService.showModalContainer('New Comment');
    modalContainerResult.subscribe((result: any) => {
      if (result != null) {
        this.refreshComments();
      }
      this.router.navigate(['./'], { relativeTo: this.route });
    });
  }

  private refreshComments(): void {
    super.showLoader();
    this.route.params.subscribe((params: Params) => {
      const id: string = params['id'];
      this.bookService.getItem(id).subscribe((book: IBook) => {
        super.hideLoader();
        if (book == null) {
          this.redirectBack();
          return;
        }
        this.model.comments = book.comments;
      }, error => super.showError(error));
    });
  }

  private redirectBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
