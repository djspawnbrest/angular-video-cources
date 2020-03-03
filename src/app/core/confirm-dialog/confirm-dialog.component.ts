import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import {
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

}
