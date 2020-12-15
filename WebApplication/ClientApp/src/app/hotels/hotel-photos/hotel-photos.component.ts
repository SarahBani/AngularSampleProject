import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BaseModal } from '../../base/base-modal';
import { ICustomActionResult } from '../../models/ICustomActionResult.model';
import { IHotelPhoto } from '../../models/IHotelPhoto.model';
import { HotelService } from '../../services/hotel-service';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-hotel-photos',
  templateUrl: './hotel-photos.component.html',
  styleUrls: ['./hotel-photos.component.css']
})
export class HotelPhotosComponent extends BaseModal
  implements OnInit, OnDestroy {

  private hotelId: number;
  private photos: IHotelPhoto[];
  private uploadedPercentage: number;
  private photosChangedSubscription: Subscription;

  constructor(modalService: ModalService,
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router) {
    super(modalService, hotelService);
  }

  public ngOnInit(): void {
    this.hotelId = this.route.parent.snapshot.params["id"];
    this.subscribe();
    this.fillPhotos();
  }

  private subscribe(): void {
    this.photosChangedSubscription = this.hotelService.photosChanged
      .subscribe(() => {
        this.fillPhotos();
        super.hideLoader();
      })
  }

  private fillPhotos(): void {
    this.hotelService.getPhotos(this.hotelId).subscribe((photos) => {
      this.photos = photos;
      super.hideLoader();
    }, error => super.showError(error));
  }

  private onUploadImage(files: FileList) {
    if (files.length == 0) {
      return;
    }
    const file = files.item(0);
    this.getUploadFile(file)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadedPercentage = Math.round(100 * event.loaded / event.total);
          console.log(this.uploadedPercentage);
        }
        else if (event.type === HttpEventType.Response) {
          let actionResult = <ICustomActionResult>event.body;
          const uploadedImageUrl = actionResult.content;
          this.hotelService.insertPhoto(this.hotelId, uploadedImageUrl);
        }
      }, error => super.showError(error));
  }

  private getUploadFile(file: File): Observable<any> {
    return this.hotelService.uploadPhotoFile(this.hotelId, file);
  }

  private onDeletePhoto(hotelPhoto: IHotelPhoto): void {
    this.uploadedPercentage = null;
    this.hotelService.deletePhotoFile(hotelPhoto.photoUrl)
      .subscribe(event => {
        this.hotelService.deletePhoto(hotelPhoto.id);
      }, error => super.showError(error));
  }

  protected onOK(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
    super.onCancel();
  }

  public ngOnDestroy(): void {
    this.photosChangedSubscription.unsubscribe();
  }

}
