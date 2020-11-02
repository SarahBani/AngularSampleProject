import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ImageUploaderComponent } from '../../base/image-uploader.component';
import { IBook, IBookComment } from '../../models/IBook.model';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent extends ImageUploaderComponent
  implements OnInit, OnDestroy {

  private myFormGroup: FormGroup;
  private model: IBook;
  private id: string;
  private operationCompletedSubscription: Subscription;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) {
    super(bookService);
  }

  public ngOnInit(): void {
    this.initForm();
    this.subscribe();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.bookService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.changesSaved = true;
          this.myFormGroup.reset();
          this.redirectBack();
        }
        else {
          super.hideLoader();
        }
      })
  }

  private initForm() {
    if (this.route.snapshot.params["id"] != null) {
      this.id = this.route.snapshot.params["id"];
      super.showLoader();
      this.bookService.getItem(this.id).subscribe((book: IBook) => {
        super.hideLoader();
        if (book == null) {
          this.changesSaved = true;
          this.redirectBack(2);
          return;
        }
        this.myFormGroup = this.getFormGroup(book);
        this.uploadedImageUrl = book.coverImageUrl;
      }, error => super.showError(error));
    }
    else {
      this.myFormGroup = this.getFormGroup();
    }
  }

  private getFormGroup(book: IBook = null): FormGroup {
    return new FormGroup({
      'name': new FormControl(book?.name ?? ''),
      'author': new FormControl(book?.author ?? ''),
      'translator': new FormControl(book?.translator ?? ''),
      'genre': new FormControl(book?.genre ?? ''),
      'summary': new FormControl(book?.summary ?? ''),
      'comments': this.getCommentsFormArray(book)
    });
  }

  private getCommentsFormArray(book: IBook): FormArray {
    let formArray: FormArray = new FormArray([]);
    if (book?.comments != null) {
      book.comments.forEach(function (comment: IBookComment) {
        formArray.push(this.getCommentFormGroup(comment));
      }.bind(this));
    }
    return formArray;
  }

  private getCommentFormGroup(bookComment: IBookComment = null) {
    return new FormGroup({
      'writer': new FormControl(bookComment?.writer, [Validators.required, Validators.maxLength(100)]),
      'comment': new FormControl(bookComment?.comment , [Validators.required]),
      'createdDateTime': new FormControl(bookComment?.createdDateTime),
    });
  }

  protected getUploadFile(file: File): Observable<any> {
    return this.bookService.uploadCoverImage(file);
  }

  private getCommentsControls(): AbstractControl[] {
    return (this.myFormGroup.get('comments') as FormArray).controls;
  }

  private newComment(): void {
    const comments: FormArray = (this.myFormGroup.get('comments') as FormArray);
    comments.push(this.getCommentFormGroup());
  }

  private deleteComment(index: number): void {
    let comments: FormArray = (this.myFormGroup.get('comments') as FormArray);
    comments.removeAt(index);
  }

  private onSave() {
    super.showLoader();
    const formValues: IBook = this.myFormGroup.value;
    const book: IBook = {
      id: this.id,
      name: formValues.name,
      author: formValues.author,
      translator: formValues.translator,
      genre: formValues.genre,
      coverImageUrl: this.uploadedImageUrl,
      summary: formValues.summary,
      comments: this.getComments()
    };
    this.bookService.save(book);
  }

  private getComments(): IBookComment[] {
    const commentsArray: FormArray = (this.myFormGroup.get('comments') as FormArray);
    let comments = commentsArray.value;
    comments.forEach(function (comment: IBookComment) {
      if (comment.createdDateTime == null) {
        comment.createdDateTime = new Date('0001-01-01T00:00:00Z');
      }
    });
    return comments;
  }

  private onDelete() {
    this.bookService.delete(this.id);
  }

  private onCancel(): void {
    this.changesSaved = true;
    this.redirectBack();
  }

  private redirectBack(backLevelCount: number = 1): void {
    const url: string = '../'.repeat(backLevelCount);
    this.router.navigate([url], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
