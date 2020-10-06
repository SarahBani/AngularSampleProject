import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from '../../base-form.component';
import { IBranch } from '../../models/Ibranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent extends BaseFormComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private model: IBranch;
  private id: number;
  private bankId: number;
  private dataChangedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
    this.setBankId();
  }

  public ngOnInit(): void {
    this.initForm();
    this.dataChangedSubscription = this.branchService.dataChanged.subscribe(() => {
      this.changesSaved = true;
      this.myForm.reset();
      this.redirectBack();
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
      this.branchService.getItem(this.id).subscribe((branch) => {
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
      }, error => console.error(error));
    }
  }

  private onSave(form: NgForm) {
    const branch: IBranch = {
      id: this.id,
      bankId: this.bankId,
      name: form.value.name,
      code: form.value.code,
      address: form.value.address
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
    if (this.dataChangedSubscription != null) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

}
