import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DataSharingService } from '../../Services/TaskServices/DataSharingService/data-sharing-service';
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
