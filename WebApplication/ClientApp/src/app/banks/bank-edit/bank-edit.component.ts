import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ImageUploaderComponent } from '../../image-uploader.component';
import { IBank } from '../../models/IBank.model';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.css']
})
export class BankEditComponent extends ImageUploaderComponent implements OnInit {

  @ViewChild('f') myForm: NgForm;
  public model: IBank;
  private id: number = -1;
  isSelected: boolean = false;
  private changesSaved: boolean = false;
  private dataUpdated: Subscription;

  constructor(private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.dataUpdated = this.bankService.dataUpdated.subscribe(() => {
      this.changesSaved = true;
      this.myForm.reset();
      this.isSelected = false;
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  private initForm() {
    if (this.route.snapshot.params["id"] != null) {
      this.id = +this.route.snapshot.params["id"];
      this.bankService.getItem(this.id).subscribe((bank) => {
        this.myForm.setValue({
          'name': bank.name,
        });
        super.uploadedImageUrl = 'images/' + bank.logoUrl;
      }, error => console.error(error));
    }
  }

  protected getUploadFile(file: File): Observable<any> {
    return this.bankService.uploadLogo(file);
  }

  onSave(form: NgForm) {
    const bank: IBank = {
      id: this.id,
      name: form.value.name,
      logoUrl: super.uploadedImageUrl
    };
  }

  onDelete() {
    if (this.isSelected) {
      this.bankService.delete(this.id);
      this.myForm.reset();
      this.isSelected = false;
    }
  }

  onCancel(): void {
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    }
    return this.changesSaved;
  }

  ngOnDestroy(): void {
    this.dataUpdated.unsubscribe();
  }

}
