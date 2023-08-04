import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../cards/cards.service';
import { Card } from '../cards/card.model';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html', // Create the corresponding HTML template
})
export class UpdateCardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}

  selectedCard: Card = new Card();
  isLoading: boolean = false;
  currentStep = 1;
  ngOnInit() {
    console.log('ngOnInit() of UpdateCardComponent called');
    this.route.paramMap.subscribe((params) => {
      const _id = params.get('_id');
      console.log('_id:', _id);

      if (_id) {
        this.cardService.getCardById(_id).subscribe((card) => {
          console.log('API call returned card data:', card);
          this.selectedCard = { ...card };
          console.log('selectedCard updated:', this.selectedCard);
        });
      }
    });
  }

  onEditCard(card: Card) {
    // Create a copy of the card object to avoid directly modifying the original
    this.selectedCard = { ...card };
    console.log('selectedCard updated in onEditCard:', this.selectedCard);
  }

  updateSelectedCard() {
    this.cardService.updateCard(this.selectedCard).subscribe(
      (updatedCard) => {
        console.log('Card updated successfully:', updatedCard);
      },
      (error) => {
        console.error('Error updating card:', error);
        // Handle the error according to your requirements (display an error message, perform a specific action, etc.).
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
}
