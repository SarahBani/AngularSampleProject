import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BanksComponent } from './banks/banks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthGuardService } from './services/auth-guard-service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard-service';
import { AuthService } from './services/auth-service';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BranchesComponent } from './branches/branches.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        CounterComponent,
        FetchDataComponent,
        BanksComponent,
        PageNotFoundComponent,
        AccessDeniedComponent,
        AboutComponent,
        ContactComponent,
        ErrorPageComponent,
        BranchesComponent,
        TooltipDirective
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        TooltipModule
    ],
    providers: [AuthService, AuthGuardService, CanDeactivateGuardService],
    bootstrap: [AppComponent]
})
export class AppModule { }
