import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBranch } from '../../models/Ibranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css']
})
export class BranchDetailComponent implements OnInit, OnDestroy {

  private model: IBranch;
  private dataChangedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public ngOnInit(): void {
    this.fillData();
    this.dataChangedSubscription = this.branchService.dataChanged.subscribe(() => {
      this.redirectBack();
    });
  }

  private fillData(): void {
    this.route.params.subscribe((params: Params) => {
      const id: number = +params['id'];
      this.branchService.getItem(id).subscribe((branch) => {
        if (branch == null) {
          this.router.navigate(['../'], { relativeTo: this.route });
          return;
        }
        this.model = branch;
      }, error => console.error(error));
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

  redirectBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    if (this.dataChangedSubscription != null) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

}
