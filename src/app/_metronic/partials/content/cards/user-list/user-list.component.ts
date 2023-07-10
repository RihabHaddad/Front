import { Component, Input, OnInit } from '@angular/core';
import { IconUserModel } from '../icon-user.model';
import { UserModel } from 'src/app/pages/user/user.model';
import { UserService } from 'src/app/pages/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: Array<IconUserModel> = [];

  user: UserModel[] = [];

constructor(private userService: UserService) { }

ngOnInit() {
  this.getUsers();
}

getUsers() {
  this.userService.getUsers().subscribe(
    (response: UserModel[]) => {
      console.log(response); // Affiche la réponse du service dans la console
      this.user = response;
    },
    (error: any) => {
      console.log(error);
    }
  );
}
deleteUser(userId: number) {
  this.userService.deleteUser(userId.toString()).subscribe(
    () => {
      this.getUsers();
    },
    (error: any) => {
      console.log(error);
    }
  );
}


}