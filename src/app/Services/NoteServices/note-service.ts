import { Injectable, inject } from '@angular/core';
import { RequestHelperService } from '../BaseService/request-helper-service';


@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private Service = inject(RequestHelperService);

  createNote(taskId: string, noteText: string) {
    return this.Service.post<any>(`/task/${taskId}/notes`, { noteText });
  }

  deleteNote(taskId: string, noteId: string) {
    return this.Service.delete<any>(`/task/${taskId}/notes/${noteId}`);
  }
}
