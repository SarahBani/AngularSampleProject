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

  branches: IBranch[];
  private changeBankSubscription: Subscription;
  private updateSubscription: Subscription;

  constructor(private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute) {
    this.changeBankSubscription = this.branchService.selectedBankChanged.subscribe(
      (bankId: number) => {
        this.fillBranches(bankId);
      }, error => console.error(error));
  }

  ngOnInit(): void {
  }

  fillBranches(bankId: number): void {
    this.branchService.getListByBankId(bankId).subscribe((branches) => {
      this.branches = branches;
    }, error => console.error(error));
  }

  onClick(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.changeBankSubscription.unsubscribe();
  }

}
