import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BaseFormComponent } from '../../base/base-form.component';
import { ICity } from '../../models/ICity.model';
import { ICountry } from '../../models/ICountry.model';
import { IHotel } from '../../models/IHotel.model';
import { LocationService } from '../../services/location-service';
import { HotelService } from '../../services/hotel-service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private model: IHotel;
  private id: number;
  private countries: ICountry[] = [];
  private cities: ICity[] = [];
  private selectedCountryId: number;
  private selectedCountryName: string = '---';
  private selectedCityId: number;
  private selectedCityName: string = '---';
  private stars: number;
  private operationCompletedSubscription: Subscription;

  constructor(private hotelService: HotelService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router) {
    super(hotelService);
  }

  public ngOnInit(): void {
    this.subscribe();
    this.initForm();
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.hotelService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.changesSaved = true;
          this.myForm.reset();
          this.redirectBack();
        }
        else {
          super.hideLoader();
        }
      })
  }

  private initForm() {
    this.fillCountries();
    $('.starrr').starrr();

    if (this.route.snapshot.params["id"] != null) {
      this.id = +this.route.snapshot.params["id"];
      super.showLoader();
      this.hotelService.getItem(this.id).subscribe((hotel: IHotel) => {
        super.hideLoader();
        if (hotel == null) {
          this.changesSaved = true;
          this.redirectBack(2);
          return;
        }
        this.myForm.setValue({
          'name': hotel.name,
          'address': hotel.address,
        });
        //hotel.cityId
        this.stars = hotel.stars;
        $('.starrr').starrr({
          rating: this.stars
        });
      }, error => super.showError(error));
    }
  }

  private fillCountries(): void {
    super.showLoader();
    this.locationService.getCountryList().subscribe((countries: ICountry[]) => {
      this.countries = countries;
      super.hideLoader();
    }, error => super.showError(error));
  }

  private onSelectCountry(country: ICountry): void {
    if (country != null) {
      this.selectedCountryId = country.id;
      this.selectedCountryName = country.name;
      this.cities = country.cities;
    } else {
      this.selectedCountryId = 0;
      this.selectedCountryName = '---';
    }
    this.onSelectCity(null);
  }

  private onSelectCity(city: ICity): void {
    if (city != null) {
      this.selectedCityId = city.id;
      this.selectedCityName = city.name;
    } else {
      this.selectedCityId = 0;
      this.selectedCityName = '---';
    }
  }

  private onClear(): void {
    this.onSelectCountry(null);
  }

  private onSave(): void {
    super.showLoader();
    const hotel: IHotel = {
      id: this.id,
      name: this.myForm.value.name,
      cityId: this.selectedCityId,
      stars: this.stars,
      address: this.myForm.value.address
    };
    this.hotelService.save(hotel);
  }

  private onDelete(): void {
    this.hotelService.delete(this.id);
  }

  private onCancel(): void {
    this.changesSaved = true;
    this.redirectBack();
  }

  private redirectBack(backLevelCount: number = 1): void {
    const url: string = '../'.repeat(backLevelCount);
    this.router.navigate([url], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
