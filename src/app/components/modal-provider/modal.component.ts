import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

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

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogClient() {
    const dialogRef = this.dialog.open(ModalClientDialog);

    dialogRef.afterClosed().subscribe(result => {
    });
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
  constructor() {}

  prueba() {
    console.log("Iniciaste sesion como cliente");
  }

  prueba2() {
    console.log("Te registraste como cliente");
  }
}





