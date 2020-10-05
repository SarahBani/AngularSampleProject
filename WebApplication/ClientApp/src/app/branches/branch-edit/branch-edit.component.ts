import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { IBranch } from '../../models/Ibranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private model: IBranch;
  private id: number;
  private bankId: number;
  private changesSaved: boolean = false;
  private dataChangedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
    this.setBankId();
    this.checkBankId();
  }

  public ngOnInit(): void {
    this.initForm();
    this.dataChangedSubscription = this.branchService.dataChanged.subscribe(() => {
      this.changesSaved = true;
      this.myForm.reset();
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  private setBankId(): void {
    if (this.router.getCurrentNavigation() != null &&
      this.router.getCurrentNavigation().extras.state != null) {
      this.bankId = this.router.getCurrentNavigation().extras.state.bankId;
    }
  }

  private initForm() {
    if (this.route.snapshot.params["id"] != null) {
      this.id = +this.route.snapshot.params["id"];
      this.branchService.getItem(this.id).subscribe((branch) => {
        if (branch == null) {
          this.changesSaved = true;
          this.router.navigate(['../../'], { relativeTo: this.route });
          return;
        }
        this.bankId = branch.bankId;
        this.myForm.form.patchValue({
          'name': branch.name,
          'code': branch.code,
          'address': branch.address,
        });
      }, error => console.error(error));
    }
  }

  private checkBankId(): void {
    if (this.bankId == null) {
      this.changesSaved = true;
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    }
    return this.changesSaved;
  }

  public ngOnDestroy(): void {
    if (this.dataChangedSubscription != null) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

}
