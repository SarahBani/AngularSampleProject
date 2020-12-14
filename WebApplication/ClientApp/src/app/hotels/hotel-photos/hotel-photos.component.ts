import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BaseModalImageUploader } from '../../base/base-modal-image-uploader';
import { IHotelPhoto } from '../../models/IHotelPhoto.model';
import { HotelService } from '../../services/hotel-service';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-hotel-photos',
  templateUrl: './hotel-photos.component.html',
  styleUrls: ['./hotel-photos.component.css']
})
export class HotelPhotosComponent extends BaseModalImageUploader
  implements OnInit, OnDestroy {

  private hotelId: number;
  private photos: IHotelPhoto[];
  private operationCompletedSubscription: Subscription;
  private querySubscription: Subscription;
  private deleteSubscription: Subscription;

  constructor(modalService: ModalService,
    private hotelService: HotelService,
    private route: ActivatedRoute) {
    super(modalService, hotelService);
  }

  public ngOnInit(): void {
    this.hotelId = this.route.parent.snapshot.params["id"];
    this.subscribe();
    this.fillPhotos();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.hotelService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          super.passResult(true);
        }
        super.hideLoader();
      })
  }

  private fillPhotos(): void {
    this.querySubscription = this.hotelService.getPhotos(this.hotelId).subscribe((photos) => {
      this.photos = photos;
      super.hideLoader();
    }, error => super.showError(error));
  }

  protected getUploadFile(file: File): Observable<any> {
    super.showLoader();
    return this.hotelService.uploadPhoto(this.hotelId, file);
  }

  private onSave(): void {
    this.hotelService.insertPhoto(this.hotelId, this.uploadedImageUrl);
  }

  protected onCancel(): void {
    if (this.uploadedImageUrl != null) {
      super.showLoader();
      this.deleteSubscription = this.hotelService.deletePhoto(this.uploadedImageUrl)
        .subscribe((result) => {
          console.log(result);
          super.hideLoader();
          super.onCancel();
      }, error => super.showError(error));
    }
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

}
