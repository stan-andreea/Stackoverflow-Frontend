import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of, switchMap, tap} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  username: string | undefined;
  password: string | undefined;
  currentUser: User | null = null;


  constructor(private http: HttpClient) {
  }

  authenticate(username: string, password: string): Observable<User | null> {
    console.log('username:', username);
    console.log('password:', password);
    this.username = username;
    this.password = password;
    console.log("login start");

    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      catchError(error => {
        console.log('HTTP Error:', error);
        return of([]);
      }),
      map(users => {
        console.log('users:', users);

        const user = users.find(u => u.username === username && u.password === password);
        console.log('user:', user);
        if (user) {
          sessionStorage.setItem('userId', user.id.toString());
          this.currentUser = user;

          return user;
        } else {
          console.log("not found");
          return null;
        }

      })

    );


  }


  isUserLoggedIn(): boolean {
    let userId = sessionStorage.getItem('userId');
    return !!userId;
  }

  getCurrentUser(): Observable<User | null> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      return of(null);
    }

    return this.http.get<any>(`http://localhost:3000/users/${userId}`).pipe(
      map(user => {
        this.currentUser = user;
        return user;
      })
    );
  }

  getCurrentUserId(): Observable<number | null> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      return of(null);
    }
    console.log(Number(userId));
    return of(Number(userId));

  }

  logOut() {
    sessionStorage.removeItem('userId');
    this.username = undefined;
    this.password = undefined;
  }

  signUp(username: string, email: string, password: string): Observable<any> {
    console.log('Sign-up method called');

    this.username = username;
    this.password = password;

    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      map(users => {
        console.log('Before update:', users);

        const existingUser = users.find(u => u.username === username || u.email === email);
        if (existingUser) {
          return false;
        } else {
          const maxId = Math.max(...users.map(u => u.id));
          const newUser = {
            id: maxId + 1,
            username: username,
            email: email,
            password: password
          };
          console.log('New user:', newUser);

          this.http.post('http://localhost:3000/users',newUser).subscribe();
          console.log('After update:', users);

          return true;
        }
      })
    );
  }

}







