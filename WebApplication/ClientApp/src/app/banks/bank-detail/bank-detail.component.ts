import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent extends BaseLoading implements OnInit, OnDestroy {

  private model: IBank;
  private operationCompletedSubscription: Subscription;

  constructor(private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router) {
    super(bankService);
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillData();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.bankService.operationCompleted
      .subscribe((hasSucceed: boolean) => { // When delete button pressed
        super.hideLoader();
        if (hasSucceed) {
          this.redirectBack();
        }
      });
  }

  private fillData(): void {
    super.showLoader();
    this.route.params.subscribe((params: Params) => {
      const id: number = +params['id'];
      this.bankService.getItem(id).subscribe((bank: IBank) => {
        super.hideLoader();
        if (bank == null) {
          this.redirectBack();
          return;
        }
        this.model = bank;
      }, error => super.showError(error));
    });
  }

  private onBack(): void {
    this.redirectBack();
  }
  private onDelete(): void {
    this.bankService.delete(this.model.id);
  }

  private onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  private onBranches(): void {
    this.router.navigate(['/branches'],
      {
        state: { bank: this.model }
      });
  }

  private redirectBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
