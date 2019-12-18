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
import swal from 'sweetalert2'
import { Client } from 'src/app/model/client';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  id: number;
  idCliente: number;
  menu: Menu;
  provider: Provider;
  client: Client;

  menuOrder: MenuOrder = new MenuOrder();

  deliveryTypes = ['A domicilio', 'Retiro en local']

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private route: ActivatedRoute, private providerService: ProviderService, private menuService: MenuService, private clientService: ClientService, private router: Router) { }

  dateTime = new Date();
  purchaseForm = new FormGroup({
    menu: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    dateTime: new FormControl(null, Validators.required),
    time: new FormControl(null, Validators.required),
    deliveryType: new FormControl('', Validators.required)
  })


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.idCliente = this.storage.get('clientId');

    this.clientService.getClientById(this.idCliente)
      .subscribe(data => {
        this.client = data.client;
      }),
      error => {
        swal.fire('Error', 'Ocurrió un error', 'error');
      }

    this.menuService.getMenu(this.id)
      .subscribe(menu => {
        this.menu = menu;
        this.menuOrder.menu = this.menu;
        this.providerService.getProvider(menu.idProvider)
          .subscribe(provider => {
            this.provider = provider;
            this.menu.provider = provider;
            this.menuOrder.idClient = this.idCliente;
          })
      });
  }

  purchase() {
    swal.fire({
      title: 'Compra de ' + this.menuOrder.menu.name,
      text: "Precio: $" + this.menuOrder.menu.price * this.menuOrder.quantity,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comprar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.clientService.createOrder(this.menuOrder)
          .subscribe(menuOrder => {
            console.log(menuOrder);
            this.router.navigate(['successfulPurchase/' + menuOrder.id])
          }),
          error => {
            console.log(error);
          }
      }
    })
  }




}
