import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/model/provider';
import { MenuOrder } from 'src/app/model/menuorder';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from "./../../services/provider.service";
import { ClientService } from 'src/app/services/client.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { Client } from 'src/app/model/client';
import { StarRatingComponent } from 'ng-starrating';
import { MenuOrderService } from 'src/app/services/menuorder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-successful-purchase',
  templateUrl: './successful-purchase.component.html',
  styleUrls: ['./successful-purchase.component.css']
})
export class SuccessfulPurchaseComponent implements OnInit {

  idMenuOrder: number;
  menuOrder: MenuOrder;
  client: Client;
  provider: Provider;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private route: ActivatedRoute, private router: Router, private menuOrderService: MenuOrderService, private providerService: ProviderService, private clientService: ClientService) { }

  ngOnInit() {
    this.idMenuOrder = this.route.snapshot.params['id'];
    this.menuOrderService.getMenuOrderById(this.idMenuOrder)
      .subscribe(menuOrder => {
        this.menuOrder = menuOrder;
        this.clientService.getClientById(menuOrder.idClient)
          .subscribe(data => this.client = data.client);
        this.providerService.getProvider(menuOrder.menu.idProvider)
          .subscribe(provider => this.provider = provider);
      })
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    let menuOrder = new MenuOrder();
    menuOrder.qualification = $event.newValue;
    this.menuOrderService.rateMenuOrder(this.menuOrder.id, menuOrder)
      .subscribe(data => {
        Swal.fire('Puntuación', 'Gracias por puntuar este menú!', 'success');
          this.router.navigate(['myOrders/'])
      });
  }

}
