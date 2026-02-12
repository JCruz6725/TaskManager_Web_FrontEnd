import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmDialogData} from '../../../Models/confirm-dialog';
import { VerifyDialog } from '../../../Components/verify-dialog/verify-dialog';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  //Property to hold current child task data
  private childDataStream = new BehaviorSubject<any>({});
  currentChildData$ = this.childDataStream.asObservable();
  //Method to hydrate our property
  transmitChildData(newMessage: any) : void {
    this.childDataStream.next(newMessage);
  }

  //Property to hold the child's parent data 
  private parentDataStream = new BehaviorSubject<any>({});
  currentParentData$ = this.parentDataStream.asObservable();
  //Method to hydrate our proprty
  transmitParentData(newMessage: any) : void {
    this.parentDataStream.next(newMessage);
  }

  //property to hold data being edited
  private editDataStream = new BehaviorSubject<any>({});
  currentEditData$ = this.editDataStream.asObservable();
  //Method to hydrate our proprty
  transmitEditData(newMessage: any) : void {
    this.editDataStream.next(newMessage);
  }

  //to hold all tasks in a list data
  private listDataStream = new BehaviorSubject<any>({});
  currentListData$ = this.listDataStream.asObservable();
  transmitListData(newMessage: any) : void {
    this.listDataStream.next(newMessage);
  }

  private noteDataStream = new BehaviorSubject<any>({});
  currentNoteData$ = this.noteDataStream.asObservable();
  transmitNoteData(newMessage: any) : void {
    this.noteDataStream.next(newMessage);
  }

  //to transfer data between component & dialog
  constructor(private dialog: MatDialog){}
  confirmDialog(confirmData: ConfirmDialogData): Observable<boolean>{
    const dialogRef = this.dialog.open(VerifyDialog, {data: confirmData});
    return dialogRef.afterClosed();
  }
}
