import { Component, OnInit } from '@angular/core';
import { ProviderService } from './provider.service';
import { Provider } from './provider';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  providers: Provider[];

  constructor(private providerService: ProviderService) { }

  ngOnInit() {
    this.providerService.getProviders()
      .subscribe(response => {
      this.providers = response as Provider[];
    })
  }

}
