import { Component } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DailyNote';
  teamId: string | null = null;
  isUserAuthenticated: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.isUserAuthenticated = this.authService.isAuthenticated();

    // Subscreva-se aos eventos de navegação para atualizar o teamId
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd && this.route.firstChild) {
        this.teamId = this.route.firstChild.snapshot.params['id'] || null;
      }
    });
  }
  ngOnInit(): void {
    // Verifica se há um usuário autenticado ao inicializar o componente
    this.isUserAuthenticated = this.authService.isAuthenticated();

    // Assine o Observable para receber atualizações de autenticação
    this.authService.currentUser$.subscribe(user => {
      this.isUserAuthenticated = !!user; // Atualiza o estado de autenticação
    });
  }

  closeSidenav(sidenav: MatSidenav) {
    if (sidenav) {
      sidenav.close();
    }
  }

  isLinkActive(link: string): boolean {
    return this.router.isActive(link, true);
  }

  logout() {
    this.authService.clearCurrentUser();
   
    // Após o logout, atualize o estado de autenticação
    this.isUserAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
