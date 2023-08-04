import { Component, OnInit } from '@angular/core';
import { Card } from './card.model';
import { CardService } from './cards.service';


@Component({
  selector: 'app-card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.loadAllCards();
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

  createCard() {
    const newCard: Card = {
      _id:'1',
      vehicleNumber: 'ABC123',
      ownerName: 'John Doe',
      registrationDate: new Date('2023-07-30'),
      expiryDate: new Date('2024-07-30'),
      NumContrat: '123456789',
      DriverId: 12345,
      NumImmatricule: '123456',
      NumSerie: '987654',
      ClassBonus: 'A',
      Marque: 'Toyota',
      Puissance: '120hp',
      NbrePlace: '5'
    };

    this.cardService.createCard(newCard).subscribe(
      (createdCard: Card) => {
        console.log('New card created:', createdCard);
        this.loadAllCards(); // Reload the list of cards after creating a new one
      },
      (error) => {
        console.error('Error creating card:', error);
      }
    );
  }
}
