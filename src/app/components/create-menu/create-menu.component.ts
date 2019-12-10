import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';



@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  categorias: string[] = ["Pizza","Cerveza","Hamburguesa","Sushi","Empanadas","Green","Vegano"]; // TODO: CAMBIAR!

  menu: Menu = new Menu();
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private providerService: ProviderService, private menuService: MenuService, private router: Router) { }



  ngOnInit() {
  }

  gotoList() {
    this.router.navigate(['/menus']);
  }

  createMenu(): void {
    this.providerService.getProvider(this.storage.get('providerId'))
    .subscribe(provider => {
      this.menu.provider = provider;
      this.menuService.createMenu(this.menu)
      .subscribe(menu => {
        // Una vez que crea el menu tiene que redirigirse al inicio (lista de menus)
        this.gotoList();
        swal.fire('Nuevo menú', `Menú ${menu.name} creado con éxito!`, 'success')
      },
        // Como segundo parámetro suscribimos a un observador y manejamos cuando hay algún error:
        err => {
          let errores = err.error.errors as string[];
          swal.fire('Error', `${errores}`, 'error')
        }
      );
    }, err => {
        let errores = err.error.errors as string[];
        swal.fire('Error', `${errores}`, 'error')
    })
  }


}