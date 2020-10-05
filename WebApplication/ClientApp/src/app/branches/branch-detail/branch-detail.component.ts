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

  public model: IBranch;
  private dataChangedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.fillData();
    this.dataChangedSubscription = this.branchService.dataChanged.subscribe(() => {
      this.redirectBack();
    });
  }

  fillData(): void {
    this.route.params.subscribe((params: Params) => {
      const id: number = +params['id'];
      this.branchService.getItem(id).subscribe((branch) => {
        this.model = branch;
      }, error => console.error(error));
    });
  }

  onBack(): void {
    this.redirectBack();
  }

  onDelete(): void {
    this.branchService.delete(this.model.id);
  }

  onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  redirectBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.dataChangedSubscription.unsubscribe();
  }

}
