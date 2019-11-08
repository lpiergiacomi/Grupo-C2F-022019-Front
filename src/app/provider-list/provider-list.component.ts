import { ProviderDetailsComponent } from './../provider-details/provider-details.component';
import { Observable, Subject } from "rxjs";
import { ProviderService } from "./../provider.service";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from 'src/model/provider';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';





@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  providers: Provider[];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};




  constructor(private providerService: ProviderService, private router: Router) { }
  

  ngOnInit() {
    this.getProviders(); 
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    language: {
      zeroRecords: "No existen proveedores"
    }
    };
  }

  getProviders(){
    this.providerService.getProvidersList()
      .subscribe(response =>{ 
        this.providers = response; 
        this.dtTrigger.next();
        error => console.log(error)
      },
    )     
  }

  
  deleteProvider(id: number) {
    Swal.fire({
      title: 'Eliminar proveedor',
      text: "Una vez eliminado no se puede volver atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.providerService.deleteProvider(id)
        .subscribe(
          data => {
            this.getProviders();
            Swal.fire(
              'Eliminado',
              'El proveedor fue eliminado correctamente.',
              'success'
            )
      },
      error => console.log(error));
      }
    })
    
  }

  providerDetails(id: number) {
    this.router.navigate(['detailsProvider/' + id]);
  }

  updateProvider(id: number) {
    this.router.navigate(['updateProvider/' + id]);
  }

  providerCredit(id: number) {
    this.router.navigate(['credit/' + id])
  }

  providerMenus(id: number) {
    this.router.navigate(['providersMenus/' + id])
  }

}