import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ContactService } from '../services/contact-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private messageSentSubscription: Subscription;
  private changesSaved: boolean = false;

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) {
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

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    }
    return this.changesSaved;
  }

  ngOnDestroy(): void {
    this.messageSentSubscription.unsubscribe();
  }

}