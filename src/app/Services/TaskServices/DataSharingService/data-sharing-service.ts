import { Injectable, signal, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}
