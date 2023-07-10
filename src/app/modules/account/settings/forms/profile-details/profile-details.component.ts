import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AssureModel } from 'src/app/modules/auth/models/assure.model';
import { UserModel } from 'src/app/modules/auth/models/user.model';
import { UserService } from 'src/app/pages/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent {
  username: string;
  email: string;
  password: string;
  isLoading: boolean = false;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cin: string;
  drivingLicense: string;

  constructor(private userService: UserService) {}

  saveSettings(): void {
    // Vérifiez les valeurs du formulaire et effectuez les validations nécessaires ici
  
    // Créez un nouvel utilisateur avec les valeurs du formulaire
    const newAssure: AssureModel = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      cin: this.cin,
      drivingLicense: this.drivingLicense
    };
  
    
  
    // Appelez le service pour ajouter l'utilisateur
    this.userService.addUser(newAssure).subscribe(
      () => {
        // Réinitialisez les valeurs du formulaire et l'indicateur de chargement
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.cin = '';
        this.drivingLicense = '';
  
        // Effectuez d'autres actions nécessaires après l'ajout de l'utilisateur
      },
      (error) => {
        // Gérez les erreurs de manière appropriée
        console.error(error);
        
      }
    );
  }
}