import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseForm } from '../../base/base-form';
import { IBranch } from '../../models/Ibranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent extends BaseForm implements OnInit, OnDestroy {

  @ViewChild('f') private myForm: NgForm;
  private id: number;
  private bankId: number;
  private operationCompletedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
    super(branchService);
    this.setBankId();
  }

  public ngOnInit(): void {
    this.subscribe();
    this.initForm();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.branchService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.changesSaved = true;
          this.myForm.reset();
          this.redirectBack();
        }
        else {
          super.hideLoader();
        }
      });
  }

  private setBankId(): void {
    if (this.router.getCurrentNavigation() != null &&
      this.router.getCurrentNavigation().extras.state != null) {
      this.bankId = this.router.getCurrentNavigation().extras.state.bankId;
    }
    if (this.bankId == null) {
      this.changesSaved = true;
      if (this.route.snapshot.params["id"] == null) {
        this.redirectBack();
      }
      else {
        this.redirectBack(2);
      }
    }
  }

  private initForm() {
    if (this.route.snapshot.params["id"] != null) {
      this.id = +this.route.snapshot.params["id"];
      super.showLoader();
      this.branchService.getItem(this.id).subscribe((branch: IBranch) => {
        super.hideLoader();
        if (branch == null) {
          this.changesSaved = true;
          this.redirectBack(2);
          return;
        }
        this.bankId = branch.bankId;
        this.myForm.form.setValue({
          'name': branch.name,
          'code': branch.code,
          'address': branch.address,
        });
      }, error => super.showError(error));
    }
  }

  private onSave() {
    super.showLoader();
    const branch: IBranch = {
      id: this.id,
      bankId: this.bankId,
      name: this.myForm.value.name,
      code: this.myForm.value.code,
      address: this.myForm.value.address
    };
    this.branchService.save(branch);
  }

  private onDelete() {
    this.branchService.delete(this.id);
  }

  private onCancel(): void {
    this.changesSaved = true;
    this.redirectBack();
  }

  private redirectBack(backLevelCount: number = 1): void {
    const url: string = '../'.repeat(backLevelCount);
    this.router.navigate([url], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    if (this.operationCompletedSubscription != null) {
      this.operationCompletedSubscription.unsubscribe();
    }
  }

}
