import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  teamId: string | null = null;
  tasks: Task[] = [];

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id');
    // verificar se teamId está presente
    if (this.teamId) {
      this.taskService.getTasksByTeamId(this.teamId).subscribe(tasks => {
        this.tasks = tasks;
      });  
    }
  }

}
