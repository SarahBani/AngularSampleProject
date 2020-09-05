import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BanksComponent } from './banks/banks.component';
import { BranchesComponent } from './branches/branches.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'banks', component: BanksComponent },
            { path: 'branches', component: BranchesComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
           
            //{
            //    path: 'recipes', component: RecipeComponent,
            //    children: [
            //        { path: '', component: SelectRecipeComponent },
            //        { path: 'new', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuardService] },
            //        { path: ':index', component: RecipeDetailComponent },
            //        { path: ':index/edit', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuardService] },
            //    ]
            //},
            //{ path: 'shopping-list', component: ShoppingComponent, canDeactivate: [CanDeactivateGuardService] },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
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
