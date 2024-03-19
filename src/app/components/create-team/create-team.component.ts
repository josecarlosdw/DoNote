import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { AuthService } from '../../services/auth.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent {
  team: Team = {
    id: '',
    name: '',
    description: '',
    userIds: [], 
    createdByUserId: ''
  };
  
  userId = '';
  userTeams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private router: Router,
    private authService: AuthService,
  ) {}

  currentUser = this.authService.currentUserValue;

  onSubmit(): void {

    if (!this.authService.currentUserValue) {
      console.error("No user logged in!");
      return;
    }

    this.team.userIds = [this.currentUser.id];  
    this.team.createdByUserId = this.currentUser.id; 

    const newTeam: Team = {
        id: uuidv4(),
        name: this.team.name,
        description: this.team.description,
        userIds: this.team.userIds,
        createdByUserId: this.team.createdByUserId
    };
    
    this.teamService.addTeam(newTeam);

    this.resetForm();

    this.updateUserTeams(this.currentUser.id);
    
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.userId = currentUser.id;
      this.teamService.getTeamsByUserId(currentUser.id).subscribe(
        teams => this.userTeams = teams,
        error => console.error('Error fetching user teams:', error)
      );
    }
  }

  updateUserTeams(userId: any): void {
    this.teamService.getTeamsByUserId(userId).subscribe(
      (teams: Team[]) => {
        this.userTeams = teams;
        console.log('Updated user teams:', this.userTeams);
      }, 
      error => {
        console.error('Error getting user teams:', error);
      }
    );

  }

  resetForm(): void {
    this.team = {
      id: '',
      name: '',
      description: '',
      userIds: [],
      createdByUserId: ''
    };
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


}
