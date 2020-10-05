import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBranch } from '../../models/IBranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {

  public branches: IBranch[];
  private bankId: number;
  private changeBankSubscription: Subscription;
  private dataChangedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataChangedSubscription = this.branchService.dataChanged.subscribe(() => {
      this.fillBranches();
    });
    this.changeBankSubscription = this.branchService.selectedBankChanged.subscribe(
      (bankId: number) => {
        this.bankId = bankId;
        this.fillBranches();
      }, error => console.error(error));
  }

  fillBranches(): void {
    this.branchService.getListByBankId(this.bankId).subscribe((branches) => {
      this.branches = branches;
    }, error => console.error(error));
  }

  onClick(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.changeBankSubscription.unsubscribe();
    this.dataChangedSubscription.unsubscribe();
  }

}
