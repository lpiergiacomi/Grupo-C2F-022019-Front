import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProviderService } from './provider/provider.service';

import { AppComponent } from './app.component';
import { ProviderComponent } from './provider/provider.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { UpdateProviderComponent } from './update-provider/update-provider.component';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProviderComponent,
    ProviderListComponent,
    ProviderDetailsComponent,
    UpdateProviderComponent,
    CreateProviderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
