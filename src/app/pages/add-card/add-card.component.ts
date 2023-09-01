import { Component, OnInit } from '@angular/core';
import { Card } from '../cards/card.model';
import { CardService } from '../cards/cards.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  currentStep = 1;
  cardInfo: Card = {
    _id:'',
    vehicleNumber: '',
    ownerName: '',
    registrationDate: new Date(),
    expiryDate: new Date(),
    NumContrat: '',
    DriverId: 0,
    NumImmatricule: '',
    NumSerie: '',
    ClassBonus: '',
    Marque: '',
    Puissance: '',
    NbrePlace: '',

  };

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }
  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }
  handleImageChange(event: any) {
    // Add your image handling logic here
    // For example, you can access the selected file using event.target.files[0]
  }
  submitForm() {
    // Ici, vous pouvez envoyer les données du formulaire au backend pour traitement.
    console.log(this.cardInfo);
  } 
 

 
  saveCard(): void {
    // Effectuez les vérifications et les validations nécessaires ici

    // Appelez le service pour ajouter la carte
    this.cardService.createCard(this.cardInfo).subscribe(
      () => {
        // Réinitialisez les valeurs du formulaire et l'indicateur de chargement
        this.cardInfo = {
          _id:'',
          vehicleNumber: '',
          ownerName: '',
          registrationDate: new Date(),
          expiryDate: new Date(),
          NumContrat: '',
          DriverId: 0,
          NumImmatricule: '',
          NumSerie: '',
          ClassBonus: '',
          Marque: '',
          Puissance: '',
          NbrePlace: '',
        };
        
        // Effectuez d'autres actions nécessaires après l'ajout de la carte
      },
      (error) => {
        // Gérez les erreurs de manière appropriée
        console.error(error);
      }
    );
  }
}
