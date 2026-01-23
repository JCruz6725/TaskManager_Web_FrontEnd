import { Component, inject, signal } from '@angular/core';
import { Details } from '../../TaskDetails/details/details';
import { ViewNotes } from '../../TaskDetails/view-notes/view-notes';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CreateNote } from '../create-note/create-note';
import { NoteService } from '../../../Services/note-service';

@Component({
  selector: 'app-edit-details-page',
  imports: [CreateNote],
  templateUrl: './edit-details-page.html',
  styleUrl: './edit-details-page.css',
})
export class EditDetailsPage {
//shared and note service
  

}
