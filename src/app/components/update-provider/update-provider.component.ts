import { Component, OnInit } from '@angular/core';
import { Provider } from '../../model/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import PlaceResult = google.maps.places.PlaceResult;

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
      this.provider = data;
    }, error => console.log(error));
  }

  updateProvider() {
    this.providerService.updateProvider(this.id, this.provider)
      .subscribe(data => this.gotoList(), error => console.log(error));
  }

  onSubmit() {
    this.updateProvider();
  }

  gotoList() {
    this.router.navigate(['/providers']);
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.provider.address = result.formatted_address;
  }

}
