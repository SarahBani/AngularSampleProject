import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../models/Ibook.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseService } from './base-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';

@Injectable({ providedIn: 'root' })
export class BookService extends BaseService implements ILoaderService{

  protected controllerName: string = 'Book';
  public selectedChanged: Subject<IBook> = new Subject<IBook>();
  public operationCompleted: Subject<boolean> = new Subject<boolean>();
  private confirmDeleteSubscription: Subscription;
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, baseUrl, modalService, exceptionHandlerService);
  }

  public select(book: IBook): void {
    this.selectedChanged.next(book);
  }

  public getItem(id: number): Observable<IBook> {
    return super.httpGetItem<IBook>(id);
  }

  public getList(): Observable<IBook[]> {
    return super.httpGetAll<IBook>();
  }

  public getCount(): Observable<number> {
    return super.httpGetCount();
  }

  public save(book: IBook): void {
    if (book.id > 0) {
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

  private update(id: number, book: IBook): void {
    super.httpPut('UpdateAsync/' + id, book)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public delete(id: number): void {
    if (id > 0) {
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

  private doDelete(id: number): void {
    super.httpDelete('DeleteAsync/' + id)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  protected onSuccess(result): void {
    if (result.isSuccessful) {
      this.operationCompleted.next(true);
    }
    else {
      this.operationCompleted.next(false);
      this.modalService.showError(result.customExceptionMessage);
    }
  }

  protected onError(error): void {
    super.showError(error);
    this.operationCompleted.next(false);
  }

  public uploadCoverImage(file: File): Observable<any> {
    return super.postFile('UploadCoverImage/', file);
  }

}
