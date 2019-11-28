import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'iandasYa';

  constructor(private translate: TranslateService, private auth: AuthService) {
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
