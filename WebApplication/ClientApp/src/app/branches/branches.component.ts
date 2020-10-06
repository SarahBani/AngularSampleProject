import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBank } from '../models/IBank.model';
import { BankService } from '../services/bank-service';
import { BranchService } from '../services/branch-service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  private banks: IBank[] = [];
  private selectedBankId: number;
  private selectedBankName: string = 'Select Bank';
  private url: string = '/branches';

  constructor(private bankService: BankService,
    private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router) {
    console.log(123);
    this.resetUrl();
    this.fillBanks();
    this.setSelectedBank();
  }

  public ngOnInit(): void {
    if (this.selectedBankId != null) {
      this.branchService.changeBank(this.selectedBankId);
    }
  }

  private fillBanks(): void {
    this.bankService.getList().subscribe((banks) => {
      this.banks = banks;
    });
  }

  private setSelectedBank(): void {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state != null && state.bank != null) {
      this.selectedBankId = state.bank.id;
      this.selectedBankName = state.bank.name;
    }
  }

  private onSelectBank(bank: IBank): void {
    this.resetUrl();
    this.selectedBankId = bank.id;
    this.selectedBankName = bank.name;
    this.branchService.changeBank(bank.id);
  }

  private resetUrl(): void {
    if (this.router.url != this.url) {
      this.router.navigate(['/branches']);
    }
  }

}
