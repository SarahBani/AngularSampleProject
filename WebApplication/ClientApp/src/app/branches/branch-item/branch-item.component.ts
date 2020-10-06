import { Component, Input, OnInit } from '@angular/core';
import { IBranch } from '../../models/Ibranch.model';
import { BranchService } from '../../services/branch-service';

@Component({
  selector: 'app-branch-item',
  templateUrl: './branch-item.component.html',
  styleUrls: ['./branch-item.component.css']
})
export class BranchItemComponent implements OnInit {

  @Input() model: IBranch;

  constructor(private branchService: BranchService) { }

  public ngOnInit(): void {
  }

  private onSelect(): void {
    this.branchService.select(this.model);
  }

}
