import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook, IBookComment } from '../models/Ibook.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseRestService } from './base-rest-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';

@Injectable({ providedIn: 'root' })
export class BookService extends BaseRestService implements ILoaderService {

  protected controllerName: string = 'Book';
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService,
    httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(modalService, exceptionHandlerService, httpClient, baseUrl);
  }

  public getItem(id: string): Observable<IBook> {
    return super.httpGetItem<IBook>(id);
  }

  public getList(): Observable<IBook[]> {
    return super.httpGetAll<IBook>();
  }

  public getCount(): Observable<number> {
    return super.httpGetCount();
  }

  public save(book: IBook): void {
    if (book.id != null) {
      this.update(book.id, book);
    }
    else {
      this.insert(book);
    }
  }

  private insert(book: IBook): void {
    super.httpPost<IBook>('InsertAsync', book)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  private update(id: string, book: IBook): void {
    super.httpPut('UpdateAsync/' + id, book)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public insertComment(id: string, bookComment: IBookComment): void {
    super.httpPut<IBookComment>('InsertCommentAsync/' + id, bookComment)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public delete(id: string): void {
    if (id != null) {
      this.confirmDeleteSubscription = super.confirmDelete().subscribe((result: boolean) => {
        if (result) {
          this.changeLoaderStatus.next(true);
          this.doDelete(id);
        }
        else {
          this.operationCompleted.next(false);
        }
        this.confirmDeleteSubscription.unsubscribe();
      });
    }
  }

  private doDelete(id: string): void {
    super.httpDelete('DeleteAsync/' + id)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  } 

  public uploadCoverImage(file: File): Observable<any> {
    return super.postFile('UploadCoverImage/', file);
  }

}
