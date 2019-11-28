import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TranslateService } from '@ngx-translate/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'iandasYa';
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(private translate: TranslateService, public auth: AuthService) {
    translate.setDefaultLang('es');
    translate.use('es');
  }

  ngOnInit() {
    this.auth.localAuthSetup();
    this.auth.handleAuthCallback();
  }
 
  setLanguage(language: string) {
    this.translate.use(language);
  }

}