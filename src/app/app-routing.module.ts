import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyNotesComponent } from './components/daily-notes/daily-notes.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { EditDailyNoteComponent } from './components/edit-daily-note/edit-daily-note.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { DocGenerateComponent } from './components/doc-generate/doc-generate.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'task-list/:id', component: TaskListComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'daily-notes', component: DailyNotesComponent },
  { path: 'edit-daily-note/:id', component: EditDailyNoteComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashBoard', component: DashboardComponent },
  { path: 'createTeam', component: CreateTeamComponent },
  { path: 'equipes', component: TeamListComponent },
  { path: 'team/:id', component: TeamDetailComponent},
  { path: 'doc-generate', component: DocGenerateComponent},
  {
    path: 'doc-generate',
    loadChildren: () => import('./doc-generate.module').then(m => m.DocGenerateModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}