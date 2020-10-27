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

  @ViewChild('f') myForm: NgForm;
  // private myFormGroup: FormGroup;
  private commentsFormGroup: FormGroup;
  private model: IBook;
  private id: string;
  private operationCompletedSubscription: Subscription;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) {
    super(bookService);
  }

  public ngOnInit(): void {
    this.subscribe();
    this.initForm();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.bookService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.changesSaved = true;
          this.myForm.reset();
          this.redirectBack();
        }
        else {
          super.hideLoader();
        }
      })
  }

  private initForm() {
    let comments = new FormArray([]);
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
        this.myForm.setValue({
          'name': book.name,
          'author': book.author,
          'translator': book.translator,
          'genre': book.genre,
          'summary': book.summary
        });

        if (book.comments != null) {
          book.comments.forEach(function (comment: IBookComment) {
            comments.push(this.getCommentFormControl(comment.writer, comment.comment, comment.createdDateTime));
          }.bind(this));
        }

        //this.myFormGroup = new FormGroup({
        //  'name': new FormControl(name, [Validators.required]),
        //  'description': new FormControl(description),
        //  'comments': comments,
        //});

        this.uploadedImageUrl = book.coverImageUrl;
      }, error => super.showError(error));
    }

    this.commentsFormGroup = new FormGroup({
      'comments': comments,
    });
  }

  protected getUploadFile(file: File): Observable<any> {
    return this.bookService.uploadCoverImage(file);
  }

  getCommentsControls(): AbstractControl[] {
    return (this.commentsFormGroup.get('comments') as FormArray).controls;
  }

  newComment(): void {
    const comments: FormArray = (this.commentsFormGroup.get('comments') as FormArray);
    comments.push(this.getCommentFormControl());
  }

  getCommentFormControl(writer: string = '', comment: string = '', createdDateTime: Date = null) {
    return new FormGroup({
      'writer': new FormControl(writer, [Validators.required, Validators.maxLength(100)]),
      'comment': new FormControl(comment, [Validators.required]),
      'createdDateTime': new FormControl(createdDateTime),
    });
  }

  deleteComment(index: number): void {
    let comments: FormArray = (this.commentsFormGroup.get('comments') as FormArray);
    comments.removeAt(index);
  }

  private onSave(form: NgForm) {
    super.showLoader();
    const book: IBook = {
      id: this.id,
      name: form.value.name,
      author: form.value.author,
      translator: form.value.translator,
      genre: form.value.genre,
      coverImageUrl: this.uploadedImageUrl,
      summary: form.value.summary,
      comments: this.getComments()
    };
    this.bookService.save(book);
  }

  private getComments(): IBookComment[] {
    const commentsArray: FormArray = (this.commentsFormGroup.get('comments') as FormArray);
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
