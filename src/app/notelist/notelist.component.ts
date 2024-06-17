import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})
export class NotelistComponent implements OnInit {
  notes: any[] = [];
  filteredNotes: any[] = [];
  searchText: string = '';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.noteService.getNotes().subscribe(
      (notes: any[]) => {
        this.notes = notes;
        this.applySearchFilter();
      },
      (error: any) => {
        console.error('Error fetching notes:', error);
      }
    );
  }

  applySearchFilter(): void {
    if (this.searchText.trim() === '') {
      this.filteredNotes = this.notes; // Display original notes when search text is empty
    } else {
      this.filteredNotes = this.notes.filter(note =>
        note.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  onSearch(event: Event): void {
    event.preventDefault();
    this.applySearchFilter();
  }

  viewPDF(fileId: string): void {
    // Implement logic to handle viewing PDF
    // You can open a new window or use a PDF viewer component
    console.log('View PDF:', fileId);
    // Example: window.open(`${this.baseUrl}/${fileId}`, '_blank');
  }

  downloadPDF(fileId: string): void {
    // Implement logic to handle downloading PDF
    console.log('Download PDF:', fileId);
    // Example: window.open(`${this.baseUrl}/${fileId}`, '_blank');
  }
}
