import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
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
  constructor(public dialog: MatDialog, public auth: AuthService, public modalProvider: ModalProviderDialog, public modalClient: ModalClientDialog) {}

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
  constructor(public dialog: MatDialog) {}

  openLogInProviderDialog() {
    this.dialog.closeAll();
    this.dialog.open(ModalLogInProviderDialog)
    console.log("Iniciaste sesion como proveedor");
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
  //dias = [WeekDay.Sunday, WeekDay.Monday, WeekDay.Tuesday, WeekDay.Wednesday, WeekDay.Thursday, WeekDay.Friday,  WeekDay.Saturday];
  dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
  constructor(private providerService: ProviderService, private router: Router) { }
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
    if (this.logoSeleccionado){
      this.providerService.createProvider(this.provider, this.logoSeleccionado)
      .subscribe(response => {
        // Una vez que crea el provider tiene que redirigirse al inicio (lista de providers)
        this.gotoList();
        swal.fire('Nuevo proveedor', `Proveedor creado con éxito!`, 'success')
      },
        // Como segundo parámetro suscribimos a un observador y manejamos cuando hay algún error:
        err => {
          let errores = err.error.errors as string[];
          swal.fire('Error', `${errores}`, 'error')
        }
      );
    }
    else {
      swal.fire('Error', 'Debe seleccionar un logo', 'error')
    }
  }

  seleccionarLogo(event){
    this.logoSeleccionado = event.target.files[0];

  }

  camposValidos(): boolean{
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
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, public dialog: MatDialog, public providerService: ProviderService) {}

  providerLoginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  logInProvider() {
    this.dialog.closeAll();
    let formData = Object.assign({});
    formData = Object.assign(formData, this.providerLoginForm.value);
    
    formData.password = CryptoJS.AES.encrypt(formData.password.trim(), "ViandasYa".trim()).toString();
    console.log(formData);

    this.providerService.getProviderByMail(formData.email)
    .subscribe(data => {
      this.storage.set(PROVIDER_ID, data.id), 
      catchError => swal.fire('Error', 'No existe un proveedor con ese mail registrado', 'error');
    })

  }

}

@Component({
  selector: 'app-modal-client-dialog',
  templateUrl: './modal-client-dialog.component.html',
})
export class ModalClientDialog {
  constructor(public auth: AuthService, public dialog: MatDialog) {}

  openLogInClientDialog() {
    this.dialog.closeAll();
    this.dialog.open(ModalLogInClientDialog);
  }

  openSignUpClientDialog() {
    this.dialog.closeAll();
    this.dialog.open(ModalSignUpClientDialog);
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

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, public auth: AuthService, public dialog: MatDialog, public clientService: ClientService) {}


  logInClient() {
    this.dialog.closeAll();
  
    console.log(this.client.password);
    console.log(this.client.password.trim());

    this.client.password = CryptoJS.SHA256.encrypt(this.client.password.trim(), "ViandasYa".trim()).toString();
    //console.log(this.client.password);

    this.clientService.getClientByMail(this.client.mail)
    .subscribe(data => {
      if (data.mensaje == 'ok'){
        if (data.client.password == this.client.password){
          this.storage.set(CLIENT_ID, data.id);
        }
        else {
          swal.fire('Error', 'Datos incorrectos', 'error');
        }
      }
      else {
        swal.fire('Error', 'No existe un usuario con ese mail registrado', 'error');
      }
      console.log(data);
      
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
  constructor(public dialog: MatDialog) {}

  otherSignUp() {
    this.dialog.closeAll();
    this.dialog.open(ModalSignUpOtherAccountClientDialog);
  }
}

@Component({
  selector: 'app-modal-signUp-other-account-client-dialog',
  templateUrl: './modal-signUp-other-account-client-dialog.component.html',
})
export class ModalSignUpOtherAccountClientDialog {

  client;
  clientAddres;
  constructor(public dialog: MatDialog, public router: Router, public clientService: ClientService) {}

  clientRegisterForm = new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    mail : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    telephone : new FormControl('', Validators.required),
    locality : new FormControl('', Validators.required)
  })

  onAutocompleteSelected(result: PlaceResult) {
    this.clientAddres = result.formatted_address;
  }

  signUpClient(conversion: string) {
    this.dialog.closeAll();
    let formData = Object.assign({});
    formData = Object.assign(formData, this.clientRegisterForm.value);

    formData.password = CryptoJS.SHA256.encrypt(formData.password.trim(), "ViandasYa".trim()).toString();
    
    this.client = new Client();
    this.client.firstName = formData.firstName;
    this.client.lastName = formData.lastName;
    this.client.mail = formData.mail;
    this.client.password = formData.password;
    this.client.telephone = formData.telephone;
    this.client.locality = formData.locality;
    this.client.clientAddres = formData.clientAddres;

    this.client.type = 'Client';
    this.clientService.createClient(this.client).subscribe(data => console.log(data), error => {
      swal.fire("Email repetido", "El email " + this.client.mail + " ya fue registrado previamente.", 'error');
      console.log(this.client);
      console.log(formData);
      console.log(error);
    })
  }

}





