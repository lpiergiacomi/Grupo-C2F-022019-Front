import {Component, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit{
  displayedColumns = ['name', 'description', 'categories', 'deliveryPrice', 'validityDateBegin', 'validityDateEnd', 'deliveryTimeAverage', 'price', 'minQuantity', 'minQuantityPrice', 'minQuantity2', 'minQuantityPrice2', 'maxSalesPerDay','action'];
  dataSource: MatTableDataSource<Menu>;
  menus: Array<Menu>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
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
    this.menuService.getMenusList().subscribe(data => {
      this.menus = [];
      data.forEach((x) => {
        this.menus.push(x);
      });
      this.loadDataSource();
    }, error => {});

  }

  loadDataSource(){
    this.dataSource = new MatTableDataSource(this.menus);
      this.dataSource.paginator = this.paginator;
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

