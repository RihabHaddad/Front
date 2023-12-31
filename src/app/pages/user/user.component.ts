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
  
  }

  
}
