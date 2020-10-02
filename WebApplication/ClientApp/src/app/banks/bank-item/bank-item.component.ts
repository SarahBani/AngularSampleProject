import { Component, Input, OnInit } from '@angular/core';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.css']
})
export class BankItemComponent implements OnInit {

  @Input() model: IBank;

  constructor(private bankService: BankService) { }

  ngOnInit(): void {
  }

  onSelect(): void {
    this.bankService.select(this.model);
  }

}
