import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IHotel } from '../../models/IHotel.model';
import { IHotelPhoto } from '../../models/IHotelPhoto.model';
import { HotelService } from '../../services/hotel-service';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent extends BaseLoading implements OnInit, OnDestroy {

  private model: IHotel;
  private selectedPhotoUrl: string;
  private operationCompletedSubscription: Subscription;
  private photosChangedSubscription: Subscription;

  constructor(private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService) {
    super(hotelService);
  }

  public ngOnInit(): void {
    this.subscribe();
    this.fillData();
    if (window.location.href.endsWith('photos')) {
      this.onPhotos();
    }
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.hotelService.operationCompleted
      .subscribe((hasSucceed: boolean) => { // When delete button pressed
        super.hideLoader();
        if (hasSucceed) {
          this.redirectBack();
        }
      });
    this.photosChangedSubscription = this.hotelService.photosChanged
      .subscribe(() => {
        this.fillPhotos();
      });
  }

  private fillData(): void {
    super.showLoader();
    this.route.params.subscribe((params: Params) => {
      const id: number = +params['id'];
      this.hotelService.getItem(id).subscribe((hotel: IHotel) => {
        super.hideLoader();
        if (hotel == null) {
          this.redirectBack();
          return;
        }
        this.model = hotel;
        if (hotel.photos != null && hotel.photos.length > 0) {
          this.selectedPhotoUrl = hotel.photos[0].photoUrl;
        }
        else {
          this.selectedPhotoUrl = null;
        }
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

  private fillPhotos(): void {
    super.showLoader();
    this.route.params.subscribe((params: Params) => {
      const id: number = params['id'];
      this.hotelService.getPhotos(id).subscribe((photos: IHotelPhoto[]) => {
        this.model.photos = photos;
        if (photos != null && photos.length > 0) {
          this.selectedPhotoUrl = photos[0].photoUrl;
        }
        else {
          this.selectedPhotoUrl = null;
        }
        super.hideLoader();
      }, error => super.showError(error));
    });
  }

  private onPhotos(): void {
    this.router.navigate(['photos'], { relativeTo: this.route });
    this.modalService.showModalContainer('Photos', true).subscribe();
  }

  private onSelectPhoto(photo: IHotelPhoto) {
    this.selectedPhotoUrl = photo.photoUrl;
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
    this.photosChangedSubscription.unsubscribe();
  }

}
