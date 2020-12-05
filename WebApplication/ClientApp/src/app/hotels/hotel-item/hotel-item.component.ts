import { Component, Input, OnInit } from '@angular/core';
import { IHotel } from '../../models/IHotel.model';

declare var $: any;

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.css']
})
export class HotelItemComponent implements OnInit {

  @Input() private model: IHotel;

  constructor() { }

  public  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    $('#stars' + this.model.id).starrr({
      rating: this.model.stars
    });
  }

}
