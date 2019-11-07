import { Observable } from "rxjs";
import { MenuService } from "./../menu.service";
import { Menu } from "./../menu";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menus: Observable<Menu[]>;

  constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
        this.reloadData();
    });
  }

  reloadData() {
    this.menus = this.menuService.getMenusList();
  }

  deleteMenu(id: number) {
    this.menuService.deleteMenu(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }

  menuDetails(id: number) {
    this.router.navigate(['detailsMenu/' + id]);
  }

  updateMenu(id: number) {
    this.router.navigate(['updateMenu/' + id]);
  }

}