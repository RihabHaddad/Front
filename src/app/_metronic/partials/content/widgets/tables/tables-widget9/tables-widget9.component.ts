import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/pages/user.service';
import { UserModel } from 'src/app/pages/user/user.model';


class AssureModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cin: string;
  drivingLicense: string;
  username: string;
}

@Component({
  selector: 'app-tables-widget9',
  templateUrl: './tables-widget9.component.html',
})
export class TablesWidget9Component {
  Listuser: AssureModel[] = [];
  
  selectedUser: AssureModel = new AssureModel();
  constructor(private userService: UserService , private router: Router
    ) { }
  
  ngOnInit() {
    this.getUsers();
  }
  
  getUsers() {
    this.userService.getUsers().subscribe(
      (response: AssureModel[]) => {
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
onEditUser(user: AssureModel) {
  // Créez une copie de l'objet utilisateur pour éviter de modifier l'original directement
  this.selectedUser = { ...user };
}
getAvatarLetters(firstName: string, lastName: string): string {
  const usernameFirstLetter = firstName.charAt(0).toUpperCase();
  const lastnameFirstLetter = lastName.charAt(0).toUpperCase();
  return usernameFirstLetter + lastnameFirstLetter;
}
defaultBackgroundColor = '#007bff'; // You can change the color as per your preference
avatarColors = ['#FF9800', '#4CAF50', '#2196F3', '#F44336', '#9C27B0', '#3F51B5', '#FFC107', '#009688'];

  // Function to get a random background color for each user's avatar
  getAvatarBackgroundColor(user: AssureModel): string {
    const randomIndex = Math.floor(Math.random() * this.avatarColors.length);
    return this.avatarColors[randomIndex];
  }
getInitials(firstName: string, lastName: string): string {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}
redirectToNewUserPage() {
  // Effectuez la redirection vers la page "/crafted/account/settings"
  this.router.navigate(['/crafted/account/settings']);
}
redirectToupdateUserPage() {
  // Effectuez la redirection vers la page "/crafted/account/settings"
  this.router.navigate(['/updateusers']);
}
onSearch() {
  // Appeler votre fonction de recherche ici
  // Par exemple : this.getUsers();
}
createUser(): void {
  this.userService.createUser(this.newUser)
    .subscribe((user: UserModel) => {
      console.log('User created:', user);
    }, (error) => {
      console.error('Error creating user:', error);
    });
}


}







  
