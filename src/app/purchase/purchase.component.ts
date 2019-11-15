import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/model/provider';
import { MenuOrder } from 'src/model/menuorder';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from "./../provider.service";
import { Menu } from './../menu';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  purchaseForm: FormGroup;
  id: number;
  menus: Menu[];
  providerName: string;
  private menuOrder: MenuOrder = new MenuOrder(new Menu, 0);

  constructor(private route: ActivatedRoute, private providerService: ProviderService, private router: Router,
    private formBuilder: FormBuilder) {
      this.purchaseForm = this.formBuilder.group({
        menu: new FormControl(new Menu),
        quantity: new FormControl(0)
      })
    }

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

  addMenuOrder() {
    console.log('submit');
    let formData = Object.assign({});
    formData = Object.assign(formData, this.purchaseForm.value);
    this.menuOrder = new MenuOrder(formData.menu ,formData.quantity );
    console.log(this.menuOrder instanceof MenuOrder);
    console.log(this.menuOrder);
  }

  onSubmit() {
    this.router.navigate(['/successfulPurchase']);  
  }

}
