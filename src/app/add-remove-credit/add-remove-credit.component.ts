import { Component, OnInit } from '@angular/core';
import { Provider } from './../provider';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-add-remove-credit',
  templateUrl: './add-remove-credit.component.html',
  styleUrls: ['./add-remove-credit.component.css']
})
export class AddRemoveCreditComponent implements OnInit {

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

  updateCredit() {
    this.providerService.updateCredit(this.id, this.provider)
      .subscribe(data => this.gotoList(), error => console.log(error));
  }

  onSubmit() {
    this.updateCredit();
  }

  gotoList() {
    this.router.navigate(['/providers']);
  }

}
