import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseModal } from '../../base/base-modal';
import { IBookComment } from '../../models/IBook.model';
import { BookService } from '../../services/book-service';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent extends BaseModal
  implements OnInit, OnDestroy {

  private id: string;
  private operationCompletedSubscription: Subscription;

  public constructor(modalService: ModalService,
    private bookService: BookService,
    private route: ActivatedRoute) {
    super(modalService, bookService);
  }

  public ngOnInit(): void {
    this.id = this.route.parent.snapshot.params["id"];
    this.subscribe();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.bookService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          super.passResult(true);
        }
        super.hideLoader();
      })
  }

  private onSave(form: NgForm): void {
    super.showLoader();
    const bookComment: IBookComment = {
      writer: form.value.writer,
      comment: form.value.comment,
      createdDateTime: new Date('0001-01-01T00:00:00Z')
    };
    this.bookService.insertComment(this.id, bookComment);
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
