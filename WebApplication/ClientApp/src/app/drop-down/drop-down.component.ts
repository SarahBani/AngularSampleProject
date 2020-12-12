import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IEntity } from '../models/IEntity.model';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  @Input() private data: IEntity[] = [];
  @Input() private textProperty: string;
  @Input() private imageProperty: string;
  @Input() private selectedItem: IEntity;

  @Output() select: EventEmitter<IEntity> = new EventEmitter<IEntity>();

  constructor() {
  }

  public ngOnInit(): void {
    this.selectedItem = { id: 0 };
    this.selectedItem[this.textProperty] = '---';
  }

  public onSelect(item: IEntity) {
    this.selectedItem = item;
    if (this.select != null) {
      this.select.emit(item);
    }
  }

}
