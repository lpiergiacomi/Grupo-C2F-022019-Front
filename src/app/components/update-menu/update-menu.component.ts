import { Component, OnInit } from '@angular/core';
import { Menu } from './../../model/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {

  id: number;
  menu: Menu;

  constructor(private route: ActivatedRoute, private router: Router, private menuService: MenuService) { }

  ngOnInit() {
    this.menu = new Menu();

    this.id = this.route.snapshot.params['id'];

    this.menuService.getMenu(this.id)
    .subscribe(data => {
      this.menu = data;
    }, error => console.log(error));
  }

  updateMenu() {
    this.menuService.updateMenu(this.id, this.menu)
      .subscribe(data => this.gotoList(), error => console.log(error));
  }

  onSubmit() {
    this.updateMenu();
  }

  gotoList() {
    this.router.navigate(['/menus']);
  }

}
