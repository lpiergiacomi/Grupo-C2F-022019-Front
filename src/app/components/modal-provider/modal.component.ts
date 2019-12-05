import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Client } from 'src/app/model/client';
import PlaceResult = google.maps.places.PlaceResult;
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';


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
  constructor() {}

  prueba() {
    console.log("Iniciaste sesion como proveedor");
  }

  prueba2() {
    console.log("Te registraste como proveedor");
  }
}

@Component({
  selector: 'app-modal-client-dialog',
  templateUrl: './modal-client-dialog.component.html',
})
export class ModalClientDialog {
  constructor(public dialog: MatDialog) {}

  prueba() {
    console.log("Iniciaste sesion como cliente");
  }

  prueba2() {
    console.log("Te registraste como cliente");
    this.dialog.closeAll();
    this.dialog.open(ModalSignUpClientDialog);

  }

}

@Component({
  selector: 'app-modal-signUp-client-dialog',
  templateUrl: './modal-signUp-client-dialog.component.html',
})
export class ModalSignUpClientDialog {
  constructor(public auth: AuthService, public dialog: MatDialog) {}



  
  googleSignUp() {
    console.log("Google");
    this.auth.login();
  }

  otherSignUp() {
    this.dialog.closeAll();
    this.dialog.open(ModalSignUpOtherAccountClientDialog)
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
    telephone : new FormControl('', Validators.required),
    locality : new FormControl('', Validators.required)
  })

  onAutocompleteSelected(result: PlaceResult) {
    this.clientAddres = result.formatted_address;
  }

  signUpClient() {
    this.dialog.closeAll();
    let formData = Object.assign({});
    formData = Object.assign(formData, this.clientRegisterForm.value);
    this.client = new Client(formData.firstName, formData.lastName, formData.mail, formData.telephone, formData.locality, this.clientAddres);
    this.client.type = 'Client';
    this.clientService.createClient(this.client).subscribe(data => console.log(data), error => console.log(error))
  }

}





