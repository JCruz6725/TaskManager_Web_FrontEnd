import { Component,signal} from '@angular/core';
import { ListService } from '../../../Services/ListServiceAll/get-all-list';
import { OnInit,input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ListCreation } from '../../CreateList/list-creation/list-creation';



@Component({
  selector: 'app-single',
  imports: [CommonModule, MatIcon, MatToolbarModule, MatMenuModule,ListCreation],
  templateUrl: './single.html',
  styleUrl: './single.css',
})
export class Single implements OnInit {

  dataID = input<string>();
  listname = signal<string>('')

  constructor(private service: ListService) {}

  ngOnInit(): void {
    this.getSingleList();
  }

  getSingleList() {
    this.service.SingleList(this.dataID()).subscribe((result: any) => {
      this.listname.set(result.name);
    });
  }
}
