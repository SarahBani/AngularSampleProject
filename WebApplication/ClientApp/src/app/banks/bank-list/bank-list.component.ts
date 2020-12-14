import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent extends BaseLoading implements OnInit, OnDestroy {

  private banks: IBank[] = [];
  private operationCompletedSubscription: Subscription;

  constructor(private bankService: BankService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillList();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.bankService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.fillList();
        }
      });
  }

  private fillList(): void {
    super.showLoader();
    this.bankService.getList().subscribe((banks) => {
      this.banks = banks;
      super.hideLoader();
    }, error => super.showError(error));
  }

  private onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  private onRefresh(): void {
    this.fillList();
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
