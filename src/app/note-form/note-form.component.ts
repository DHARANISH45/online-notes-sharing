import { Component } from '@angular/core';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent {
  note = { title: '', content: '' };
  selectedFile: File | null = null;

  constructor(private noteService: NoteService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addNote(): void {
    const formData = new FormData();
    formData.append('title', this.note.title);
    formData.append('content', this.note.content);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.noteService.addNoteWithFile(formData).subscribe(
      (newNote: any) => {
        console.log('Note added!', newNote);
        alert('Note added successfully!'); // Show success alert
        this.note = { title: '', content: '' };
        this.selectedFile = null;
        this.router.navigate(['/']); // Redirect to home component
      },
      (error: any) => {
        console.error('Error adding note:', error);
        alert('Failed to add note. Please try again.'); // Show error alert
      }
    );
  }
}
