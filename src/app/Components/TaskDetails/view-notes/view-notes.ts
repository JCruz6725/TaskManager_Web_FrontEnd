import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-notes',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './view-notes.html',
  styleUrl: './view-notes.css',
})
export class ViewNotes {
  private sharedSvc = inject(DataSharingService);
  public notes = signal<any[]>([]);

  ngOnInit() {
    this.sharedSvc.currentChildData$.subscribe(task => {
      console.log('Task in ViewNotes:', task);
      if (!task || !task.notes) {
        this.notes.set([]);
        return;
      }
      this.notes.set(task.notes);
    });
  }

  DeleteNote(index: number) {
    let currentNotes = this.notes();
    let confirmDelet = confirm("Are you sure you want to delete this note?");
    if (confirmDelet) {
      currentNotes.splice(index, 1);
    }
  }
}
