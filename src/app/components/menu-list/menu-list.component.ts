import {Component, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu';
import Swal from 'sweetalert2';
import { ProviderService } from 'src/app/services/provider.service';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit{
  //displayedColumns = ['name', 'description', 'price', 'minQuantity', 'minQuantityPrice', 'minQuantity2', 'minQuantityPrice2', 'reputationProvider', 'addressProvider', 'nameProvider', 'action'];
  displayedColumns = ['name', 'description', 'price', 'minQuantity', 'minQuantityPrice', 'minQuantity2', 'minQuantityPrice2', 'action'];
  dataSource: MatTableDataSource<Menu>;
  menus: Array<Menu>;
  paginador: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog){}

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
    this.route.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page){ page = 0 }
      this.menuService.getMenusList(page).subscribe(response => {
        (response.content as Menu[]).forEach((x) => {
          this.menus = response.content;
          this.paginador = response;
        });
        this.loadDataSource();
      }, error => {});
    });
  }

  loadDataSource(){
    this.dataSource = new MatTableDataSource(this.menus);
      this.dataSource.sort = this.sort;
  }

  deleteMenu(id: number) {
    Swal.fire({
      title: 'Eliminar menú',
      text: "Una vez eliminado no se puede volver atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.menuService.deleteMenu(id)
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

  menuDetails(id: number) {
    this.router.navigate(['detailsMenu/' + id]);
  }

  updateMenu(id: number) {
    this.router.navigate(['updateMenu/' + id]);
  }
}

