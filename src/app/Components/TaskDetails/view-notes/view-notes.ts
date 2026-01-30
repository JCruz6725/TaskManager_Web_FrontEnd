import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { MatIconModule } from '@angular/material/icon';
import { NoteService } from '../../../Services/NoteServices/note-service';
import { TaskNote } from '../../../Models/task-note'

@Component({
  selector: 'app-view-notes',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './view-notes.html',
  styleUrl: './view-notes.css',
})

export class ViewNotes {
  private sharedSvc = inject(DataSharingService);
  private noteSvc = inject(NoteService);

  public taskId = signal<string | null>(null)
  public notes = signal<TaskNote[]>([]);

  ngOnInit() {
    this.sharedSvc.currentChildData$.subscribe(task => {
      if (!task || !Array.isArray(task.notes)) {
        this.notes.set([]);
        return;
      }
      const sortedNotes = task.notes.sort(
        (a: TaskNote, b: TaskNote) =>
          new Date(b.createdDate).getTime() -
          new Date(a.createdDate).getTime()
      );
      this.notes.set(sortedNotes);
      this.taskId.set(task.id)

    });

    this.sharedSvc.currentNoteData$.subscribe(note => {
      if (!note)
        return;
      this.notes.update(existing => {
        const update = [...existing, note];
        return update.sort((a, b) =>
          new Date(b.createdDate).getTime() -
          new Date(a.createdDate).getTime()
        )
      });
    });
  }

  DeleteNote(noteId: string) {
    const taskId = this.taskId();
    if (!taskId)
      return;
    if (!confirm('Are you sure you want to delete this note'))
      return;
    this.noteSvc.deleteNote(taskId, noteId)
      .subscribe({
        next: () => {
          this.notes.update(n => n.filter(note => note.id !== noteId));
        }
      });
  }

}
