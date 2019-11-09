import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from '../provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Provider } from 'src/model/provider';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.css']
})
export class ProviderDetailsComponent implements OnInit {

  id: number;
  provider: Provider;

  constructor(private route: ActivatedRoute, private router: Router, private providerService: ProviderService) { }

  ngOnInit() {
    this.provider = new Provider();

    this.id = this.route.snapshot.params['id'];

    this.providerService.getProvider(this.id)
      .subscribe(data => {
        this.provider = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['providers']);
  }

}
