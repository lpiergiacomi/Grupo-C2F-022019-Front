import { ProviderService } from '../provider.service';
import { Provider } from '../provider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {

  provider: Provider = new Provider();
  submitted = false;

  constructor(private providerService: ProviderService,
    private router: Router) { }

  ngOnInit() {
  }

  newProvider(): void {
    this.submitted = false;
    this.provider = new Provider();
  }

  save() {
    this.providerService.createProvider(this.provider)
      .subscribe(data => console.log(data), error => console.log(error));
    this.provider = new Provider();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/providers']);
  }
}
