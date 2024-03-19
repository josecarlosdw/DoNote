import { Injectable } from '@angular/core';
import { AccountCreation } from './../models/account.model'
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: AccountCreation[] = [];
  private userKey = 'currentUser';
  private currentUserSubject = new BehaviorSubject<AccountCreation | null>(null);
  currentUser$: Observable<AccountCreation | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    
    const storedUsers = localStorage.getItem(this.userKey);
    if (Array.isArray(storedUsers)) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers)) {
          this.users = parsedUsers;
        } else {
          console.error('Stored users data is not an array.');
          this.users = [];
        }
      } catch (error) {
        console.error('Error parsing stored users data:', error);
        this.users = [];
      }
    } else {
      this.users = [];
    }
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}


  isAuthenticated(): boolean {
    const userData = localStorage.getItem(this.userKey);

    // Se existir um usuário no local storage, consideramos como autenticado
    return !!userData;
  }

  saveCurrentUser(user: AccountCreation): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }


  saveUsers(): void {
    localStorage.setItem(this.userKey, JSON.stringify(this.users));
  }

  createUser(account: AccountCreation): AccountCreation | null {
    if (Array.isArray(this.users)) {
      const existingUser = this.users.find(user => user.email === account.email);
    if (!existingUser) {
      const newAccount: AccountCreation = {
        id: uuidv4(),
        email: account.email,
        password: account.password
      };
  
      this.users.push(newAccount);
      this.saveUsers();
  
      return newAccount; // Retorna o usuário criado
    }
    return null; // Retorna null se o usuário já existir
  } else {
    console.error("this.users não é um array");
    return null;
  }
  }
  

  authenticateUser(account: AccountCreation): Promise<boolean> {
    return new Promise((resolve) => {
      const user = this.users.find(u => u.email === account.email && u.password === account.password);
      if (user) {
        // Defina o usuário autenticado como o usuário atual
        this.saveCurrentUser(user);
        resolve(true); // Usuário autenticado
      } else {
        resolve(false); // Usuário ou senha incorretos
      }
    });
  }
  getCurrentUser(): AccountCreation | null {
    return this.currentUserSubject.value;
  }

}
