import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBranch } from '../models/Ibranch.model';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BranchService {

  private headers: HttpHeaders;

  selectedBankChanged = new Subject<number>();
  selectedChanged = new Subject<IBranch>();
  saveCompleted = new EventEmitter();
  public count: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  changeBank(bankId: number): void {
    this.selectedBankChanged.next(bankId);
  }

  select(branch: IBranch): void {
    this.selectedChanged.next(branch);
  }

  getItem(id: number): Observable<IBranch> {
    return this.http.get<IBranch>(this.baseUrl + 'branch/ItemAsync/' + id, { headers: this.headers })
  }

  getListByBankId(bankId: number): Observable<IBranch[]> {
    return this.http.get<IBranch[]>(this.baseUrl + 'branch/ListAsync/' + bankId, { headers: this.headers })
  }

  getCountByBankId(bankId: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'branch/CountAsync/' + bankId, { headers: this.headers })
  }

  insert(branch: IBranch): void {
    this.http.post(this.baseUrl + 'branch/InsertAsync', branch, { headers: this.headers })
      .subscribe(result => {
        alert(result);
      }, error => console.error(error));
  }

  update(id: number, branch: IBranch): void {
    this.http.put(this.baseUrl + 'branch/UpdateAsync/' + id, branch, { headers: this.headers })
      .subscribe(result => {
        alert(result);
      }, error => console.error(error));
  }

  delete(id: number): void {
    this.http.put(this.baseUrl + 'branch/DeleteAsync/' + id, { headers: this.headers })
      .subscribe(result => {
        alert(result);
      }, error => console.error(error));
  }

  deleteByBankIdAsync(bankId: number): void {
    this.http.put(this.baseUrl + 'branch/DeleteByBankIdAsync/' + bankId, { headers: this.headers })
      .subscribe(result => {
        alert(result);
      }, error => console.error(error));
  }

}
