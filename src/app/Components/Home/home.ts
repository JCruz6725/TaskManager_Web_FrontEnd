import { ListService } from '../../Services/ListServiceAll/get-all-list';
import { Component, signal, OnInit } from '@angular/core';
import { Single } from '../SingleList/single/single';
import { CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [Single, CdkDropListGroup],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  public userList = signal<any[]>([]);

  constructor(private service: ListService) {}

  ngOnInit(): void {
    this.getAllList();
  }

  getAllList() {
    this.service.AllList().subscribe((result: any[]) => {
      this.userList.set(result);
    });

  }
}
