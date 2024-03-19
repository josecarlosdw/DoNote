import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountCreation } from '../../models/account.model'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  account: AccountCreation = { id: '', password: '', email: '' };
  isFormValid: boolean = true;
  isUserAuthenticated: boolean = false;
  isLoginAttempted: boolean = false;
  userId: string = '';

  constructor(private authService: AuthService, private router: Router){}

  async signUp() {
    if (this.account.email && this.account.password) {
      this.isLoginAttempted = true;
      const createdUser = this.authService.createUser(this.account);

      if (createdUser && 'id' in createdUser) {
        try {
          const authenticated = await this.authService.authenticateUser(createdUser);

          if (authenticated) {
            this.isUserAuthenticated = true;
            this.authService.saveCurrentUser(createdUser);
            this.router.navigate(['']);
          } else {
            this.isUserAuthenticated = false;
        }
      } catch (error) {       
      }
    } else {
      this.isUserAuthenticated = false; 
    }
  } else {
    this.isFormValid = false; 
  }
}
}
