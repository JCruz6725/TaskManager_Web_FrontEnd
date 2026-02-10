import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  private dialogDataStream = new BehaviorSubject<any>({state: false, id: ''});
  currentDialogData$ = this.dialogDataStream.asObservable();
  transmitDialogData(newMessage: {state: boolean, id: string}) : void {
    this.dialogDataStream.next(newMessage);
  }
}
