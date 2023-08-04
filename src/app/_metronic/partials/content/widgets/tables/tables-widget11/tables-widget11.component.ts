import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Card } from 'src/app/pages/cards/card.model';
import { CardService } from 'src/app/pages/cards/cards.service';

@Component({
  selector: 'app-tables-widget11',
  templateUrl: './tables-widget11.component.html',
})
export class TablesWidget11Component implements OnInit {
  cards: Card[] = [];
  currentStep = 1;
  cardInfo: any = {};

  constructor(private cardService: CardService , private router: Router) { }

  ngOnInit(): void {
    this.loadAllCards();
  }
  redirectToNewCardPage() {
    // Effectuez la redirection vers la page "/crafted/account/settings"
    this.router.navigate(['/AddCards']);
  }
  deleteCard(_id: string) {
    this.cardService.deleteCard(_id)
      .pipe(first())
      .subscribe(() => this.loadAllCards());
  }
  loadAllCards() {
    this.cardService.getAllCards().subscribe(
      (cards: Card[]) => {
        this.cards = cards;
      },
      (error) => {
        console.error('Error loading cards:', error);
      }
    );
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
}
