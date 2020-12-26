import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private title = 'app';

  constructor(private authService: AuthService) {
  }

  public ngOnInit() {
    this.authService.autoLogin();
  }

}
