import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule } from 'ngx-highlightjs';
import json from 'highlight.js/lib/languages/json';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderService } from './services/provider.service';
import { MenuService } from './services/menu.service';

import { AppComponent } from './app.component';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { ProviderDetailsComponent } from './components/provider-details/provider-details.component';
import { UpdateProviderComponent } from './components/update-provider/update-provider.component';
import { CreateProviderComponent } from './components/create-provider/create-provider.component';
import { AddRemoveCreditComponent } from './components/add-remove-credit/add-remove-credit.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';
import { UpdateMenuComponent } from './components/update-menu/update-menu.component';
import { MenuDetailsComponent } from './components/menu-details/menu-details.component';
import { ProvidersMenusComponent } from './components/providers-menus/providers-menus.component';
import { DataTablesModule } from 'angular-datatables';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SuccessfulPurchaseComponent } from './components/successful-purchase/successful-purchase.component';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd } from 'ngx-datepicker-material';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { StorageServiceModule } from 'ngx-webstorage-service';

import {MatDatepickerModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatDialogModule, MatFormFieldModule, MatPaginatorModule, MatSortModule} from '@angular/material'
import {MatMomentDateModule} from '@angular/material-moment-adapter'

// Multiidioma

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Spinner
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


// Localización para fecha, moneda, etc.
import localeAR from '@angular/common/locales/es-AR';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

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
    ProvidersMenusComponent,
    PurchaseComponent,
    SuccessfulPurchaseComponent,
    NavbarComponent,
    ProfileComponent,
    LoaderComponent
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
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDH0XmsUePVkhw_LWvp4A_UY8PJPERPfAI',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot(),
    StorageServiceModule,
    MatProgressSpinnerModule
  ],
  providers: [ProviderService, 
    MenuService, 
    {
      provide: LOCALE_ID, 
      useValue: 'es'
    }, 
    GoogleMapsAPIWrapper,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LoaderInterceptor, 
      multi: true
    }
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }