import { ProviderService } from '../provider.service';
import { Provider } from '../../model/provider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {

  provider: Provider = new Provider();
  constructor(private providerService: ProviderService, private router: Router) { }

  ngOnInit() {
  }
  
  onSubmit() {
    this.save();    
  }
  
  gotoList() {
    this.router.navigate(['/providers']);
  }

  save() {
    this.providerService.createProvider(this.provider)
      .subscribe(data => this.gotoList(), error => console.log(error));
  }

}
  
