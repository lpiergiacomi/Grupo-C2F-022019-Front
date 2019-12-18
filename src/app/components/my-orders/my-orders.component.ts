import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { MenuOrder } from 'src/app/model/menuorder';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MenuOrderService } from 'src/app/services/menuorder.service';
import { ClientService } from 'src/app/services/client.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})

export class MyOrdersComponent implements OnInit {
  displayedColumns = ['deliveryDate', 'menuName', 'qualification', 'menuPrice'];
  dataSource: MatTableDataSource<MenuOrder>;
  menuOrder: MenuOrder = new MenuOrder();
  menuOrders: Array<MenuOrder>;
  paginador: any;
  idClient: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private clientService: ClientService, private menuOrderService: MenuOrderService, private router: Router, private menuService: MenuService, private route: ActivatedRoute, public dialog: MatDialog, private translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('es');
   }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.idClient = this.storage.get('clientId');
    this.route.params.subscribe(val => {
      this.reloadData();
    });
  }

  reloadData() {
    this.menuOrderService.getMenuOrdersByIdClient(this.idClient).subscribe(data => {
      this.menuOrders = data;
      this.loadDataSource();
    }, error => { console.log(error) });

  }

  loadDataSource() {
    this.dataSource = new MatTableDataSource(this.menuOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getLanguage(){
    return this.translate.currentLang;
  }


}

