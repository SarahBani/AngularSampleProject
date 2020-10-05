import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBank } from '../models/Ibank.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseService } from './base-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';

@Injectable({ providedIn: 'root' })
export class BankService extends BaseService implements OnDestroy {

  protected controllerName: string = 'Bank';
  public selectedChanged = new Subject<IBank>();
  public dataChanged = new Subject<void>();
  private confirmDeleteSubscription: Subscription;
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
    super.httpPost<IBank>('InsertAsync', bank, this.dataChanged);
  }

  private update(id: number, bank: IBank): void {
    super.httpPut('UpdateAsync/' + id, bank, this.dataChanged);
  }

  public delete(id: number): void {
    if (id > 0) {
      this.confirmDeleteSubscription = super.confirmDelete().subscribe((result: boolean) => {
        if (result) {
          super.httpDelete('DeleteAsync/' + id, this.dataChanged);
        }
        this.confirmDeleteSubscription.unsubscribe();
      });
    }
  }

  public uploadLogo(file: File): Observable<any> {
    return super.postFile('UploadLogo/', file);
  }

  public ngOnDestroy(): void {
  }

}