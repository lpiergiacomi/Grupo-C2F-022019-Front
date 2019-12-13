import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import {  ModalComponent } from '../modals/modal.component';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {

  title = 'iandasYa';
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private translate: TranslateService, public modal: ModalComponent) {
    translate.setDefaultLang('es');
    translate.use('es');
  }

   setLanguage(language: string) {
    this.translate.use(language);
  }

  isProvider() {
    return this.storage.get('providerId') != null;
  }

  isClient() {
    return this.storage.get('clientId') != null;
  }

}