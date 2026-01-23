import { Component,EventEmitter,signal} from '@angular/core';
import { ListService } from '../../../Services/ListServiceAll/get-all-list';
import { OnInit,input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../task/task';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-single',
  imports: [CommonModule,MatIcon],
  templateUrl: './single.html',
  styleUrl: './single.css',
})
export class Single implements OnInit {
   dataID = input<string>();

    // userSingleList = signal<any[]>([]);
    listname = signal<string>('')

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


  flipState() {
    if (this.State() === 'view') {
      this.State.set('edit');
     }
    else if (this.State() === 'edit') {
      this.State.set('view');
     }
  }

    UpdateList(): void {
      if (!this.listname() || this.listname().trim() === '') {
        this.showErrorMessage = true;
        console.log(' Error : Input is empty');
        return;
      }
      this.showErrorMessage = false;
      console.log('Entered Title Name: ', this.listname());

      this.service.UpdateList(this.dataID(), this.listname()).subscribe({ next:(response) => {
        this.State.set('view');
        this.getAllList.emit();

      }});
    }

}
