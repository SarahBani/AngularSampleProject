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
import { IEntity } from '../../models/IEntity.model';

declare var $: any;

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private id: number;
  private countries: ICountry[] = [];
  private cities: ICity[] = [];
  private selectedCountry: ICountry;
  private selectedCity: ICity;
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

  private async initForm() {
    await this.fillCountries();

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
        const country = this.countries.filter(q => q.id === hotel.city.country.id)[0];
        this.onSelectCountry(country);
        this.onSelectCity(hotel.city);
        const stars = hotel.stars;
        this.setStars(stars);
      }, error => super.showError(error));
    }
    else {
      this.setStars();
    }
  }

  private getEmptyItemAdded(array, emptyItem) {
    if (array != null) {
      array = Array.prototype.slice.call(array);
      array.unshift(emptyItem);
    }
    else {
      array = [emptyItem];
    }
    return array;
  }

  private async fillCountries() {
    super.showLoader();
    await this.locationService.getCountryList()
      .toPromise()
      .then((countries: ICountry[]) => {
        const emptyCountry: ICountry = { id: 0, name: '---' };
        this.countries = this.getEmptyItemAdded(countries, emptyCountry);
        this.onSelectCountry(emptyCountry);
        super.hideLoader();
      })
      .catch(error => super.showError(error));
    //var countries = await this.locationService.getCountryList().toPromise()
    //  .catch(error => super.showError(error));
    //if (countries) {
    //  this.countries = countries;
    //  super.hideLoader();
    //}
    //else {
    //  super.hideLoader();
    //}
  }

  private onSelectCountry(country: ICountry): void {
    this.selectedCountry = country;
    const emptyCity: ICity = { id: 0, countryId: 0, name: '---', country: null };
    this.cities = this.getEmptyItemAdded(country.cities, emptyCity);
    this.onSelectCity(emptyCity);
  }

  private onSelectCity(city: ICity): void {
    this.selectedCity = city;
  }

  private setStars(stars: number = 0) {
    $('.starrr').starrr({
      rating: stars,
      //change: function (e, value) {
      //  console.log(value);
      //}
    });
    //$('.starrr').on('starrr:change', function (e, value) {
    //})
  }

  private onClear(): void {
    this.onSelectCountry(null);
  }

  private onSave(): void {
    const stars = $('.starrr>.fa-star').length;
    super.showLoader();
    this.hotelService.save(this.id,
      this.myForm.value.name,
      this.selectedCity.id,
      stars,
      this.myForm.value.address);
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
