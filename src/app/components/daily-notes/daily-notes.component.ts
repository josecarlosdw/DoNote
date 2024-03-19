import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DailyNote } from '../../models/daily-note.model';
import { DailyService } from '../../services/daily.service';

@Component({
  selector: 'app-daily-notes',
  templateUrl: './daily-notes.component.html',
  styleUrls: ['./daily-notes.component.css'],
})
export class DailyNotesComponent {
  newNote: DailyNote = {
    userId:'',
    id: 0,
    date: '',
    yesterday: '',
    today: '',
    impediments: '',
  };

  userId = '';

  constructor(
    public dailyService: DailyService, 
    private router: Router,
    private authService: AuthService ) {

  }

  ngOnInit(): void {

    // Obter informações do usuário logado do AuthService
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.userId = currentUser.id; // Preencher userId com o ID do usuário logado
    }
  }


  addDailyNote(): void {
    
    // Adicionar uma nova nota diária
    const newId = this.dailyService.getAllDailyNotes(this.userId).length + 1;

    const newDailyNote: DailyNote = {
      ...this.newNote,
      date: new Date().toLocaleDateString(),
      id: newId, 
      userId: this.userId, // Define o userId para a nota
    };

    this.dailyService.addDailyNote(newDailyNote);

    // Salvar as notas no LocalStorage após adicionar uma nova nota
    this.saveNotes();

    // Reiniciar os valores para uma nova nota
    this.newNote = {
      userId: '', 
      id: 0,
      date: '',
      yesterday: '',
      today: '',
      impediments: '',
    };
  }

  // Método para salvar as notas no LocalStorage
  saveNotes() {
    // Use this.userId para obter o ID do usuário atual
  const notes = this.dailyService.getAllDailyNotes(this.userId);
  localStorage.setItem('dailyNotes', JSON.stringify(notes));
  }

  // Método para carregar as notas do LocalStorage
  loadNotes() {
    const savedNotes = localStorage.getItem('dailyNotes');
    if (savedNotes) {
      const parsedNotes: DailyNote[] = JSON.parse(savedNotes);
      parsedNotes.forEach((note) => {
        // Adiciona a nota ao serviço apenas se ela ainda não estiver lá
        if (!this.dailyService.getAllDailyNotes(this.userId).some(serviceNote => serviceNote.id === note.id)) {
          this.dailyService.addDailyNote(note);
        }
      });
    }
  }

  editNote(note: DailyNote): void {
    this.router.navigate(['/edit-daily-note', note.id]);
  }

  deleteNote(note: DailyNote): void {
    this.dailyService.deleteDailyNoteById(note.id);
    this.saveNotes();
  }
}
