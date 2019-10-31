import { Component, OnInit } from '@angular/core';
import { Provider } from './../provider';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent implements OnInit {

  id: number;
  provider: Provider;

  constructor(private route: ActivatedRoute, private router: Router, private providerService: ProviderService) { }

  ngOnInit() {
    this.provider = new Provider();

    this.id = this.route.snapshot.params['id'];

    this.providerService.getProvider(this.id)
    .subscribe(data => {
      console.log(data)
      this.provider = data;
    }, error => console.log(error));
  }

  updateProvider() {
    this.providerService.updateProvider(this.id, this.provider)
      .subscribe(data => console.log(data), error => console.log(error));
    this.provider = new Provider();
    this.gotoList();
  }

  onSubmit() {
    this.updateProvider();    
  }

  gotoList() {
    this.router.navigate(['/providers']);
  }

}
