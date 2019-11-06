
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { UpdateProviderComponent } from './update-provider/update-provider.component';
import { AddRemoveCreditComponent } from './add-remove-credit/add-remove-credit.component';

const routes: Routes = [
  { path: '', redirectTo: 'provider', pathMatch: 'full' },
  { path: 'providers', component: ProviderListComponent, runGuardsAndResolvers: 'always' },
  { path: 'add', component: CreateProviderComponent },
  { path: 'update/:id', component: UpdateProviderComponent },
  { path: 'details/:id', component: ProviderDetailsComponent },
  { path: 'credit/:id', component: AddRemoveCreditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }