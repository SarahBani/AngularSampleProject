import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {

  banks: IBank[] = [];
  private updateSubscription: Subscription;

  constructor(private bankService: BankService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bankService.getList().subscribe((banks) => {
      this.banks = banks;
    });
  }

  onClick(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
