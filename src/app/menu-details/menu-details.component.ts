import { Menu } from '../menu';
import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {

  id: number;
  menu: Menu;

  constructor(private route: ActivatedRoute, private router: Router, private menuService: MenuService) { }

  ngOnInit() {
    this.menu = new Menu();

    this.id = this.route.snapshot.params['id'];

    this.menuService.getMenu(this.id)
      .subscribe(data => {
        console.log(data)
        this.menu = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['menus']);
  }

}
