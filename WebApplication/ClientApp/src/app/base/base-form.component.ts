import { Observable } from 'rxjs';
import { BaseLoadingComponent } from './base-loading.component';
import { ILoaderService } from '../services/ILoader-service';

export abstract class BaseFormComponent extends BaseLoadingComponent {

  protected changesSaved: boolean = false;
  private const_confirmDiscardChanges: string = 'Do you want to discard the changes?';

  constructor(loaderService: ILoaderService = null) {
    super(loaderService);
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.changesSaved) {
      return confirm(this.const_confirmDiscardChanges);
    }
    return this.changesSaved;
  }

}
