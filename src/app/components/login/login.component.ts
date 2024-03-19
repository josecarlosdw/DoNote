import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AccountCreation } from '../../models/account.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  account: AccountCreation = {
    id: '',
    password: '',
    email: ''
  };

  isUserAuthenticated: boolean = false;
  isLoginAttempted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    this.isLoginAttempted = true;
    try {
      const authenticated = await this.authService.authenticateUser(this.account);

      if (authenticated) {
        // Após autenticar, obtenha o usuário atual do serviço de autenticação
        const currentUser = this.authService.getCurrentUser();

        // Verifique se o usuário existe antes de salvar
        if (currentUser) {
          this.authService.saveCurrentUser(currentUser);
        }

        this.router.navigate(['/dashBoard']);
      } else {
        
      }
    } catch (error) {
      
    }
  }
}
