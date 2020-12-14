import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IBranch } from '../../models/Ibranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css']
})
export class BranchDetailComponent extends BaseLoading implements OnInit, OnDestroy {

  private model: IBranch;
  private operationCompletedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
    super(branchService);
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillData();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.branchService.operationCompleted
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
      this.branchService.getItem(id).subscribe((branch: IBranch) => {
        super.hideLoader();
        if (branch == null) {
          this.redirectBack();
          return;
        }
        this.model = branch;
      }, error => super.showError(error));
    });
  }

  private onBack(): void {
    this.redirectBack();
  }

  private onDelete(): void {
    this.branchService.delete(this.model.id);
  }

  private onEdit(): void {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      state: { bankId: this.model.bankId }
    });
  }

  private redirectBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    if (this.operationCompletedSubscription != null) {
      this.operationCompletedSubscription.unsubscribe();
    }
  }

}
