import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {

  public model: IBank;
  private dataChanged: Subscription;

  constructor(private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.fillData();
    this.dataChanged = this.bankService.dataChanged.subscribe(() => {
      this.redirectBack();
    });
  }

  fillData(): void {
    this.route.params.subscribe((params: Params) => {
      const id:number = +params['id'];
      this.bankService.getItem(id).subscribe((bank) => {
        this.model = bank;
      }, error => console.error(error));
    });
  }

  onBack() {
    this.redirectBack();
  }

  onDelete() {
    this.bankService.delete(this.model.id);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  redirectBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  redirectToBranches() {
    this.router.navigate(['/branches'],
      {
        state: { bank: this.model }
      });
  }

  ngOnDestroy(): void {
    this.dataChanged.unsubscribe();
  }

}
