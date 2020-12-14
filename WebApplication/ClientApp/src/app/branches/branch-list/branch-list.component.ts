import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IBranch } from '../../models/IBranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent extends BaseLoading implements OnInit, OnDestroy {

  private branches: IBranch[];
  private bankId: number;
  private changeBankSubscription: Subscription;
  private operationCompletedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.subscribe();
  }

  private subscribe(): void {
    this.changeBankSubscription = this.branchService.selectedBankChanged.subscribe(
      (bankId: number) => {
        this.bankId = bankId;
        this.fillList();
      });
    this.operationCompletedSubscription = this.branchService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.fillList();
        }
      });
  }

  private fillList(): void {
    super.showLoader();
    this.branchService.getListByBankId(this.bankId).subscribe((branches) => {
      this.branches = branches;
      super.hideLoader();
    }, error => super.showError(error));
  }

  private onAdd(): void {
    this.router.navigate(['new'], {
      relativeTo: this.route,
      state: { bankId: this.bankId }
    });
  }

  private onRefresh(): void {
    this.fillList();
  }

  public ngOnDestroy(): void {
    if (this.changeBankSubscription != null) {
      this.changeBankSubscription.unsubscribe();
    }
    if (this.operationCompletedSubscription != null) {
      this.operationCompletedSubscription.unsubscribe();
    }
  }

}
