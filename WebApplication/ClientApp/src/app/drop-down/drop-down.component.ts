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
  @Input() private selectedItem: IEntity
  @Input() private required: boolean;
  @Output() select: EventEmitter<IEntity> = new EventEmitter<IEntity>();
  private initValue: IEntity = { id: 0 };

  constructor() {
  }

  public ngOnInit(): void {
    this.selectedItem = this.initValue;
  }

  public onSelect(item: IEntity) {
    this.selectedItem = item;
    if (this.select != null) {
      this.select.emit(item);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] != null && !changes['data'].firstChange &&
        changes['data'].currentValue != [] && this.selectedItem == this.initValue) {
      this.selectedItem = this.data[0];
    }
  }

  private filter: string = '';

  public filterData(event: KeyboardEvent): void {
//    this.filter = event.key;
//    this.data.filter(q => q[this.textProperty].startsWith(event.key));


//var offset = $('#someDivElementId ul li').first().position().top;
//$('#someDivElementId').scrollTop($('#23532532532532').parent().position().top - offset);
  }

}
