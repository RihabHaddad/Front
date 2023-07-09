import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: UserModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response: UserModel[]) => {
        console.log(response); // Affiche la réponse du service dans la console
        this.users = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.getUsers();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
