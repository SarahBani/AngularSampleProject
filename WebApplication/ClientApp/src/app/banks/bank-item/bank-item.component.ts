import { Component, Input, OnInit } from '@angular/core';
import { IBank } from '../../models/IBank.model';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.css']
})
export class BankItemComponent implements OnInit {

  @Input() private model: IBank;

  constructor() { }

  public ngOnInit(): void {
  }

}
