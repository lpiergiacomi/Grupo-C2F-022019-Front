import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    SuccessfulPurchaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [ProviderService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
