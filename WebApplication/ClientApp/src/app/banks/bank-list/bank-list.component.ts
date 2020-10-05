import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit, OnDestroy {

  public banks: IBank[] = [];
  private dataChangedSubscription: Subscription;

  constructor(private bankService: BankService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.fillList();
    this.dataChangedSubscription = this.bankService.dataChanged.subscribe(() => {
      this.fillList();
    });
  }

  private fillList(): void {
    this.bankService.getList().subscribe((banks) => {
      this.banks = banks;
    });
  }

  public onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public onRefresh(): void {
    this.fillList();
  }

  public ngOnDestroy(): void {
    this.dataChangedSubscription.unsubscribe();
  }

}
