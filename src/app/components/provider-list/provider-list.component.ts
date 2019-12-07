import { ProviderService } from "../../services/provider.service";
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Provider } from 'src/app/model/provider';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  provider: Provider = new Provider();
  displayedColumns = ['logo', 'name', 'locality', 'address', 'description', 'site', 'mail', 'phone', 'attentionTimeBegin', 'attentionTimeEnd', 'attentionDayBegin', 'attentionDayEnd', 'deliveryLocalities','action'];
  dataSource: MatTableDataSource<Provider>;
  providers: Array<Provider>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private providerService: ProviderService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.reloadData();
    }); 
  }

  reloadData() {
    this.providerService.getProvidersList().subscribe(data => {
      this.providers = [];
      data.forEach((x) => {
        this.providers.push(x);
      });
      this.loadDataSource();
    }, error => {});

  }

  loadDataSource(){
    this.dataSource = new MatTableDataSource(this.providers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
            this.reloadData();
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

  purchase(id: number) {
    this.router.navigate(['purchase/' + id])
  }
}