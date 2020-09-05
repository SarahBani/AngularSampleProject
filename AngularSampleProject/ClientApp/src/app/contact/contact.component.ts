import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    @ViewChild('myForm') myForm: NgForm;

    changesSaved: boolean = false;

    constructor(private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
    }

    onSubmit() {
        this.changesSaved = true;
        alert('sdfsdf');
        this.myForm.reset();
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.changesSaved) {
            return confirm('Do you want to discard the changes?');
        }
        return this.changesSaved;
    }

}
