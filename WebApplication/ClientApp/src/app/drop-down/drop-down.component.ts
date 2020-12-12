import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, AfterContentInit, OnChanges } from '@angular/core';
import { IEntity } from '../models/IEntity.model';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit, OnChanges {

  @Input() private data: IEntity[] = [];
  @Input() private textProperty: string;
  @Input() private imageProperty: string;
  @Input() private selectedItem: IEntity;
  @Output() select: EventEmitter<IEntity> = new EventEmitter<IEntity>();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public onSelect(item: IEntity) {
    this.selectedItem = item;
    if (this.select != null) {
      this.select.emit(item);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] != null && !changes['data'].firstChange && changes['data'].currentValue != []) {
      this.selectedItem = this.data[0];
    }
  }

}
