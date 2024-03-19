import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  
  //Convertw equipes em um BehaviorSubject para emitir novos dados e ouvir as alterações.
  private teams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

  constructor() {
    const initialTeams: Team[] = [
    ];
  
    this.teams.next(initialTeams);
    
  
    let storageTeams = localStorage.getItem('teams');
    if (storageTeams) {
      let storedTeams: Team[] = JSON.parse(storageTeams);
  
      // Mapeie o storedTeams para garantir que cada equipe tenha a propriedade 'userIds'
      let updatedStoredTeams = storedTeams.map(team => ({
        id: team.id,
        name: team.name,
        description: team.description,
        userIds: Array.isArray(team.userIds) ? team.userIds : [],
        createdByUserId: team.createdByUserId,
      }));
      
      this.teams.next(updatedStoredTeams);
    }
  }

  getTeamsByUserId(userId: string): Observable<Team[]> {
    return this.teams.pipe(
      map((teams: Team[]) => teams.filter((team: Team) => team.userIds.includes(userId)))
    );
  }

  getTeams(): BehaviorSubject<Team[]> {
    return this.teams;
  }

  addTeam(newTeam: Team): void {
    const currentTeams = this.teams.getValue();
    currentTeams.push(newTeam);
    this.teams.next(currentTeams);
    this.saveTeams(); 
  }

  private saveTeams(): void {
    localStorage.setItem('teams', JSON.stringify(this.teams.getValue()));
  }

  subscribe(userId: string, teamId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Encontra a equipe por id
      const allTeams = this.teams.getValue();
      const team = allTeams.find(team => team.id === teamId);
      
      if (!team) {
        return reject(`Team with id ${teamId} was not found.`);
      }
  
      // Verifica se o usuário ainda não está inscrito
      if (team.userIds && team.userIds.includes(userId)) {
        return resolve();
      }
  
      // add user no time
      // Verifica se userIds é uma array, se não, crie um novo array
      team.userIds = Array.isArray(team.userIds) ? team.userIds : [];
      team.userIds.push(userId);
  
      // salva as equipes
      this.teams.next(allTeams);
      this.saveTeams();
  
      resolve();
    });
  }

}