import { Injectable, signal, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private http = inject(HttpClient);
  private getTaskByIdUrl = 'https://localhost:7177/Task/';
  private header = new HttpHeaders ({
    UserId: '8051A558-6F25-409B-9823-D5F5603EE625'
  });

  private dataStreamChild = new BehaviorSubject<any>({});
  currentDataChild$ = this.dataStreamChild.asObservable();

  transmitDataChild(newMessage: any) : void {
    this.dataStreamChild.next(newMessage);
  }

  private dataStreamParent = new BehaviorSubject<any>({});
  currentDataParent$ = this.dataStreamParent.asObservable();

  transmitDataParent(newMessage: any) : void {
    this.dataStreamParent.next(newMessage);
  }
}
