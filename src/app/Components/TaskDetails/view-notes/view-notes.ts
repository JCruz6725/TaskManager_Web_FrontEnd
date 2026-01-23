import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { MatIconModule } from '@angular/material/icon';
import { NoteService } from '../../../Services/NoteServices/note-service';

@Component({
  selector: 'app-view-notes',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './view-notes.html',
  styleUrl: './view-notes.css',
})
export class ViewNotes {
  private sharedSvc = inject(DataSharingService);
  private noteSvc = inject(NoteService);

  public notes = signal<any[]>([]);
  // public taskId = signal<string | null>(null)
  public taskId = signal<string | null>(null)


  ngOnInit() {
    this.sharedSvc.currentChildData$.subscribe(task => {
      // console.log('Task in ViewNotes:', task);
      if (!task || !task.notes) {
        this.notes.set([]);
        return;
      }
      this.notes.set(task.notes);
      this.taskId.set(task.id)
    });
  }

   DeleteNote(noteId: string) {

    console.log("note id " + noteId)
    const taskId = this.taskId();
    console.log(taskId)
    if(!taskId)
      return;
     if(!confirm('Delete Note'))
      return;
     this.noteSvc.deleteNote(taskId, noteId)
      .subscribe({
        next: () => {
          this.notes.update(n => n.filter(note => note.id !== noteId));
        }
      });
     }

}
