import { Component, OnInit, Directive, EventEmitter, Input, Output } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomActionResult } from '../models/ICustomActionResult.model';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  @Input() private labelText: string;
  @Input() private uploadedPercentage: number;
  @Input() private uploadedImageUrl: string;
  @Output() uploadImageFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() deleteImage: EventEmitter<void> = new EventEmitter<void>();

  public ngOnInit(): void {
  }

  public upload(files: FileList) {
    if (files.length == 0) {
      return;
    }
    this.uploadImageFile.emit(files.item(0));
  }

  protected onDeleteImage(): void {
    this.deleteImage.emit();
  }

}
