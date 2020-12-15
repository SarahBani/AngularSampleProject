import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ILoaderService } from '../services/ILoader-service';

export abstract class BaseLoading implements OnDestroy {

  protected isLoading: boolean = false;
  private counter: number = 0;
  private changeLoaderStatusSubscription: Subscription;

  constructor(loaderService: ILoaderService = null) {
    if (loaderService != null) {
      // this constructor is useful for components which have delete button
      // loader appears not after pressing delete button
      // but after confirm delete
      this.changeLoaderStatusSubscription = loaderService.changeLoaderStatus
        .subscribe((status: boolean) => {
          if (status) {
            this.showLoader();
          }
          else {
            this.hideLoader();
          }
        });
    }
  }

  protected showLoader() {
    this.isLoading = true;
    this.counter++;
  }

  protected hideLoader() {
    if (this.counter > 0) {
      this.counter--;
    }
    if (this.counter == 0) {
      this.isLoading = false;
    }
  }

  protected showError(error): void {
    console.warn('BaseLoadingComponent - showError');
    const JsonErr = JSON.stringify(error)
    console.error(JsonErr);
    this.hideLoader();
  }

  public ngOnDestroy(): void {
    if (this.changeLoaderStatusSubscription != null) {
      this.changeLoaderStatusSubscription.unsubscribe();
    }
  }

  protected getEmptyItemAdded(array, emptyItem) {
    if (array != null) {
      array = Array.prototype.slice.call(array);
      array.unshift(emptyItem);
    }
    else {
      array = [emptyItem];
    }
    return array;
  }

}
