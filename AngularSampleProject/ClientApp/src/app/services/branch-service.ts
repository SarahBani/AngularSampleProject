import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBranch } from '../models/Ibranch.model';

@Injectable({ providedIn: 'root' })
export class BranchService {

  saveCompleted = new EventEmitter();
  private headers: HttpHeaders;
  private baseUrl: string;
  public currentBranch: IBranch;
  public branchs: IBranch[];
  public count: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  getItem(id: number) {
    this.http.get<IBranch>(this.baseUrl + 'branch/ItemAsync/' + id, { headers: this.headers })
      .subscribe(result => {
        this.currentBranch = result;
      }, error => console.error(error));
  }

  getListByBankId(bankId: number) {
    this.http.get<IBranch[]>(this.baseUrl + 'branch/ListByBankIdAsync/' + bankId, { headers: this.headers })
      .subscribe(result => {
        this.branchs = result;
      }, error => console.error(error));
  }

  getCountByBankId(bankId: number) {
    this.http.get<number>(this.baseUrl + 'branch/CountByBankIdAsync/' + bankId, { headers: this.headers })
      .subscribe(result => {
        this.count = result;
      }, error => console.error(error));
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
