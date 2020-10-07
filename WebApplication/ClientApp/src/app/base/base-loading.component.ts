import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ILoaderService } from '../services/ILoader-service';

export abstract class BaseLoadingComponent implements OnDestroy {

  protected isLoading: boolean = false;
  private counter: number = 0;
  private changeLoaderStatueSubscription: Subscription;

  constructor(loaderService: ILoaderService = null) { 
    if (loaderService != null) {
      // this constructor is useful for components which have delete button
      // loader apears not after pressing delete button
      // but after confirm delete
      this.changeLoaderStatueSubscription = loaderService.changeLoaderStatus
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
    console.error(error);
    this.hideLoader();
  }

  public ngOnDestroy(): void {
    if (this.changeLoaderStatueSubscription != null) {
      this.changeLoaderStatueSubscription.unsubscribe();
    }
  }

}
