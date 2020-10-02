import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBranch } from '../../models/Ibranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css']
})
export class BranchDetailComponent implements OnInit {

  model: IBranch;
  id: number;
  private changeBankSubscription: Subscription;

  constructor(private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
    //this.changeBankSubscription = this.branchService.selectedBankChanged.subscribe(() => {     
    //  this.router.navigate(['../'], { relativeTo: this.route });
    //});
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.fillBranch();
    });
  }

  fillBranch(): void {
      this.branchService.getItem(this.id).subscribe((branch) => {
        this.model = branch;
      }, error => console.error(error));
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    this.branchService.delete(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    //this.changeBankSubscription.unsubscribe();
  }

}
