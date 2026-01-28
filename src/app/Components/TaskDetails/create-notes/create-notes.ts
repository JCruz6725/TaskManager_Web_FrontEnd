import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { NoteService } from '../../../Services/NoteServices/note-service';

@Component({
  selector: 'app-create-notes',
  imports: [ CommonModule, FormsModule, MatIconModule],
  templateUrl: './create-notes.html',
  styleUrl: './create-notes.css',
})
export class CreateNotes {
sharedSvc = inject(DataSharingService);
   noteSvc = inject(NoteService);

  currentTask: any = null;
  noteText = signal('');
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.sharedSvc.currentChildData$.subscribe(task => {
      this.currentTask = task;
    });
  }

  submitNote() {
    this.errorMessage.set(null);

    if (!this.noteText().trim()) {
      this.errorMessage.set('Note cannot be empty.');
      return;
    }

    this.noteSvc.createNote(this.currentTask.id, this.noteText())
      .subscribe({
        next: (savedNote) => {
          const updatedTask = {...this.currentTask,
            notes: [(this.currentTask.notes ?? []), savedNote],
          };

          this.sharedSvc.transmitChildData(updatedTask);
          this.sharedSvc.transmitNoteData(savedNote);
          this.noteText.set('');
        },
        error: () => {
          this.errorMessage.set('Failed to save note.');
        }
      });
  }
}
