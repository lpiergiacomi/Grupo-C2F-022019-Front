import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/model/provider';
import { MenuOrder } from 'src/model/menuorder';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from "./../provider.service";
import { Menu } from './../menu';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import * as moment from 'moment';
moment.locale('es');


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  id: number;
  menus: Menu[];
  providerName: string;
  private menuOrder: MenuOrder = new MenuOrder(new Menu, 0);
  locale = {
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek(),
    applyLabel: 'ok',
   };
  deliveryTypes = ['A domicilio', 'Retiro en local']

  constructor(private route: ActivatedRoute, private providerService: ProviderService, private router: Router){}

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
    
    this.providerService.getProvider(this.id)
      .subscribe(provider => {
        this.providerName = provider.name
      });


    this.providerService.getProvidersMenus(this.id)
      .subscribe(menus => {
        this.menus = menus as Menu[]
      });

  }

  purchaseInformation() {
    var menu = this.purchaseForm.get('menu').value;
    var deliveryTimeAverage = menu.deliveryTimeAverage;
    var preparationTime = menu.preparationTime;
    var deliveryType = this.purchaseForm.get('deliveryType').value;
    if (deliveryType == 'A domicilio') {
      var totalTime = (deliveryTimeAverage /60) + (preparationTime / 60);
      return 'El tiempo de espera es de aproximadamente ' + totalTime + ' minutos.';
    }
    if(deliveryType == 'Retiro en local') {
      var totalTime = preparationTime / 60;
      return 'El tiempo de espera para retirar es de aproximadamente ' + totalTime + ' minutos.'
    }
  }


  purchaseFormValid() {
    return !this.purchaseForm.invalid
  }

  
  addMenuOrder() {
    //console.log('submit');
    let formData = Object.assign({});
    formData = Object.assign(formData, this.purchaseForm.value);
    this.menuOrder = new MenuOrder(formData.menu ,formData.quantity);
    console.log(this.menuOrder instanceof MenuOrder);
    console.log(this.menuOrder);
    console.log(this.purchaseForm.get('menu').value);
  }
  
 

  onSubmit() {
    this.router.navigate(['/successfulPurchase']);  
  }

}
