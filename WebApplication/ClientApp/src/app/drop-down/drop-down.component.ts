import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, AfterContentInit, OnChanges } from '@angular/core';
import { IEntity } from '../models/IEntity.model';

declare var $: any;

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

  //public filterData(dropDown: DropDownComponent, event: KeyboardEvent): void {
  //  console.log($(dropDown));
  public filterData(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const filteredData = this.data.filter(q => q[this.textProperty].toLowerCase().startsWith(key));
    if (filteredData.length > 0) {
      const ul = $(event.target).siblings('ul');
      const li = ul.children('li#' + filteredData[0].id).first();
      const top = ul.scrollTop() + li.position().top;
      ul.scrollTop(top);
      //$('#country ul').animate({ scrollTop: top }, "fast");
    }
  }

}
