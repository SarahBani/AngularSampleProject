import { Observable, Subject, Subscription } from 'rxjs';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';

export abstract class BaseService {

  private const_confirmDelete: string = "Are you sure to delete this item?";
  public onUploadFinished: Subject<string> = new Subject<string>();
  public operationCompleted: Subject<boolean> = new Subject<boolean>();
  protected confirmDeleteSubscription: Subscription;

  constructor(protected modalService: ModalService,
    private exceptionHandlerService: ExceptionHandlerService) {
  }

  protected confirmDelete(): Observable<boolean> {
    return this.modalService.showConfirm(this.const_confirmDelete);
  }

  protected onSuccess(result): void {
    if (result.isSuccessful) {
      this.operationCompleted.next(true);
    }
    else {
      this.operationCompleted.next(false);
      this.modalService.showError(result.customExceptionMessage);
    }
  }

  protected onError(error): void {
    this.showError(error);
    this.operationCompleted.next(false);
  }

  protected showError(error): void {
    console.warn('showError');
    console.error(error);
    this.exceptionHandlerService.showModalException(error);
  }

}
