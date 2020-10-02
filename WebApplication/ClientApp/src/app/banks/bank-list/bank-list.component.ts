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

  public banks: IBank[] = [];
  private dataUpdated: Subscription;

  constructor(private bankService: BankService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.fillList();
    this.dataUpdated = this.bankService.dataUpdated.subscribe(() => {
      this.fillList();
    });
  }

  private fillList() {
    this.bankService.getList().subscribe((banks) => {
      this.banks = banks;
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.dataUpdated.unsubscribe();
  }

}
