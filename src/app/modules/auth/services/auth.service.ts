import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/user.service';
import { HttpClient } from '@angular/common/http';

export type UserType = UserModel | undefined;
const API_USERS_URL = `http://localhost:8002`;
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private userService: UserService 

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private http: HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
        map((auth: UserModel ) => {
            console.log("Authentication response:", auth);
            const result = this.setAuthFromLocalStorage(auth);
            console.log("Stored auth data in local storage:", result);
            return result;
        }),
        switchMap(() => {
            const user = this.getUserByToken();
            console.log("Fetched user by token:", user);
            return user;
        }),
        catchError((err) => {
            console.error("Error during authentication:", err);
            return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
}

  resetPassword( resetToken: string,newPassword: string): Observable<any> {
    return this.http.post(`${API_USERS_URL}/reset-password`, { resetToken ,newPassword  });
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.token).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.userService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: UserModel ): boolean {
    if (auth && auth.token) {
        localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
        console.log('Auth data stored in localStorage:', auth);
        return true;
    }
    console.warn('No auth data to store in localStorage.');
    return false;
}

private getAuthFromLocalStorage(): UserModel | undefined {
  try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
          console.warn('No auth data found in localStorage.');
          return undefined;
      }

      const authData = JSON.parse(lsValue);
      console.log('Retrieved auth data from localStorage:', authData);
      return authData;
  } catch (error) {
      console.error('Error retrieving auth data from localStorage:', error);
      return undefined;
  }
}







  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
