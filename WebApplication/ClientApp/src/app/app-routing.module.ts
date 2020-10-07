import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BanksComponent } from './banks/banks.component';
import { SelectBankComponent } from './banks/select-bank/select-bank.component';
import { BankEditComponent } from './banks/bank-edit/bank-edit.component';
import { BankDetailComponent } from './banks/bank-detail/bank-detail.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchEditComponent } from './branches/branch-edit/branch-edit.component';
import { BranchDetailComponent } from './branches/branch-detail/branch-detail.component';
import { SelectBranchComponent } from './branches/select-branch/select-branch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuardService } from './services/can-deactivate-guard-service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'banks', component: BanksComponent,
        children: [
          { path: '', component: SelectBankComponent },
          { path: 'new', component: BankEditComponent, canDeactivate: [CanDeactivateGuardService] },
          { path: ':id', component: BankDetailComponent },
          { path: ':id/edit', component: BankEditComponent, canDeactivate: [CanDeactivateGuardService] },
        ]
      },
      {
        path: 'branches', component: BranchesComponent,
        children: [
          { path: '', component: SelectBranchComponent },
          { path: 'new', component: BranchEditComponent, canDeactivate: [CanDeactivateGuardService] },
          { path: ':id', component: BranchDetailComponent, pathMatch: 'full' },
          { path: ':id/edit', component: BranchEditComponent, canDeactivate: [CanDeactivateGuardService] },
        ]
      },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent, canDeactivate: [CanDeactivateGuardService] },
      { path: 'error-page', component: ErrorPageComponent },
      { path: 'not-found', component: PageNotFoundComponent },
      { path: 'access-denied', component: AccessDeniedComponent },
      { path: '**', redirectTo: 'not-found' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
