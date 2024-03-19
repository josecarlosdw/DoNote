import { Injectable } from '@angular/core';
import { DailyNote } from '../models/daily-note.model';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  private dailyNotes: DailyNote[] = [];
  private notesKey = 'dailyNotes';

  constructor() {
    this.loadNotes();
  }

  private loadNotes(): DailyNote[] {
    const savedNotes = localStorage.getItem(this.notesKey);
    return savedNotes ? JSON.parse(savedNotes) : [];
  }

  getAllDailyNotes(userId: string): DailyNote[] {
    const dailyNotes = this.loadNotes();
    return dailyNotes.filter((note) => note.userId === userId);
  }

  saveNotes(dailyNotes: DailyNote[]): void {
    localStorage.setItem(this.notesKey, JSON.stringify(dailyNotes));
  }

  addDailyNote(note: DailyNote): void {
    const dailyNotes = this.loadNotes();
    dailyNotes.push(note);
    this.saveNotes(dailyNotes);
  }

  deleteDailyNoteById(id: number): void {
    let dailyNotes = this.loadNotes();
    const index = dailyNotes.findIndex((note) => note.id === id);
    if (index !== -1) {
      dailyNotes.splice(index, 1);
      this.saveNotes(dailyNotes);
    }
  }

  getDailyNoteById(id: number): DailyNote | undefined {
    const dailyNotes = this.loadNotes();
    return dailyNotes.find((note) => note.id === id);
  }
}