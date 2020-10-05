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

  ngOnInit(): void {
  }

  public onOK(): void {
    this.modalService.onButtonClick(Button.Ok);
  }

  public onCancel(): void {
    this.modalService.onButtonClick(Button.Cancel);
  }

  public onYes(): void {
    this.modalService.onButtonClick(Button.Yes);
  }

  public onNo(): void {
    this.modalService.onButtonClick(Button.No);
  }

}
