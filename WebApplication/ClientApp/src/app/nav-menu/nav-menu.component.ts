import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  private isExpanded: boolean = false;
  private isUserLoggedIn: boolean = false;
  //private authenticationChangedSubscription: Subscription;
  private userChangedSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.subscribe();
    //this.isUserLoggedIn = this.authService.isAuthenticated();
  }

  private subscribe(): void {
    //this.authenticationChangedSubscription = this.authService.authenticationChanged
    //  .subscribe((isLoggedIn: boolean) => {
    //    this.isUserLoggedIn = isLoggedIn;
    //  })
    this.userChangedSubscription = this.authService.userChanged
      .subscribe((user: User) => {
        this.isUserLoggedIn = !!user;
      });
  }

  private collapse(): void {
    this.isExpanded = false;
  }

  private toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  private onSignOut(): void {
    this.authService.logout();
  }

  public ngOnDestroy(): void {
    this.userChangedSubscription.unsubscribe();
  }

}
