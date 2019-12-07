import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../model/provider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeekDay } from '@angular/common';

import PlaceResult = google.maps.places.PlaceResult;
import swal from 'sweetalert2'
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {

  provider: Provider = new Provider();
  //dias = [WeekDay.Sunday, WeekDay.Monday, WeekDay.Tuesday, WeekDay.Wednesday, WeekDay.Thursday, WeekDay.Friday,  WeekDay.Saturday];
  dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
  constructor(private providerService: ProviderService, private router: Router) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', Validators.required);
  attentionTimeBegin = new FormControl('', Validators.required);
  attentionTimeEnd = new FormControl('', Validators.required);
  public logoSeleccionado: File;

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Campo obligatorio' :
        this.email.hasError('email') ? 'Formato de mail inválido' : '';
  }

  getPhoneErrorMessage() {
    return this.phone.hasError('required') ? 'Campo obligatorio' :
        this.phone.hasError('phone') ? 'Formato de teléfono inválido' : '';
  }

  ngOnInit() {
  }
  
  onAutocompleteSelected(result: PlaceResult) {
    this.provider.address = result.formatted_address;
  }


  gotoList() {
    this.router.navigate(['/providers']);
  }

  createProvider(): void {
    if (this.logoSeleccionado){
      this.providerService.createProvider(this.provider, this.logoSeleccionado)
      .subscribe(response => {
        // Una vez que crea el provider tiene que redirigirse al inicio (lista de providers)
        this.gotoList();
        swal.fire('Nuevo proveedor', `Proveedor creado con éxito!`, 'success')
      },
        // Como segundo parámetro suscribimos a un observador y manejamos cuando hay algún error:
        err => {
          let errores = err.error.errors as string[];
          swal.fire('Error', `${errores}`, 'error')
        }
      );
    }
    else {
      swal.fire('Error', 'Debe seleccionar un logo', 'error')
    }
  }

  seleccionarLogo(event){
    this.logoSeleccionado = event.target.files[0];

  }

  camposValidos(): boolean{
    return this.provider.address != undefined &&
           this.provider.address != "" &&
           this.logoSeleccionado != undefined
  }

 
}
  
