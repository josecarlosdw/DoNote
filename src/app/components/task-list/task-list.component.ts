import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AccountCreation } from 'src/app/models/account.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: Task[] = [];
  teamId: string | null = null;
  taskSubscription!: Subscription;
  currentUser!: AccountCreation;

  selectedStatus: string | undefined;
  taskStatus: string[] = ['Criado', 'Em Andamento', 'Completo'];
  taskStatusCurrent: string | undefined = 'Criado';

  newTask: Task = {
    id: uuidv4(),
    userId:this.currentUser?.id,
    title: '',
    description: '',
    status: '',
    progress: 0,
    notes: '',
    teamId: '',
  };

  userId = '';

  constructor(private taskService: TaskService, private route: ActivatedRoute, private authService: AuthService) {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.teamId = params.get('id');
        if (this.teamId) {
          return this.taskService.getTasksByTeamId(this.teamId);
        } else {
          // We should always return an Observable from Switchmap
          return of([]);
        }
      })
    ).subscribe(tasks => this.tasks = tasks);

  this.taskSubscription = this.taskService.taskSubject.subscribe(d => {
      if (this.teamId) {
          this.tasks = d.filter(task => task.teamId === this.teamId);
      }
  });
  }
  
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.teamId = params['id']; 
      if (this.teamId) {
        this.getTasksByTeamId(this.teamId); 
      }
    });

    // Obter informações do usuário logado do AuthService
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.userId = currentUser.id; // Preencher userId com o ID do usuário logado
    }
  }

  getTasksByTeamId(teamId: string) {

    if (teamId) {
      this.taskService.getTasksByTeamId(teamId).subscribe(tasks => {
        this.tasks = tasks;
      });
    } else {
      console.log('teamId not set!');
    }
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      // Não se esqueça de cancelar a inscrição ao destruir o componente
      this.taskSubscription.unsubscribe();
    }
  }


  addTask() {
    if (this.teamId) {
      this.newTask.teamId = this.teamId; // atribuir o teamId à newTask
      this.taskService.addTask(this.newTask, this.teamId, this.userId);
      this.taskService.updateTaskList(); // Atualiza o serviço de tarefa
      //this.tasks = this.taskService.getTasksByTeamId(this.teamId); // Atualiza a lista local de tarefas
      this.getTasksByTeamId(this.teamId);
    }
  
    this.newTask = {
      id:'',
      userId: this.currentUser?.id,
      title: '',
      description: '',
      status: '',
      progress: 0,
      notes: '',
      teamId: '',
    };
  }

  changeStatus(taskIdToUpdate: string, newStatus: string | undefined) {
    if (newStatus && taskIdToUpdate) {
      const taskToUpdate = this.tasks.find(task => task.id === taskIdToUpdate);
      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
        this.taskService.updateTaskList();
      }
    }
    this.taskStatusCurrent = newStatus
  }
}