import { Observable } from "rxjs";
import { ProviderService } from "./../provider.service";
import { Provider } from "./../provider";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  providers: Observable<Provider[]>;

  constructor(private providerService: ProviderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
        this.reloadData();
    });
  }

  reloadData() {
    this.providers = this.providerService.getProvidersList();
  }

  deleteProvider(id: number) {
    this.providerService.deleteProvider(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }

  providerDetails(id: number) {
    this.router.navigate(['detailsProvider/' + id]);
  }

  updateProvider(id: number) {
    this.router.navigate(['updateProvider/' + id]);
  }

  providerCredit(id: number) {
    this.router.navigate(['credit/' + id])
  }

  providerMenus(id: number) {
    this.router.navigate(['providersMenus/' + id])
  }

}