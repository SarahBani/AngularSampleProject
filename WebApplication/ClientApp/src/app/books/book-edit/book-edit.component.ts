import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ImageUploaderComponent } from '../../base/image-uploader.component';
import { IBook } from '../../models/IBook.model';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent extends ImageUploaderComponent
  implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
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
        this.uploadedImageUrl = book.coverImageUrl;
      }, error => super.showError(error));
    }
  }

  protected getUploadFile(file: File): Observable<any> {
    return this.bookService.uploadCoverImage(file);
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
      summary: form.value.summary
    };
    this.bookService.save(book);
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
