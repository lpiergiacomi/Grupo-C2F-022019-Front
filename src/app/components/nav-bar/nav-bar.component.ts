import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../modals/modal.component';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { Client } from 'src/app/model/client';
import { Provider } from 'src/app/model/provider';
import { ClientService } from 'src/app/services/client.service';
import { ProviderService } from 'src/app/services/provider.service';

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
  client = new Client();
  provider = new Provider();
  clientId: number;
  providerId: number;
  logoProveedor;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private clientService: ClientService, private providerService: ProviderService, private translate: TranslateService, public modal: ModalComponent) {
    translate.setDefaultLang('es');
    translate.use('es');
  }

  ngOnInit(): void {
    this.clientId = this.storage.get('clientId')
    this.providerId = this.storage.get('providerId')
    this.isClient() ? this.cargarCliente() : this.cargarProveedor();

  }

  setLanguage(language: string) {
    this.translate.use(language);
  }

  isProvider() {
    return this.providerId != null;
  }

  isClient() {
    return this.clientId != null;
  }

  cargarCliente() {
    this.clientService.getClientById(this.clientId)
      .subscribe(response => {
        this.client = response.client;
      }),
      error => this.client = null;
  }

  cargarProveedor() {
    this.providerService.getProvider(this.providerId)
      .subscribe(response => {
        this.provider = response;
      }),
      error => this.provider = null;
  }

  infoCliente() {
    alert(this.client.firstName)
  }

  infoProveedor() {
    alert(this.provider.name)
  }

  logout(){
    this.storage.remove('clientId');
    this.storage.remove('providerId');
    window.location.reload();
  }
}