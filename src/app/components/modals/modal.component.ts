import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Client } from 'src/app/model/client';
import PlaceResult = google.maps.places.PlaceResult;
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import * as CryptoJS from 'crypto-js';
import { ProviderService } from 'src/app/services/provider.service';
import { Provider } from 'src/app/model/provider';
import swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';


@Component({
  selector: 'app-modal-provider',
  templateUrl: './modal-provider.component.html',
  styleUrls: ['./modal-provider.component.css']
})
export class ModalComponent implements OnInit {
  constructor(public dialog: MatDialog, public auth: AuthService, public modalProvider: ModalProviderDialog, public modalClient: ModalClientDialog) { }

  ngOnInit() {
    this.auth.localAuthSetup();
    this.auth.handleAuthCallback();
  }

  openDialogProvider() {
    const dialogRef = this.dialog.open(ModalProviderDialog);
  }

  openDialogClient() {
    const dialogRef = this.dialog.open(ModalClientDialog);
  }
}

@Component({
  selector: 'app-modal-provider-dialog',
  templateUrl: './modal-provider-dialog.component.html',
})
export class ModalProviderDialog {
  constructor(public dialog: MatDialog) { }

  openLogInProviderDialog() {
    this.dialog.closeAll();
    this.dialog.open(ModalLogInProviderDialog)
  }

  openSignUpProviderDialog() {
    this.dialog.closeAll();
    this.dialog.open(ModalSignUpProviderDialog)
  }
}

@Component({
  selector: 'app-modal-signUp-provider-dialog',
  templateUrl: './modal-signUp-provider-dialog.component.html',
  styleUrls: ['./modal-signUp-provider-dialog.component.css']
})
export class ModalSignUpProviderDialog {
  provider: Provider = new Provider();
  dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  constructor(private providerService: ProviderService, private router: Router, public dialog: MatDialog) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', Validators.required);
  attentionTimeBegin = new FormControl('', Validators.required);
  attentionTimeEnd = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  public logoSeleccionado: File;

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Campo obligatorio' :
      this.email.hasError('email') ? 'Formato de mail inválido' : '';
  }

  getPhoneErrorMessage() {
    return this.phone.hasError('required') ? 'Campo obligatorio' :
      this.phone.hasError('phone') ? 'Formato de teléfono inválido' : '';
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.provider.address = result.formatted_address;
  }


  gotoList() {
    this.router.navigate(['/providers']);
  }

  createProvider(): void {
    if (this.logoSeleccionado) {
      this.provider.password = this.provider.password + this.provider.mail + 'ViandasYa';
      this.providerService.createProvider(this.provider, this.logoSeleccionado)
        .subscribe(response => {
          swal.fire('Nuevo proveedor', `Proveedor creado con éxito!`, 'success')
          this.dialog.closeAll();
          this.dialog.open(ModalLogInProviderDialog)
        },
          err => {
            console.log(err);
            swal.fire("Email repetido", "El email " + this.provider.mail + " ya fue registrado previamente.", 'error');
          }
        );
    }
    else {
      swal.fire('Error', 'Debe seleccionar un logo', 'error')
    }
  }

  seleccionarLogo(event) {
    this.logoSeleccionado = event.target.files[0];

  }

  camposValidos(): boolean {
    return this.provider.address != undefined &&
      this.provider.address != "" &&
      this.logoSeleccionado != undefined
  }


}

const PROVIDER_ID = 'providerId'

@Component({
  selector: 'app-modal-logIn-provider-dialog',
  templateUrl: './modal-logIn-provider-dialog.component.html',
  styleUrls: ['./modal-logIn-provider-dialog.component.css']
})
export class ModalLogInProviderDialog {

  provider: Provider = new Provider();

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, public dialog: MatDialog, public providerService: ProviderService) { }

  logInProvider() {

    this.provider.password = this.provider.password + this.provider.mail + 'ViandasYa';

    this.providerService.getProviderByMail(this.provider.mail)
      .subscribe(data => {
        if (data.mensaje == 'ok') {
          if (data.provider.password == this.provider.password) {
            this.storage.set(PROVIDER_ID, data.provider.id);
            this.dialog.closeAll();
            window.location.reload();
          }
          else {
            this.provider.password = "";
            swal.fire('Error', 'Datos incorrectos', 'error');
          }
        }
        else {
          this.provider.password = "";
          swal.fire('Error', 'No existe un proveedor con ese mail registrado', 'error');
        }
      }), catchError => swal.fire('Error', 'Hubo un problema. Volvé a intentarlo más tarde', 'error');
  }

}

@Component({
  selector: 'app-modal-client-dialog',
  templateUrl: './modal-client-dialog.component.html',
})
export class ModalClientDialog {
  constructor(public auth: AuthService, public dialog: MatDialog) { }

  openLogInClientDialog() {
    this.dialog.closeAll();
    this.dialog.open(ModalLogInClientDialog);
  }

  openSignUpClientDialog() {
    this.dialog.closeAll();
    this.dialog.open(ModalSignUpOtherAccountClientDialog);
  }

  googleSignUp() {
    this.auth.login();
  }

}

const CLIENT_ID = 'clientId';

@Component({
  selector: 'app-modal-logIn-client-dialog',
  templateUrl: './modal-logIn-client-dialog.component.html',
  styleUrls: ['./modal-logIn-client-dialog.component.css']

})

export class ModalLogInClientDialog {

  client: Client = new Client();

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, public auth: AuthService, public dialog: MatDialog, public clientService: ClientService) { }


  logInClient() {

    this.client.password = this.client.password + this.client.mail + 'ViandasYa';

    this.clientService.getClientByMail(this.client.mail)
      .subscribe(data => {
        if (data.mensaje == 'ok') {
          if (data.client.password == this.client.password) {
            this.storage.set(CLIENT_ID, data.client.id);
            this.dialog.closeAll();
            window.location.reload();

          }
          else {
            swal.fire('Error', 'Datos incorrectos', 'error');
            this.client.password = "";
          }
        }
        else {
          swal.fire('Error', 'No existe un usuario con ese mail registrado', 'error');
          this.client.password = "";

        }
      }), catchError => swal.fire('Error', 'Hubo un problema. Volvé a intentarlo más tarde', 'error');


  }

  googleLogIn() {
    this.auth.login();
  }

  otherLogIn() {
    this.dialog.closeAll();
  }

}

@Component({
  selector: 'app-modal-signUp-client-dialog',
  templateUrl: './modal-signUp-client-dialog.component.html',
})
export class ModalSignUpClientDialog {
  constructor(public dialog: MatDialog) { }

  otherSignUp() {
    this.dialog.closeAll();
    this.dialog.open(ModalSignUpOtherAccountClientDialog);
  }
}

@Component({
  selector: 'app-modal-signUp-other-account-client-dialog',
  templateUrl: './modal-signUp-other-account-client-dialog.component.html',
  styleUrls: ['./modal-signUp-other-account-client-dialog.component.css'],
})
export class ModalSignUpOtherAccountClientDialog {

  client: Client = new Client();
  //clientAddres;
  constructor(public dialog: MatDialog, public router: Router, public clientService: ClientService) { }

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  mail = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  locality = new FormControl('', Validators.required);

  getEmailErrorMessage() {
    return this.mail.hasError('required') ? 'Campo obligatorio' :
      this.mail.hasError('email') ? 'Formato de mail inválido' : '';
  }

  getPhoneErrorMessage() {
    return this.phone.hasError('required') ? 'Campo obligatorio' :
      this.phone.hasError('phone') ? 'Formato de teléfono inválido' : '';
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.client.address = result.formatted_address;
  }

  signUpClient() {

    this.client.password = this.client.password + this.client.mail + 'ViandasYa';

    this.clientService.createClient(this.client)
      .subscribe(data => {
        swal.fire("Registro exitoso", "Ya podes iniciar sesión y utilizar nuestros servicios", "success")
        this.dialog.closeAll();
        this.dialog.open(ModalLogInClientDialog)
      }),
      error => {
        swal.fire("Error", "Ocurrió un error, intentá de nuevo en unos instantes", 'error');
      }
  }

  camposValidos(): boolean {
    return this.client.address != undefined &&
      this.client.address != ""
  }

}





