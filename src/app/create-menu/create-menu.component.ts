import { MenuService } from '../menu.service';
import { Menu } from '../menu';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  menu: Menu = new Menu();
  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit() {
  }
  
  onSubmit() {
    this.save();    
  }
  
  gotoList() {
    this.router.navigate(['/menus']);
  }

  save() {
    this.menuService.createMenu(this.menu)
      .subscribe(data => this.gotoList(), error => console.log(error));
  }

}