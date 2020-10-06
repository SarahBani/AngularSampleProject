import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from '../base-form.component';
import { ContactService } from '../services/contact-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BaseFormComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private messageSentSubscription: Subscription;

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.messageSentSubscription = this.contactService.messageSentCompleted.subscribe(() => {
      this.myForm.reset();
    })
  }

  onSend(): void {
    this.changesSaved = true;
    this.contactService.send(this.myForm.value.email, this.myForm.value.message);
  }

  ngOnDestroy(): void {
    this.messageSentSubscription.unsubscribe();
  }

}
