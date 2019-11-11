import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/model/provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from "./../provider.service";
import { Menu } from './../menu';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  id: number;
  menus: Menu[];
  providerName: string;

  constructor(private route: ActivatedRoute, private providerService: ProviderService, private router: Router) { }

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

  onSubmit() {
    this.router.navigate(['/successfulPurchase']);  
  }

}
