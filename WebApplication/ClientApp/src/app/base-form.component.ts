import { Observable } from 'rxjs';

export abstract class BaseFormComponent {

  protected changesSaved: boolean = false;
  private const_confirmDiscardChanges: string = 'Do you want to discard the changes?';

  constructor() { }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.changesSaved) {
      return confirm(this.const_confirmDiscardChanges);
    }
    return this.changesSaved;
  }

}
