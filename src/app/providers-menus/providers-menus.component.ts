import { Observable } from "rxjs";
import { ProviderService } from "./../provider.service";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Menu } from "./../menu";
import { Provider } from '../provider';


@Component({
  selector: 'app-providers-menus',
  templateUrl: './providers-menus.component.html',
  styleUrls: ['./providers-menus.component.css']
})
export class ProvidersMenusComponent implements OnInit {

  id: number;
  menus: Array<Menu>;
  public searchString: string;
  provider: Provider;

  constructor(private providerService: ProviderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.provider = new Provider();

    this.id = this.route.snapshot.params['id'];

    this.route.params.subscribe(val => {
        this.reloadData();
    });

    this.providerService.getProvider(this.id).subscribe(data => {
      this.provider = data;
    });
    console.log(this.provider);
  }

  reloadData() {
    this.providerService.getProvidersMenus(this.id).subscribe(data => {
      this.menus = [];
      data.forEach((x) => {
        this.menus.push(x);
      });

    }, error => {});
    console.log(this.menus);
  }

  menuDetails(id: number) {
    this.router.navigate(['detailsMenu/' + id]);
  }

  updateMenu(id: number) {
    this.router.navigate(['updateMenu/' + id]);
  }

}
