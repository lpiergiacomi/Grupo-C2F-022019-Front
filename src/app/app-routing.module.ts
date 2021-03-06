
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderDetailsComponent } from './components/provider-details/provider-details.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { MySalesComponent } from './components/my-sales/my-sales.component';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { UpdateProviderComponent } from './components/update-provider/update-provider.component';
import { AddRemoveCreditComponent } from './components/add-remove-credit/add-remove-credit.component';
import { MenuDetailsComponent } from './components/menu-details/menu-details.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { UpdateMenuComponent } from './components/update-menu/update-menu.component';
import { ProvidersMenusComponent } from './components/providers-menus/providers-menus.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SuccessfulPurchaseComponent } from './components/successful-purchase/successful-purchase.component';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'providers', component: ProviderListComponent, runGuardsAndResolvers: 'always' },
  { path: 'updateProvider/:id', component: UpdateProviderComponent },
  { path: 'detailsProvider/:id', component: ProviderDetailsComponent },
  { path: 'credit/:id', component: AddRemoveCreditComponent },
  { path: 'menus', component: MenuListComponent, runGuardsAndResolvers: 'always' },
  { path: 'menus/page/:page', component: MenuListComponent, runGuardsAndResolvers: 'always' },
  { path: 'addMenu', component: CreateMenuComponent },
  { path: 'updateMenu/:id', component: UpdateMenuComponent },
  { path: 'detailsMenu/:id', component: MenuDetailsComponent },
  { path: 'providersMenus/:id', component: ProvidersMenusComponent },
  { path: 'purchase/:id', component: PurchaseComponent },
  { path: 'successfulPurchase/:id', component: SuccessfulPurchaseComponent },
  { path: 'login', component: NavbarComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'mySales', component: MySalesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }