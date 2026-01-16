import { Component,signal} from '@angular/core';
import { ListService } from '../../../Services/ListServiceAll/get-all-list';
import { OnInit,input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../task/task';

@Component({
  selector: 'app-single',
  imports: [CommonModule,MatIcon, Task],
  templateUrl: './single.html',
  styleUrl: './single.css',
})
export class Single implements OnInit {
   dataID = input<string>();

    // userSingleList = signal<any[]>([]);
    listname = signal<string>('')
    listSize = signal<any[]>([]);

  constructor(private service: ListService) {}

  ngOnInit(): void {
    this.getSingleList();
  }

  getSingleList() {
    this.service.SingleList(this.dataID()).subscribe((result: any) => {
      this.listname.set(result.name);
      this.listSize.set(result.taskItems);
    });
  }
}
// getSingleList() {
//     this.service.SingleList(this.dataID()).subscribe((result: any[]) => {
//       this.userSingleList.set(result);
//     });
