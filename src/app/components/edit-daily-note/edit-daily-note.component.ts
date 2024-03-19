import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyService } from '../../services/daily.service';
import { DailyNote } from '../../models/daily-note.model';

@Component({
  selector: 'app-edit-daily-note',
  templateUrl: './edit-daily-note.component.html',
  styleUrls: ['./edit-daily-note.component.css']
})
export class EditDailyNoteComponent implements OnInit {
  noteToEdit: DailyNote = { userId:'', id: 0, date: '', yesterday: '', today: '', impediments: '' };
  private dailyNotes: DailyNote[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dailyService: DailyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noteId = +params['id']; // Converte o ID para número
      this.noteToEdit = this.dailyService.getDailyNoteById(noteId) || {userId:'', id: 0, date: '', yesterday: '', today: '', impediments: '' };
    });
  }

  saveChanges(): void {
    // Recuperar todas as notas
    const dailyNotes = this.dailyService.getAllDailyNotes(this.noteToEdit.userId);
    
    // Encontre a nota que estamos editando
    const index = dailyNotes.findIndex((note) => note.id === this.noteToEdit.id);
    if (index !== -1) {
      // Atualiza a nota
      dailyNotes[index] = this.noteToEdit;
    } else {
      // Se a nota não existe, adicionamos uma nova
      dailyNotes.push(this.noteToEdit);
    }
  
    // salvar todas as notas
    this.dailyService.saveNotes(dailyNotes);
    
    this.router.navigate(['/daily-notes']); 
  }
}