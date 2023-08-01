import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/pages/cards/card.model';
import { CardService } from 'src/app/pages/cards/cards.service';

@Component({
  selector: 'app-tables-widget11',
  templateUrl: './tables-widget11.component.html',
})
export class TablesWidget11Component implements OnInit {
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
  
}
