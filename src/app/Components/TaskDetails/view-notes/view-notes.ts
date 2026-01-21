import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';

@Component({
  selector: 'app-view-notes',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-notes.html',
  styleUrl: './view-notes.css',
})
export class ViewNotes {
   private sharedSvc = inject(DataSharingService);
   public notes = signal<any[]>([]);

  ngOnInit() {
    this.sharedSvc.currentChildData$.subscribe(task =>  {
  
      console.log('Task in ViewNotes:', task);

      if(!task || !task.notes){
        this.notes.set([]);
        return;
      }

      this.notes.set(task.notes);
    });
  }
}
