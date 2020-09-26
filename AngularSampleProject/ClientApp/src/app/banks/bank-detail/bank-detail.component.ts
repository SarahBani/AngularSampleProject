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

  model: IBank;
  id: number;

  constructor(private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router) {
    this.fillData();
  }

  ngOnInit(): void {
  }

  fillData(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.bankService.getItem(this.id).subscribe((bank) => {
        this.model = bank;
      }, error => console.error(error));
    });
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    this.bankService.delete(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
