import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from '../base/base-form.component';
import { ContactService } from '../services/contact-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BaseFormComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private emailSentSubscription: Subscription;

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.subscribe();
  }

  private subscribe(): void {
    this.emailSentSubscription = this.contactService.operationCompleted.subscribe((hasSent) => {
      if (hasSent) {
        this.changesSaved = true;
        this.myForm.reset();
      }
      super.hideLoader();
    })
  }

  private onSend(): void {
    super.showLoader();
    this.contactService.send(this.myForm.value.email, this.myForm.value.message);
  }

  public ngOnDestroy(): void {
    this.emailSentSubscription.unsubscribe();
  }

}
