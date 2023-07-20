import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AssureModel } from 'src/app/modules/auth/models/assure.model';
import { UserModel } from 'src/app/modules/auth/models/user.model';
import { UserService } from 'src/app/pages/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.html',
})
export class UpdateUserComponent {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  selectedUser: AssureModel = new AssureModel();
  isLoading: boolean = false;
  ngOnInit() {
    console.log('ngOnInit() of UpdateUserComponent called');
    this.route.paramMap.subscribe((params) => {
      const _id = params.get('_id');
      console.log('_id:', _id);
  
      if (_id) {
        this.userService.getUserById(_id).subscribe((user) => {
          console.log('API call returned user data:', user);
          this.selectedUser = { ...user };
          console.log('selectedUser updated:', this.selectedUser);
        });
      }
    });
    
  }

  onEditUser(user: AssureModel) {
    // Créez une copie de l'objet utilisateur pour éviter de modifier l'original directement
    this.selectedUser = { ...user };
    console.log('selectedUser updated in onEditUser:', this.selectedUser);
  }

  updateSelectedUser() {

    this.userService.updateUser(this.selectedUser).subscribe(
      (updatedUser) => {
        console.log('User updated successfully:', updatedUser);
      },
      (error) => {
        console.error('Error updating user:', error);
        // Gérer l'erreur selon vos besoins (afficher un message d'erreur, effectuer une action spécifique, etc.).
      }
    );
  }
}