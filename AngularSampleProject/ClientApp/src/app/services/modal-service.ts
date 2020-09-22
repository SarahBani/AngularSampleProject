import { Injectable } from '@angular/core';
import { AlertState } from '../models/Enums';
import { ButtonState } from '../models/Enums';

declare var jquery: any;
declare var $: any;

@Injectable({ providedIn: 'root' })
export class ModalService {

  private currentModalAlertState: AlertState;

  constructor() {
  }

  showSuccess(message: string) {
    this.setClasses(AlertState.Success);
    this.showModalAlert(message, 'Success!');
  }

  showInformation(message: string) {
    this.setClasses(AlertState.Info);
    this.showModalAlert(message, '');
  }

  showError(message: string) {
    this.setClasses(AlertState.Danger);
    this.showModalAlert(message, 'Error!');
  }

  showConfirm(message: string) {
    this.resetClasses();
    //this.currentModalAlertState = AlertState.Warning;
    //$('#myModalAlert .modal-alert-container').attr("class", "alert-warning");
    this.showModal(message, 'Confirm', ButtonState.YesNo);
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

  private showModal(message: string, caption: string, buttons: ButtonState): void {
    $('#myModal').modal();                   // initialized with defaults
    $('#myModal').modal({ keyboard: false });   // initialized with no keyboard
    $('#myModal .modal-title').text(caption);
    $('#myModal .modal-body').text(message);
    //$('#myModal .modal-body').addClass('alert-success');
    //$('#myModal .modal-footer button').addClass('btn-success');
    $('#myModal').modal('show');
    //$('.toast').toast('show');
  }

}
