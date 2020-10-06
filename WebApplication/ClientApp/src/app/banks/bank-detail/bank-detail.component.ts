import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit, OnDestroy {

  private model: IBank;
  private dataChangedSubscription: Subscription;

  constructor(private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public ngOnInit(): void {
    this.fillData();
    this.dataChangedSubscription = this.bankService.dataChanged.subscribe(() => {
      this.redirectBack();
    });
  }

  private fillData(): void {
    this.route.params.subscribe((params: Params) => {
      const id: number = +params['id'];
      this.bankService.getItem(id).subscribe((bank) => {
        if (bank == null) {
          this.redirectBack();
          return;
        }
        this.model = bank;
      }, error => console.error(error));
    });
  }

  private onBack(): void {
    this.redirectBack();
  }

  private onDelete(): void {
    this.bankService.delete(this.model.id);
  }

  private onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  private onBranches(): void {
    this.router.navigate(['/branches'],
      {
        state: { bank: this.model }
      });
  }

  private redirectBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.dataChangedSubscription.unsubscribe();
  }

}
