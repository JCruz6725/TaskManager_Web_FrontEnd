import { ListService } from '../../Services/ListServiceAll/get-all-list';
import { Component, signal, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Single } from '../SingleList/single/single';
import { ListCreation } from '../CreateList/list-creation/list-creation';
import { CommonModule } from '@angular/common';
import { QueryList } from '@angular/core';

import { CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [Single, CdkDropListGroup, ListCreation, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  public userList = signal<any[]>([]);

  @ViewChild(ListCreation) listCreation?: ListCreation;
  @ViewChildren(Single) singleList?: QueryList<Single>;

  newList = false;

  toggleInput(): void {
    this.newList = !this.newList;
    if (this.newList) {
      // Focus on the input field when it becomes visible
      setTimeout(() => {
        this.listCreation?.focusOnListTitle();
      },);
    }
  }
  constructor(private service: ListService) { }

  ngOnInit(): void {
    this.getAllList();
  }
  getAllList() {
    this.service.AllList().subscribe((result: any[]) => {
      this.userList.set(result);
    });
  }

  updateLists() {
    this.singleList?.forEach(element => {
      element.getSingleList();
    });
  }

}
