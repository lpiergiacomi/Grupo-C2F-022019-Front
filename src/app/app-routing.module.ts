
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { UpdateProviderComponent } from './update-provider/update-provider.component';
import { AddRemoveCreditComponent } from './add-remove-credit/add-remove-credit.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { ProvidersMenusComponent } from './providers-menus/providers-menus.component';

const routes: Routes = [
  { path: '', redirectTo: 'providers', pathMatch: 'full' },
  { path: 'providers', component: ProviderListComponent, runGuardsAndResolvers: 'always' },
  { path: 'addProvider', component: CreateProviderComponent },
  { path: 'updateProvider/:id', component: UpdateProviderComponent },
  { path: 'detailsProvider/:id', component: ProviderDetailsComponent },
  { path: 'credit/:id', component: AddRemoveCreditComponent},
  { path: 'menus', component: MenuListComponent, runGuardsAndResolvers: 'always' },
  { path: 'addMenu', component: CreateMenuComponent },
  { path: 'updateMenu/:id', component: UpdateMenuComponent,  },
  { path: 'detailsMenu/:id', component: MenuDetailsComponent },
  { path: 'providersMenus/:id', component: ProvidersMenusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }