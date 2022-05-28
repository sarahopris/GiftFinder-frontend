import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {BackendService} from '../../backend/backend.service';
import {Router} from '@angular/router';
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;

  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private backendService: BackendService,
              private router: Router) {
      const currentUser = localStorage.getItem('currentUser');
      const parsed = currentUser ? JSON.parse(currentUser) : {};
      this.currentUserSubject = new BehaviorSubject<User>(parsed);
    this.currentUser = this.currentUserSubject.asObservable();
  }


  /**
   * make the login request to generate a token in backend and save the logged in user in the localstorage
   * @param username the username given in the form
   * @param password the password given in the form
   */
  login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }


    return this.backendService.post('http://localhost:4300/user/login', body)
        .pipe(
            map((user: any) => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('currentUsername', user.username);
              localStorage.setItem('currentToken', user.token);
              this.currentUserSubject.next(user);
              return user;
            })
        );
  }


  register(email: string, username: string, password: string) {
    const body = {
      email: email,
      username: username,
      password: password
    }


    return this.backendService.post('http://localhost:4300/users/addUser', body)
        .pipe(
            map((user: any) => {
              return user;
            })
        );
  }


  /**
   * make a http request to delete the token from the database
   * delete the informations about the user from the localstorage
   */
  logout() {
    return this.backendService.post('http://localhost:4300/user/logout', localStorage.getItem('currentUsername')).subscribe(() => {
      localStorage.removeItem('currentToken');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUsername');
      this.router.navigate(['/authentication/login']);
    });
  }

  ngOnInit(): void {
  }
}
