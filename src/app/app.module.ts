import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule } from 'ngx-highlightjs';
import json from 'highlight.js/lib/languages/json';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderService } from './provider.service';
import { MenuService } from './menu.service';

import { AppComponent } from './app.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { UpdateProviderComponent } from './update-provider/update-provider.component';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { AddRemoveCreditComponent } from './add-remove-credit/add-remove-credit.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { FilterPipe } from './filter.pipe';
import { ProvidersMenusComponent } from './providers-menus/providers-menus.component';
import { DataTablesModule } from 'angular-datatables';
import { PurchaseComponent } from './purchase/purchase.component';
import { SuccessfulPurchaseComponent } from './successful-purchase/successful-purchase.component';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd } from 'ngx-datepicker-material';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';

// Datepickers
import {MatDatepickerModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatCardModule} from '@angular/material'
import {MatMomentDateModule} from '@angular/material-moment-adapter'

// Multiidioma
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Spinner
import { NgxSpinnerModule } from 'ngx-spinner';
import { registerLocaleData } from '@angular/common';

// Localización para fecha, moneda, etc.
import localeAR from '@angular/common/locales/es-AR';
registerLocaleData(localeAR, 'es');


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function hljsLanguages() {
  return [{ name: 'json', func: json }];
}

@NgModule({
  declarations: [
    AppComponent,
    ProviderListComponent,
    ProviderDetailsComponent,
    UpdateProviderComponent,
    CreateProviderComponent,
    AddRemoveCreditComponent,
    MenuListComponent,
    CreateMenuComponent,
    UpdateMenuComponent,
    MenuDetailsComponent,
    FilterPipe,
    ProvidersMenusComponent,
    PurchaseComponent,
    SuccessfulPurchaseComponent,
    NavbarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NgbModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
     }
    }),
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    NgxDaterangepickerMd,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [ProviderService, MenuService, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
