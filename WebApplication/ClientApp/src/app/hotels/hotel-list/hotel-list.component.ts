import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoadingComponent } from '../../base/base-loading.component';
import { IHotel } from '../../models/IHotel.model';
import { HotelService } from '../../services/hotel-service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent extends BaseLoadingComponent implements OnInit, OnDestroy {

  private hotels: IHotel[] = [];
  private operationCompletedSubscription: Subscription;

  constructor(private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillList();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.hotelService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.fillList();
        }
      });
  }

  private fillList(): void {
    super.showLoader();
    this.hotelService.getList();
    //this.hotelService.getList().subscribe((hotels) => {
    //  this.hotels = hotels;
    //  super.hideLoader();
    //}, error => super.showError(error));
  }

  private onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  private onRefresh(): void {
    this.fillList();
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
