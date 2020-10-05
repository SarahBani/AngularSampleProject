import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertState, Button } from '../models/Enums';
import { ButtonState } from '../models/Enums';

declare var jquery: any;
declare var $: any;

@Injectable({ providedIn: 'root' })
export class ModalService {

  private currentModalAlertState: AlertState;
  private onModalButtonClicked = new Subject<Button>();

  constructor() {
  }

  public showSuccess(message: string): void {
    this.setClasses(AlertState.Success);
    this.showModalAlert(message, 'Success!');
  }

  public showInformation(message: string): void {
    this.setClasses(AlertState.Info);
    this.showModalAlert(message, '');
  }

  public showError(message: string): void {
    this.setClasses(AlertState.Danger);
    this.showModalAlert(message, 'Error!');
  }


  public showConfirm(message: string): Observable<boolean> {
    this.showModal(message, 'Confirm', ButtonState.YesNo);
    return this.onModalButtonClicked
      .pipe(map((btn: Button) => {
        switch (btn) {
          case Button.Ok:
            return true;
          case Button.Cancel:
            return false;
          case Button.Yes:
            return true;
          case Button.No:
            return false;
        }
      }));;
  }

  private setClasses(alertState: AlertState): void {
    if (this.currentModalAlertState !== undefined) {
      if (this.currentModalAlertState === alertState) {
        return;
      }
      this.resetClasses();
    }
    this.currentModalAlertState = alertState;
    this.addClasses();
  }

  private resetClasses(): void {
    var state: string = AlertState[this.currentModalAlertState].toLowerCase();
    $('#myModalAlert .alert').removeClass('alert-' + state);
  }

  private addClasses(): void {
    var state: string = AlertState[this.currentModalAlertState].toLowerCase();
    $('#myModalAlert .alert').addClass('alert-' + state);
  }

  private showModalAlert(message: string, caption: string): void {
    $('#myModalAlert').modal();                   // initialized with defaults
    $('#myModalAlert').modal({ keyboard: false });   // initialized with no keyboard
    var captionHTML: string = '';
    if (caption != '') {
      captionHTML = '<strong id="caption">' + caption + '</strong> ';
    }
    $('#myModalAlert .modal-alert-content').html(captionHTML + message);
    $('#myModalAlert').modal('show');
  }

  private showModal(message: string,
    caption: string,
    buttons: ButtonState): void {
    $('#myModal').modal();                   // initialized with defaults
    $('#myModal').modal({ keyboard: false });   // initialized with no keyboard
    $('#myModal .modal-title').text(caption);
    $('#myModal .modal-body').text(message);
    switch (buttons) {
      case ButtonState.Ok:
        $('#myModal .modal-footer #btnOK').show();
        $('#myModal .modal-footer #btnCancel').hide();
        $('#myModal .modal-footer #btnYes').hide();
        $('#myModal .modal-footer #btnNo').hide();
        break;
      case ButtonState.OkCancel:
        $('#myModal .modal-footer #btnOK').show();
        $('#myModal .modal-footer #btnCancel').show();
        $('#myModal .modal-footer #btnYes').hide();
        $('#myModal .modal-footer #btnNo').hide();
        break;
      case ButtonState.YesNo:
        $('#myModal .modal-footer #btnOK').hide();
        $('#myModal .modal-footer #btnCancel').hide();
        $('#myModal .modal-footer #btnYes').show();
        $('#myModal .modal-footer #btnNo').show();
        break;
    }
    //$('#myModal .modal-body').addClass('alert-success');
    //$('#myModal .modal-footer button').addClass('btn-success');
    $('#myModal').modal('show');
    //$('.toast').toast('show');
  }

  public onButtonClick(btn: Button): void {
    this.onModalButtonClicked.next(btn);
  }

}
