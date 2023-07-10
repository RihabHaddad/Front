
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './user/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8002';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/api/Admins`) as Observable<UserModel[]>;
  }
    
  
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/api/auth/signup`, user);
  }
  deleteUser(_id: string): Observable<UserModel> {
    const url = `${this.apiUrl}/api/Admins/deleteuser/${_id}`;
    return this.http.delete<UserModel>(url);
  }
}
