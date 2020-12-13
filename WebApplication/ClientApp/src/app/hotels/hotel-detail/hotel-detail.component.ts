import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BaseLoadingComponent } from '../../base/base-loading.component';
import { IHotel } from '../../models/IHotel.model';
import { HotelService } from '../../services/hotel-service';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent extends BaseLoadingComponent implements OnInit, OnDestroy {

  private model: IHotel;
  private operationCompletedSubscription: Subscription;
  private querySubscription: Subscription;

  constructor(private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService) {
    super(hotelService);
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillData();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.hotelService.operationCompleted
      .subscribe((hasSucceed: boolean) => { // When delete button pressed
        super.hideLoader();
        if (hasSucceed) {
          this.redirectBack();
        }
      });
  }

  private fillData(): void {
    super.showLoader();
    this.route.params.subscribe((params: Params) => {
      const id: number = +params['id'];
      this.querySubscription = this.hotelService.getItem(id).subscribe((hotel: IHotel) => {
        super.hideLoader();
        if (hotel == null) {
          this.redirectBack();
          return;
        }
        this.model = hotel;
      }, error => {
        if (error.graphQLErrors[0].extensions.code === "INVALID_OPERATION") {
          this.onBack();
        }
        else {
          super.showError(error);
        }
      });
    });
  }

  private onPhotos(): void {
    this.router.navigate(['photos'], { relativeTo: this.route });
    var modalContainerResult = this.modalService.showModalContainer('Photos');
    modalContainerResult.subscribe((result: any) => {
      if (result != null) {
        //this.refreshPhotos();
      }
      this.router.navigate(['./'], { relativeTo: this.route });
    });
  }

  private onRooms(): void {

  }

  private onBack(): void {
    this.redirectBack();
  }

  private onDelete(): void {
    this.hotelService.delete(this.model.id);
  }

  private onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  private redirectBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }

}
