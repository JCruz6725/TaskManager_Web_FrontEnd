import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogData } from '../../Models/confirm-dialog';

@Component({
  selector: 'app-verify-dialog',
  imports: [MatDialogModule, MatDialogContent, MatButtonModule],
  templateUrl: './verify-dialog.html',
  styleUrl: './verify-dialog.css',
})
export class VerifyDialog {
    constructor(public dialogRef: MatDialogRef<VerifyDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ){}

    onConfirm() {this.dialogRef.close(true);}
    onCancel() {this.dialogRef.close(false);}
}
