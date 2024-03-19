import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailyNote } from '../../models/daily-note.model';
import { Team } from '../../models/team.model';
import { AuthService } from '../../services/auth.service';
import { DailyService } from '../../services/daily.service';
import { TeamService } from '../../services/team.service';
import { AccountCreation } from '../../models/account.model';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ChangeDetectorRef } from '@angular/core';
import { Task } from '../..//models/task.model';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: AccountCreation | null = null;
  email: string = 'exemplo@email.com';
  userId = '';
  userNotes: DailyNote[] = []; 
  userTeams: Team[] = [];
  userTasks: Task[] = [];

  teamId: string | null = null;
  selectedStatus: string | undefined;
  taskStatus: string[] = ['Criado', 'Em Andamento', 'Completo'];
  taskStatusCurrent: string | undefined = 'Criado';

  filteredUserTasks: Task[] = [];

  constructor(
    private authService: AuthService, 
    private dailyService: DailyService, 
    private router: Router,
    private teamService: TeamService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
    ) { }

    private unsubscribe$ = new Subject<void>();

    ngOnInit(): void {
      this.authService.currentUser$.subscribe(async (user) => {
      this.currentUser = user;
      this.userTasks = [...this.taskService.getAllTasks()];

      if (user) {
        this.userId = user.id;
        this.userNotes = this.dailyService.getAllDailyNotes(user.id);
      
        if (this.currentUser && this.currentUser.id) {
          this.teamService.getTeamsByUserId(this.currentUser.id).subscribe(teams => {
            this.userTeams = teams;
            this.filterUserTasks(); // Filtrar e exibir apenas as tarefas do usuário
            this.cdr.detectChanges();
          }, error => console.error('Error getting user teams:', error));
        } else {
          console.log('Error getting user teams:', 'seu id é undefined ou null');
        }
        
      }
      });
  }

  filterUserTasks() {
    if (this.currentUser && this.currentUser.id) {
      this.filteredUserTasks = this.taskService.getAllTasks().filter(task => task.userId === this.currentUser?.id);
      console.log('Tarefas do usuário:', this.filteredUserTasks);
    }
  }
  removeCharactersAfterAt(email: string): string {
    const splitEmail = email.split('@');
    if (splitEmail.length > 1) {
      return splitEmail[0]; 
    }
    return email;
  }

  saveNotes() {
    // Use this.userId para obter o ID do usuário atual
  const notes = this.dailyService.getAllDailyNotes(this.userId);
  localStorage.setItem('dailyNotes', JSON.stringify(notes));
  }

  editNote(note: DailyNote): void {
    this.router.navigate(['/edit-daily-note', note.id]);
  }

  deleteNote(note: DailyNote): void {
    this.dailyService.deleteDailyNoteById(note.id);
    this.userNotes = this.dailyService.getAllDailyNotes(this.userId); // Atualiza as notas após a remoção
    this.saveNotes(); // Salvar as notas atualizadas após a remoção
  }

  updateUserTeams(userId: string): void {
    this.teamService.getTeamsByUserId(userId).subscribe(teams => {
      this.userTeams = teams;
      console.log('Updated dashboard user teams:', this.userTeams);
    }, error => console.error('Error updating user teams:', error));
  }

 
  addNewTeam(): void {
    const newTeam: Team = {
      id: uuidv4(), 
      name: 'Nova Equipe',
      description: 'Descrição da nova equipe',
      userIds: [], // Seu ID de usuário
      createdByUserId: 'user3' // ID do usuário que criou essa equipe
    };

    this.teamService.addTeam(newTeam);
    this.updateUserTeams(this.userId); // Atualize as equipes do usuário no Dashboard
  }

 // OnDestroy Hook to unsubscribe from the Observable.
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeStatus(taskIdToUpdate: string, newStatus: string | undefined) {
    if (newStatus !== undefined && taskIdToUpdate) {
      const taskToUpdate = this.userTasks.find(task => task.id === taskIdToUpdate);

      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
        this.taskService.updateTaskList();
        this.taskStatusCurrent = newStatus; // Atualiza o taskStatusCurrent
        this.cdr.detectChanges(); // Notificar o Angular sobre as mudanças
      }
    }
  }


}
