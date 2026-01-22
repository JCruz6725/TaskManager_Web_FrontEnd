import { ListService } from './../../../Services/ListServiceAll/get-all-list';
import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('listTitleInput') listTitleInput?: ElementRef<HTMLInputElement>;

  @Output ("getAllList")  getAllList: EventEmitter<any> = new EventEmitter();
  // Destroys the clone field after creating the list
  @Output() toggleInputChange = new EventEmitter<boolean>();

  postSingleList():void {
    if(!this.inputValue || !this.inputValue.trim()){
      this.showErrorMessage=true;
      this.toggleInputChange.emit(true);
      console.log(' Error : Input is empty');

      return;
    }
    this.showErrorMessage=false;
      console.log('Entered Title Name: ', this.inputValue)

        this.listservice.CreateList(this.inputValue).subscribe((response) => {
          this.inputValue='';
          this.getAllList.emit();
          this.toggleInputChange.emit(false);
        });
        // Creates List and refreshes the list in home component by calling getAllList function
    }
    focusOnListTitle(): void {
      if (this.listTitleInput?.nativeElement) {
        this.listTitleInput.nativeElement.focus();
      }
    }
}
