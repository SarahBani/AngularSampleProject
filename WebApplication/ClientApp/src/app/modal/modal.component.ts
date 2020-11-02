import { Component, OnInit } from '@angular/core';
import { Button } from '../models/Enums';
import { ModalService } from '../services/modal-service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  public ngOnInit(): void {
  }

  private onOK(): void {
    this.modalService.buttonClick(Button.Ok);
  }

  private onCancel(): void {
    this.modalService.buttonClick(Button.Cancel);
  }

  private onYes(): void {
    this.modalService.buttonClick(Button.Yes);
  }

  private onNo(): void {
    this.modalService.buttonClick(Button.No);
  }

  private onClose(): void {   
  }

}
