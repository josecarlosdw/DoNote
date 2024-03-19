import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyNotesComponent } from './components/daily-notes/daily-notes.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { EditDailyNoteComponent } from './components/edit-daily-note/edit-daily-note.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { MatTableModule } from '@angular/material/table';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { DocGenerateModule } from './doc-generate.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    DailyNotesComponent,
    TaskListComponent,
    WelcomePageComponent,
    EditDailyNoteComponent,
    SignUpComponent,
    LoginComponent,
    DashboardComponent,
    CreateTeamComponent,
    TeamListComponent,
    TeamDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
    DocGenerateModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
