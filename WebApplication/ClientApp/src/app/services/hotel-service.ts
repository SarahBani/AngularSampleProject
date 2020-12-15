import { Inject, Injectable } from '@angular/core';
import { IHotel } from '../models/Ihotel.model';
import { Observable, Subject } from 'rxjs';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';
import { map } from 'rxjs/operators';
import { BaseGraphQLService } from './base-graphql_service';
import { Apollo } from 'apollo-angular';
import { IHotelPhoto } from '../models/IHotelPhoto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HotelService extends BaseGraphQLService implements ILoaderService {

  protected controllerName: string = 'Hotel';
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();
  public photosChanged: Subject<void> = new Subject<void>();

  constructor(apollo: Apollo,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService,
    httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(apollo, modalService, exceptionHandlerService, false, httpClient, baseUrl);
  }

  public getList(): Observable<IHotel[]> {
    const query = `
      hotels {
        id
        name
        stars
        city {
          name
          country
          {
            name
          }
        }
        photos
        {
          photoUrl
        }
      }`;
    return super.requestQuery('Hotels', query)
      .pipe(map(({ data }) => {
        return data?.hotels;
      }));
  }

  public getCount(): Observable<number> {
    const query = 'hotelsCount';
    return super.requestQuery('HotelsCount', query)
      .pipe(map(({ data }) => {
        return data?.hotelsCount;
      }));
  }

  public getItem(id: number): Observable<IHotel> {
    const query = `
      hotel(id: ${id}) {
        id
        name
        stars
        address
        city
        {
          id
          name
          country
          {
            id
            name
          }
        }
        photos
        {
          photoUrl
        }
      }`;
    return super.requestQuery('Hotel', query)
      .pipe(map(({ data }) => {
        return data?.hotel;
      }));
  }

  public save(id: number,
    name: string,
    cityId: number,
    stars: number,
    address: string): void {
    if (id > 0) {
      this.update(id, name, cityId, stars, address);
    }
    else {
      this.insert(name, cityId, stars, address);
    }
  }

  private insert(
    name: string,
    cityId: number,
    stars: number,
    address: string): void {
    const mutation = `
      createHotel(hotel: { name: "${name}", cityId: ${cityId}, stars: ${stars}, address: "${address}"})
      {
        isSuccessful
        customExceptionMessage
      }`;

    super.requestMutation('CreateHotel', mutation)
      .pipe(map(({ data }) => {
        return data?.createHotel;
      }))
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  private update(id: number,
    name: string,
    cityId: number,
    stars: number,
    address: string): void {
    const mutation = `
        editHotel(hotel : { id: ${id}, name: "${name}", cityId: ${cityId}, stars: ${stars}, address: "${address}"})
        {
          isSuccessful
          customExceptionMessage
        }`;
    super.requestMutation('EditHotel', mutation)
      .pipe(map(({ data }) => {
        return data?.editHotel;
      }))
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public delete(id: number): void {
    if (id != null) {
      this.confirmDeleteSubscription = super.confirmDelete().subscribe((result: boolean) => {
        if (result) {
          this.changeLoaderStatus.next(true);
          this.doDelete(id);
        }
        else {
          this.operationCompleted.next(false);
        }
        this.confirmDeleteSubscription.unsubscribe();
      });
    }
  }

  private doDelete(id: number): void {
    const mutation = `
      removeHotel(id : ${id}) {
          isSuccessful
          customExceptionMessage
      }`;
    super.requestMutation('RemoveHotel', mutation)
      .pipe(map(({ data }) => {
        return data?.removeHotel;
      }))
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public getPhotos(hotelId: number): Observable<IHotelPhoto[]> {
    const query = `
      hotelPhotos(hotelId : ${hotelId}) {
        id
        photoUrl
      }`;
    return super.requestQuery('HotelPhotos', query)
      .pipe(map(({ data }) => {
        return data?.hotelPhotos;
      }));
  }

  public getPhoto(hotelId: number): Observable<IHotelPhoto> {
    const query = `
      hotelPhoto(hotelId: ${hotelId}) {
        id
        photoUrl
      }`;
    return super.requestQuery('HotelPhoto', query)
      .pipe(map(({ data }) => {
        return data?.hotel;
      }));
  }

  public uploadPhotoFile(hotelId: number, file: File): Observable<any> {
    return this.postFile(`UploadPhoto/${hotelId}`, file);
  }

  public deletePhotoFile(filePath: string): Observable<any> {
    return this.httpDelete(`DeletePhoto?filePath=${filePath}`);
  }

  public insertPhoto(hotelId: number, photoUrl: string): void {
    var photoUrl = photoUrl.split(String.fromCharCode(92)).join(String.fromCharCode(92, 92)); // replace / with //
    const mutation = `
      createHotelPhoto(hotelPhoto: { hotelId: ${hotelId}, photoUrl: "${photoUrl}" })
      {
        isSuccessful
        customExceptionMessage
      }`;
    super.requestMutation('CreateHotelPhoto', mutation)
      .pipe(map(({ data }) => {
        return data?.createHotelPhoto;
      }))
      .subscribe(result => {
        this.onPhotoOperationSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public deletePhoto(id: number): void {
    const mutation = `
      removeHotelPhoto(id: ${id})
      {
        isSuccessful
        customExceptionMessage
      }`;
    super.requestMutation('RemoveHotelPhoto', mutation)
      .pipe(map(({ data }) => {
        return data?.removeHotelPhoto;
      }))
      .subscribe(result => {
        this.onPhotoOperationSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  onPhotoOperationSuccess(result): void {
    if (result.isSuccessful) {
      this.photosChanged.next();
    }
    else {
      this.modalService.showError(result.customExceptionMessage);
    }
  }

}
