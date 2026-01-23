import { Component,signal} from '@angular/core';
import { ListService } from '../../../Services/ListServiceAll/get-all-list';
import { OnInit,input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ListCreation } from '../../CreateList/list-creation/list-creation';
import { FormsModule } from "@angular/forms";



@Component({
  selector: 'app-single',
  imports: [CommonModule, MatIcon, MatToolbarModule, MatMenuModule, ListCreation, FormsModule],
  templateUrl: './single.html',
  styleUrl: './single.css',
})
export class Single implements OnInit {

  dataID = input<string>();
  listname = signal<string>('')

  public State = signal<'view' | 'edit'>('view');


  constructor(private service: ListService) {}

  ngOnInit(): void {
    this.getSingleList();
  }

  getSingleList() {
    this.service.SingleList(this.dataID()).subscribe((result: any) => {
      this.listname.set(result.name);
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




    // UpdateList(): void {
    //   if (!this.inputValue || !this.inputValue.trim()) {
    //     this.showErrorMessage = true;
    //     console.log(' Error : Input is empty');
    //     return;
    //   }
    //   this.showErrorMessage = false;
    //   console.log('Entered Title Name: ', this.inputValue);

    //   this.listservice.UpdateList(this.listId, this.inputValue).subscribe((response) => {
    //     this.inputValue = '';
    //     // exit edit mode
    //     this.isEditing = false;
    //     this.getAllList.emit();
    //   });
    // }
  
}
