import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IHotel } from '../../models/IHotel.model';
import { HotelService } from '../../services/hotel-service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent extends BaseLoading implements OnInit, OnDestroy {

  private count: number = 0
  private hotels: IHotel[] = [];
  private operationCompletedSubscription: Subscription;
  private countQuerySubscription: Subscription;
  private listQuerySubscription: Subscription;

  constructor(private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.subscribe();
    this.onRefresh();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.hotelService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.onRefresh();
        }
      });
  }

  private setCount(): void {
    super.showLoader();
    this.countQuerySubscription = this.hotelService.getCount().subscribe((count) => {
      this.count = count;
      super.hideLoader();
    }, error => super.showError(error));
  }

  private fillList(): void {
    super.showLoader();
    this.listQuerySubscription = this.hotelService.getList().subscribe((hotels) => {
      this.hotels = hotels;
      super.hideLoader();
    }, error => super.showError(error));
  }

  private onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  private onRefresh(): void {
    this.setCount();
    this.fillList();
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
    this.countQuerySubscription.unsubscribe();
    this.listQuerySubscription.unsubscribe();
  }

}
