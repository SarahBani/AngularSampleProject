import { Component, Input, OnInit } from '@angular/core';
import { IBranch } from '../../models/Ibranch.model';

@Component({
  selector: 'app-branch-item',
  templateUrl: './branch-item.component.html',
  styleUrls: ['./branch-item.component.css']
})
export class BranchItemComponent implements OnInit {

  @Input() private model: IBranch;

  constructor() { }

  public ngOnInit(): void {
  }

}
