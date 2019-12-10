import { Component, OnInit } from '@angular/core';
import { Menu } from './../../model/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {

  categorias: string[] = ["Pizza","Cerveza","Hamburguesa","Sushi","Empanadas","Green","Vegano"]; // TODO: CAMBIAR!
  menu: Menu = new Menu();

  constructor(private route: ActivatedRoute, private router: Router, private menuService: MenuService) { }

  ngOnInit() {
    this.cargarMenu()
  }

  cargarMenu(): void {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.menuService.getMenu(id)
      .subscribe((menu) => {
      this.menu = menu;
      },
      error => {
        swal.fire('Error', error.error.message, 'error');
        this.gotoList();
      });
    }
  }

  updateMenu() {
    this.menuService.updateMenu(this.menu.id, this.menu)
    .subscribe(menu => {
      this.gotoList();
      swal.fire('Menú Actualizado', `Menú actualizado con éxito!`, 'success')
    },
      err => {
        swal.fire('Error', 'Ocurrió un error actualizando el menú', 'error');
      }
    )
  }

  gotoList() {
    this.router.navigate(['/menus']);
  }

}
