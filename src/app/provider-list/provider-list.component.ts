import { ProviderDetailsComponent } from './../provider-details/provider-details.component';
import { Observable } from "rxjs";
import { ProviderService } from "./../provider.service";
import { Provider } from "./../provider";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  providers: Observable<Provider[]>;

  constructor(private providerService: ProviderService, private router: Router, private route: ActivatedRoute, private _ngZone: NgZone) { }

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
    this.router.navigate(['details/' + id]);
  }

  updateProvider(id: number) {
    this.router.navigate(['update/' + id]);
  }

  providerCredit(id: number) {
    this.router.navigate(['credit/' + id])
  }

}