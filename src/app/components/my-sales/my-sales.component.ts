import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { MenuOrder } from 'src/app/model/menuorder';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MenuOrderService } from 'src/app/services/menuorder.service';
import { TranslateService } from '@ngx-translate/core';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.css']
})

export class MySalesComponent implements OnInit {
  displayedColumns = ['deliveryDate', 'menuName', 'qualification', 'menuPrice', 'menuOrderPrice', 'deliveryType'];
  dataSource: MatTableDataSource<MenuOrder>;
  menuOrder: MenuOrder = new MenuOrder();
  menuOrders: Array<MenuOrder>;
  paginador: any;
  idProvider: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private providerService: ProviderService, private menuOrderService: MenuOrderService, private router: Router, private menuService: MenuService, private route: ActivatedRoute, public dialog: MatDialog, private translate: TranslateService) {
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
    this.idProvider = this.storage.get('providerId');
    this.route.params.subscribe(val => {
      this.reloadData();
    });
  }

  reloadData() {
    this.menuOrderService.getMenuOrdersByIdProvider(this.idProvider).subscribe(data => {
      console.log(data);
      this.menuOrders = data;
      this.loadDataSource();
    }, error => { console.log(error) });

  }

  loadDataSource() {
    this.dataSource = new MatTableDataSource(this.menuOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getLanguage() {
    return this.translate.currentLang;
  }

  getCurrencyFormat() {
    return '2.2-2';
  }

  getCurrency(){
    switch (this.translate.currentLang) {
      case 'es':
        return 'ARS'
      case 'en':
        return 'USD';
    }
  }

  getQualificationSpan(qualification){
    return qualification == 0 ? "Sin calificar" : qualification + "/5"
  }


}

