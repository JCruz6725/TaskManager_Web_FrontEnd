import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { DataSharingService } from '../../Services/TaskServices/DataSharingService/data-sharing-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-verify-dialog',
  imports: [MatDialogModule, MatDialogContent, MatButtonModule],
  templateUrl: './verify-dialog.html',
  styleUrl: './verify-dialog.css',
})
export class VerifyDialog {
  data : {message: string, id: string} = inject(MAT_DIALOG_DATA);
  private sharedSvc : DataSharingService = inject(DataSharingService)
  readonly dialog = inject(MatDialog)

  onConfirm(){
    this.sharedSvc.transmitDialogData({state: true, id: this.data.id})
    this.dialog.closeAll();
  }
}
