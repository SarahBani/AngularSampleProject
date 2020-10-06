import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class BankEditComponent extends ImageUploaderComponent
  implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private model: IBank;
  private id: number;
  private dataChangedSubscription: Subscription;

  constructor(private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
    this.dataChangedSubscription = this.bankService.dataChanged.subscribe(() => {
      this.changesSaved = true;
      this.myForm.reset();
      this.redirectBack();
    });
  }

  private initForm() {
    if (this.route.snapshot.params["id"] != null) {
      this.id = +this.route.snapshot.params["id"];
      this.bankService.getItem(this.id).subscribe((bank) => {
        if (bank == null) {
          this.changesSaved = true;
          this.redirectBack(2);
          return;
        }
        this.myForm.setValue({
          'name': bank.name,
        });
        this.uploadedImageUrl = bank.logoUrl;
      }, error => console.error(error));
    }
  }

  protected getUploadFile(file: File): Observable<any> {
    return this.bankService.uploadLogo(file);
  }

  private onSave(form: NgForm) {
    const bank: IBank = {
      id: this.id,
      name: form.value.name,
      logoUrl: this.uploadedImageUrl
    };
    this.bankService.save(bank);
  }

  private onDelete() {
    this.bankService.delete(this.id);
  }

  private onCancel(): void {
    this.changesSaved = true;
    this.redirectBack();
  }

  private onDeleteImage(): void {
    this.uploadedImageUrl = null;
  }

  private redirectBack(backLevelCount: number = 1): void {
    const url: string = '../'.repeat(backLevelCount);
    this.router.navigate([url], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.dataChangedSubscription.unsubscribe();
  }

}
