import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { MatIconModule } from '@angular/material/icon';
import { NoteService } from '../../../Services/note-service';

@Component({
  selector: 'app-view-notes',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './view-notes.html',
  styleUrl: './view-notes.css',
})
export class ViewNotes {
  private sharedSvc = inject(DataSharingService);
  private notSvc = inject(NoteService)
  public notes = signal<any[]>([]);
  public taskId = signal<string | null>(null);

  ngOnInit() {
  this.sharedSvc.currentChildData$.subscribe(task => {
    this.notes.set(task?.notes ?? []);
  });

  // this.sharedSvc.currentNoteData$.subscribe(note => {
  //   if (note?.id) {
  //     this.notes.update(n => [...n, note]);
  //   }
  // });
}
 

     

  }



