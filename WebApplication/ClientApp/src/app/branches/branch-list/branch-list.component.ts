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

  private branches: IBranch[];
  private bankId: number;
  private changeBankSubscription: Subscription;
  private dataChangedSubscription: Subscription;

  constructor(private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.dataChangedSubscription = this.branchService.dataChanged.subscribe(() => {
      this.fillList();
    });
    this.changeBankSubscription = this.branchService.selectedBankChanged.subscribe(
      (bankId: number) => {
        this.bankId = bankId;
        this.fillList();
      }, error => console.error(error));
  }

  private fillList(): void {
    this.branchService.getListByBankId(this.bankId).subscribe((branches) => {
      this.branches = branches;
    }, error => console.error(error));
  }

  private onAdd(): void {
    this.router.navigate(['new'], {
      relativeTo: this.route,
      state: { bankId: this.bankId }
    });
  }

  private onRefresh(): void {
    this.fillList();
  }

  public ngOnDestroy(): void {
    if (this.changeBankSubscription != null) {
      this.changeBankSubscription.unsubscribe();
    }
    if (this.dataChangedSubscription != null) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

}
