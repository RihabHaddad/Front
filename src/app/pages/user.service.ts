
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './user/user.model';
import { AssureModel } from '../modules/auth/models/assure.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8002';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<AssureModel[]> {
    return this.http.get<AssureModel[]>(`${this.apiUrl}/api/assures/`) as Observable<AssureModel[]>;
  }
    
  
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/api/auth/signup`, user);
  }
  addUser(user: AssureModel): Observable<AssureModel> {
    return this.http.post<AssureModel>(`${this.apiUrl}/api/assures/addassure`, user);
  }
  deleteUser(_id: string): Observable<AssureModel> {
    const url = `${this.apiUrl}/api/assures/deleteassure/${_id}`;
    return this.http.delete<AssureModel>(url);
  }
  getUserById(_id: string): Observable<AssureModel> {
    return this.http.get<AssureModel>(`${this.apiUrl}/api/assures/${_id}`);
  }
  updateUser(user: AssureModel): Observable<AssureModel> {
    const url = `${this.apiUrl}/api/assures/updateAssure/${user._id}`; // Assuming your API endpoint for updating a user is /users/:id
    return this.http.put<AssureModel>(url, user);
  }
  searchUsers(searchTerm: string): Observable<AssureModel[]> {
    return this.http.get<AssureModel[]>(`${this.apiUrl}/search?username=${searchTerm}`);
  }
  getDistance(_id: string){
    return this.http.get('/api/Admins/RetreiveDistance/'+_id);
  }
  
}
