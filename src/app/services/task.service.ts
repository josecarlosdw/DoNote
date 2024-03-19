import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  teamId: string | null = null;
  taskSubject = new Subject<Task[]>(); // Observable

  constructor() {
    this.loadTasks();
  }

  // Carrega tarefas do localStorage ao iniciar o serviço
  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    this.updateTaskList();
  }

  // Obtém todas as tarefas
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksByTeamId(teamId: string): Observable<Task[]> {
    return new Observable((observer: Observer<Task[]>) => {
      const tasks = this.tasks.filter(task => task.teamId === teamId);
      observer.next(tasks);
      observer.complete();
    });
    
  }

  // Adiciona uma nova tarefa
  addTask(task: Task, teamId: string, userId: string) {
    task.teamId = teamId;
    task.userId = userId; // Preencher o campo userId com o ID do usuário
    this.tasks.push(task);
    this.saveTasks();
    this.updateTaskList();
  }

  // Salva as tarefas no localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    console.log(localStorage.getItem('tasks')); 
  }
  
  updateTaskList() {
    this.taskSubject.next([...this.tasks]); // Emitindo uma cópia do array de tarefas
}
}