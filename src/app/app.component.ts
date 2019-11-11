import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'iandasYa';

  constructor(private translate: TranslateService, private spinnerService: NgxSpinnerService) {
    translate.setDefaultLang('es');
    translate.use('es');
  }

  ngOnInit(): void {
    this.showSpinner();
  }

  showSpinner(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }
 
  setLanguage(language: string) {
    this.translate.use(language);
  }
  
}
