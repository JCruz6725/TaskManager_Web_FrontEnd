import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';

export interface TaskNote {
  id: string;
  note: string;
  createdDate: string;
}

@Component({
  selector: 'app-view-notes',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-notes.html',
  styleUrl: './view-notes.css',
})
export class ViewNotes {
   private sharedSvc = inject(DataSharingService);
   notes = input<any[]>([]);

  ngOnInit() {
    this.sharedSvc.currentChildData$.subscribe(notes =>  {
      this.notes = notes ?? [];
    });



  }
   


  


}
