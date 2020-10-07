import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBank } from '../models/Ibank.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseService } from './base-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';

@Injectable({ providedIn: 'root' })
export class BankService extends BaseService implements ILoaderService{

  protected controllerName: string = 'Bank';
  public selectedChanged: Subject<IBank> = new Subject<IBank>();
  public operationCompleted: Subject<boolean> = new Subject<boolean>();
  private confirmDeleteSubscription: Subscription;
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();
  //public saveCompleted = new EventEmitter();

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, baseUrl, modalService, exceptionHandlerService);
  }

  public select(bank: IBank): void {
    this.selectedChanged.next(bank);
  }

  public getItem(id: number): Observable<IBank> {
    return super.httpGetItem<IBank>(id);
  }

  public getList(): Observable<IBank[]> {
    return super.httpGetAll<IBank>();
  }

  public getCount(): Observable<number> {
    return super.httpGetCount();
  }

  public save(bank: IBank): void {
    if (bank.id > 0) {
      this.update(bank.id, bank);
    }
    else {
      this.insert(bank);
    }
  }

  private insert(bank: IBank): void {
    super.httpPost<IBank>('InsertAsync', bank)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  private update(id: number, bank: IBank): void {
    super.httpPut('UpdateAsync/' + id, bank)
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

  public uploadLogo(file: File): Observable<any> {
    return super.postFile('UploadLogo/', file);
  }

}
