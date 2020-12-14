import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseLoading } from '../base/base-loading';
import { IBank } from '../models/IBank.model';
import { BankService } from '../services/bank-service';
import { BranchService } from '../services/branch-service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent extends BaseLoading implements OnInit {

  private banks: IBank[] = [];
  private selectedBank: IBank;
  private url: string = '/branches';

  constructor(private bankService: BankService,
    private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
    this.resetUrl();
    this.fillBanks();
    this.setSelectedBank();
  }

  public ngOnInit(): void {
    if (this.selectedBank?.id != null) {
      this.branchService.changeBank(this.selectedBank.id);
    }
  }

  private fillBanks(): void {
    super.showLoader();
    this.bankService.getList().subscribe((banks: IBank[]) => {
      const emptyBank: IBank = { id: 0, name: 'Select Bank' };
      this.banks = super.getEmptyItemAdded(banks, emptyBank);
      super.hideLoader();
    }, error => super.showError(error));
  }

  private setSelectedBank(): void {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state != null && state.bank != null) {
      this.selectedBank = state.bank;
    }
  }

  private onSelectBank(bank: IBank): void {
    this.resetUrl();
    this.selectedBank = bank;
    this.branchService.changeBank(bank.id);
  }

  private resetUrl(): void {
    if (this.router.url != this.url) {
      this.router.navigate(['/branches']);
    }
  }

}
