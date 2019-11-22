
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
import { PurchaseComponent} from './purchase/purchase.component';
import { from } from 'rxjs';
import { SuccessfulPurchaseComponent } from './successful-purchase/successful-purchase.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'providers', component: ProviderListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
  { path: 'addProvider', component: CreateProviderComponent, canActivate: [AuthGuard]},
  { path: 'updateProvider/:id', component: UpdateProviderComponent, canActivate: [AuthGuard]},
  { path: 'detailsProvider/:id', component: ProviderDetailsComponent, canActivate: [AuthGuard]},
  { path: 'credit/:id', component: AddRemoveCreditComponent, canActivate: [AuthGuard]},
  { path: 'menus', component: MenuListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
  { path: 'addMenu', component: CreateMenuComponent, canActivate: [AuthGuard]},
  { path: 'updateMenu/:id', component: UpdateMenuComponent, canActivate: [AuthGuard]},
  { path: 'detailsMenu/:id', component: MenuDetailsComponent, canActivate: [AuthGuard]},
  { path: 'providersMenus/:id', component: ProvidersMenusComponent, canActivate: [AuthGuard]},
  { path: 'purchase/:id', component: PurchaseComponent, canActivate: [AuthGuard]},
  { path: 'successfulPurchase', component: SuccessfulPurchaseComponent, canActivate: [AuthGuard]},
  { path: 'login', component: NavbarComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }