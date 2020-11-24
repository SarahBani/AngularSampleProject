import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BanksComponent } from './banks/banks.component';
import { BankListComponent } from './banks/bank-list/bank-list.component';
import { BankItemComponent } from './banks/bank-item/bank-item.component';
import { BankDetailComponent } from './banks/bank-detail/bank-detail.component';
import { BankEditComponent } from './banks/bank-edit/bank-edit.component';
import { SelectBankComponent } from './banks/select-bank/select-bank.component';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookItemComponent } from './books/book-item/book-item.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { SelectBookComponent } from './books/select-book/select-book.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchListComponent } from './branches/branch-list/branch-list.component';
import { BranchDetailComponent } from './branches/branch-detail/branch-detail.component';
import { BranchEditComponent } from './branches/branch-edit/branch-edit.component';
import { BranchItemComponent } from './branches/branch-item/branch-item.component';
import { SelectBranchComponent } from './branches/select-branch/select-branch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthGuardService } from './services/auth-guard-service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard-service';
import { AuthService } from './services/auth-service';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor-service';
import { CommentNewComponent } from './books/comment-new/comment-new.component';
import { ModalContainerComponent } from './modal/modal-container/modal-container.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { HotelItemComponent } from './hotels/hotel-item/hotel-item.component';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';
import { SelectHotelComponent } from './hotels/select-hotel/select-hotel.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BanksComponent,
    BankListComponent,
    BankItemComponent,
    BankDetailComponent,
    BankEditComponent,
    SelectBankComponent,
    BooksComponent,
    BookListComponent,
    BookItemComponent,
    BookDetailComponent,
    BookEditComponent,
    SelectBookComponent,
    BranchesComponent,
    BranchDetailComponent,
    BranchEditComponent,
    BranchListComponent,
    BranchItemComponent,
    SelectBranchComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    AboutComponent,
    ContactComponent,
    ErrorPageComponent,
    TooltipDirective,
    FooterComponent,
    ModalComponent,
    SpinnerComponent,
    CommentNewComponent,
    ModalContainerComponent,
    HotelsComponent,
    HotelListComponent,
    HotelDetailComponent,
    HotelItemComponent,
    HotelEditComponent,
    SelectHotelComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TooltipModule,
    ApolloModule,
    HttpLinkModule,
    GraphQLModule
  ],
  providers: [AuthService, AuthGuardService, CanDeactivateGuardService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api.example.com/graphql'
          })
        }
      },
      deps: [HttpLink]
    }
    //{
    //  provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    //}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
