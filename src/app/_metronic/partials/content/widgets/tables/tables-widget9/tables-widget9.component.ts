import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
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
   , private elementRef: ElementRef ,private http: HttpClient ) { }
  
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
defaultBackgroundColor = '#FF9800'; // You can change the color as per your preference
aaavatarColors = ['#FF9800', '#4CAF50', '#2196F3', '#F44336', '#9C27B0', '#3F51B5', '#FFC107', '#009688'];

  // Function to get a random background color for each user's avatar
  
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

searchUserss(searchTerm: string): void {
  if (!searchTerm) {
    this.getUsers(); // Réinitialiser la liste des utilisateurs en cas de recherche vide
    return;
  }

  this.userService.searchUsers(searchTerm).subscribe(
    (users: AssureModel[]) => {
      this.Listuser = users; // Mettre à jour la liste des utilisateurs avec les résultats de recherche
    },
    (error) => {
      console.error('Erreur lors de la recherche des utilisateurs:', error);
    }
  );
}
createUser(): void {
  this.userService.createUser(this.newUser)
    .subscribe((user: UserModel) => {
      console.log('User created:', user);
    }, (error) => {
      console.error('Error creating user:', error);
    });
}
avatarColors: string[] = ['#FF9800', '#4CAF50', '#2196F3', '#F44336', '#9C27B0', '#3F51B5', '#FFC107', '#009688'];

// Associer chaque utilisateur à une couleur unique
userAvatarColors: Map<string, string> = new Map<string, string>();

// ... (autres propriétés et méthodes)

// Fonction pour associer chaque utilisateur à une couleur unique
associateUserWithColor(user: AssureModel): string {
  if (!this.userAvatarColors.has(user._id)) {
    const randomIndex = Math.floor(Math.random() * this.avatarColors.length);
    this.userAvatarColors.set(user._id, this.avatarColors[randomIndex]);
  }
  const userColor = this.userAvatarColors.get(user._id);
  return userColor !== undefined ? userColor : ''; // Utilisez une valeur par défaut (une chaîne vide '') si userColor est undefined.
}

searchTerm: string;
users: any[] = [];
errorMessage: string;


searchUsers() {
  if (!this.searchTerm) {
    this.errorMessage = 'Veuillez fournir un terme de recherche valide';
    return;
  }

  this.http.get<AssureModel[]>(`/search?username=${this.searchTerm}`)
    .subscribe(
      (response) => {
        if (response.length === 0) {
          this.errorMessage = 'Aucun utilisateur trouvé';
          this.users = [];
        } else {
          this.users = response;
          this.errorMessage = '';
        }
      },
      (error) => {
        this.errorMessage = 'Une erreur est survenue lors de la recherche des utilisateurs';
        console.error(error);
      }
    );
}

}







  
