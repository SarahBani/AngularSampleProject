import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {

  public model: IBank;

  constructor(private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router) {
    this.fillData();
  }

  ngOnInit(): void {
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    this.bankService.delete(this.model.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  redirectToBranches() {
    this.router.navigate(['/branches'],
      {
        state: { bank: this.model }
      });
  }

}
