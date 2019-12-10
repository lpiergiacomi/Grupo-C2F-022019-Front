import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { ModalProviderDialog, ModalComponent } from '../modals/modal.component';

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

  constructor(private translate: TranslateService, public modal: ModalComponent) {
    translate.setDefaultLang('es');
    translate.use('es');
  }

   setLanguage(language: string) {
    this.translate.use(language);
  }

}