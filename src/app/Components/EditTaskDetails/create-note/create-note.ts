import { Component, inject, signal } from '@angular/core';
import { NoteService } from '../../../Services/NoteServices/note-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-note',
  imports: [ CommonModule, FormsModule],
  templateUrl: './create-note.html',
  styleUrl: './create-note.css',
})
export class CreateNote {
//shared serice

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





