import { Component, Input, OnInit } from '@angular/core';
import { IconUserModel } from '../icon-user.model';
import { UserModel } from 'src/app/pages/user/user.model';
import { UserService } from 'src/app/pages/user.service';
import { AssureModel } from 'src/app/modules/auth/models/assure.model';

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
}






}