import { ListService } from './../../../Services/ListServiceAll/get-all-list';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-creation',
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatIconModule],
  templateUrl: './list-creation.html',
  styleUrl: './list-creation.css',
})
export class ListCreation  {
  inputValue:string ='';
  showErrorMessage: boolean = false;
  listservice=inject(ListService);

  @Output ("getAllList")  getAllList: EventEmitter<any> = new EventEmitter();

  postSingleList():void {
    if(!this.inputValue || !this.inputValue.trim()){
      this.showErrorMessage=true;
      return;
    }
    this.showErrorMessage=false;
      console.log('Entered Title Name: ', this.inputValue)

        this.listservice.CreateList(this.inputValue).subscribe((response) => {
          this.inputValue='';
          this.getAllList.emit();
        });
        // Creates List and refreshes the list in home component by calling getAllList function
    }
  }



