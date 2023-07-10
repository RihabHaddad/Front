import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/pages/user.service';
import { UserModel } from 'src/app/pages/user/user.model';

@Component({
  selector: 'app-tables-widget9',
  templateUrl: './tables-widget9.component.html',
})
export class TablesWidget9Component {
  Listuser: UserModel[] = [];

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.getUsers();
  }
  
  getUsers() {
    this.userService.getUsers().subscribe(
      (response: UserModel[]) => {
        console.log(response); // Affiche la réponse du service dans la console
        this.Listuser = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
 
  deleteUser(_id: string) {
    this.userService.deleteUser(_id)
        .pipe(first())
        .subscribe(() => this.getUsers());
}
newUser: UserModel = {
  _id: "",
  username: '',
  email: '',
  password: '',
  token: '',
  setUser: function (_user: unknown): void {
    throw new Error('Function not implemented.');
  }
};

createUser(): void {
  this.userService.createUser(this.newUser)
    .subscribe((user: UserModel) => {
      console.log('User created:', user);
    }, (error) => {
      console.error('Error creating user:', error);
    });
}
}







  
