import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Provider } from 'src/app/model/provider';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { ProviderService } from 'src/app/services/provider.service';
 
declare var google: any;
 
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
 
interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.css']
})


export class ProviderDetailsComponent implements OnInit {

  id: number;
  provider: Provider;
  address: string;
  geoCoder:any;
  showMap: boolean;
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };
  @ViewChild(AgmMap, { read: true, static: false }) map: AgmMap;

  constructor(private route: ActivatedRoute, private router: Router, private providerService: ProviderService, public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper) { 
      this.mapsApiLoader = mapsApiLoader;
      this.zone = zone;
      this.wrapper = wrapper;
      this.mapsApiLoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder();
      });
  }

  ngOnInit() {

    this.provider = new Provider();

    this.id = this.route.snapshot.params['id'];

    this.providerService.getProvider(this.id)
      .subscribe(data => {
        this.provider = data,
        this.setCurrentLocation(this.provider.address);
      }, error => console.log(error));

    this.location.marker.draggable = true;
    
  }

  setCurrentLocation(address) {
    if (!this.geoCoder) this.geoCoder = new google.maps.Geocoder()
    this.geoCoder.geocode({'address': address},(results,status) => {
      if(status == 'OK') {
        this.location.lat = results[0].geometry.location.lat();
        this.location.lng = results[0].geometry.location.lng();
        this.location.marker.lat = results[0].geometry.location.lat();
        this.location.marker.lng = results[0].geometry.location.lng();
        this.location.marker.draggable = false;
        this.location.viewport = results[0].geometry.viewport;
        this.showMap = true;
      } else {
        alert("La direccion del proveedor " + this.provider.name + "no pudo ser localizada");
      }
    });
  }

  list() {
    this.router.navigate(['providers']);
  }

}