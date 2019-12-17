import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/model/provider';
import { MenuOrder } from 'src/app/model/menuorder';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from "./../../services/provider.service";
import { Menu } from './../../model/menu';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { ClientService } from 'src/app/services/client.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  id: number;
  menu: Menu;
  //provider: Provider;
  private menuOrder: MenuOrder = new MenuOrder();

  deliveryTypes = ['A domicilio', 'Retiro en local']

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private route: ActivatedRoute, private providerService: ProviderService, private menuService: MenuService, private clientService: ClientService, private router: Router){}

  dateTime = new Date();
  purchaseForm = new FormGroup({
    menu : new FormControl('', Validators.required),
    quantity : new FormControl('', Validators.required),
    dateTime : new FormControl(null, Validators.required),
    time : new FormControl(null, Validators.required),
    deliveryType : new FormControl('', Validators.required)
  })


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.menuService.getMenu(this.id)
      .subscribe(menu => {
        this.menu = menu;
        this.menuOrder.menu = this.menu;
        this.providerService.getProvider(menu.idProvider)
        .subscribe(provider => {
          //this.provider = provider;
          this.menu.provider = provider;
          this.menuOrder.idClient = this.storage.get('clientId');
        })
      });
  }

  purchase(){
    this.clientService.createOrder(this.menuOrder)
    .subscribe(data => {
    }),
    error => {
      console.log(error);
    }
  }
    
  

}
