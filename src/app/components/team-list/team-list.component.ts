import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  subscription!: Subscription;
  userTeams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.subscription = this.teamService.getTeams().subscribe(teams => {
      this.userTeams = teams;
    });
  }

  goToTeam(teamId:any) {
    this.router.navigate(['/team', teamId]);    
  }

  subscribeToTeam(teamId: string): void {
    if (!this.authService.currentUserValue) {
      console.error("No user logged in!");
      return;
    }
  
    // Inscrever o usuário atual à equipe
    this.teamService.subscribe(this.authService.currentUserValue.id, teamId)
  
    .then(() => {
      console.log('sucesso ao se inscrever na equipe');
    })
    .catch(err => {
      console.error('erro ao se inscrever na equipe:', err);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}