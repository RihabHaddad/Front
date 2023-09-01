import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssureModel } from 'src/app/modules/auth/models/assure.model';
import { Card } from 'src/app/pages/cards/card.model';
import { CardService } from 'src/app/pages/cards/cards.service';
import { DataService } from 'src/app/pages/dashboard/DataService';
import { UserService } from 'src/app/pages/user.service';

@Component({
  selector: 'app-tables-widget12',
  templateUrl: './tables-widget12.component.html',
})
export class TablesWidget12Component implements OnInit {
  cards: Card[] = [];
  data: any[] = [];
  users: AssureModel[] = [];
   userRating: number = 0; 
  private dataSubscription: Subscription;


  
  constructor(private cardService:CardService,private dataService: DataService,private userService: UserService) {}
  ngOnInit(): void {    this.loadAllCards(); this.loadData(); this.loadAllusersCards() ;
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
    loadAllusersCards() {
      this.userService.getUsers().subscribe(
        (users: AssureModel[]) => {
          this.users = users;
          console.log('Users:', users); // Afficher les utilisateurs dans la console
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
    }

  loadData() {
    this.dataSubscription = this.dataService.getDataFromSpark().subscribe(
      response => {
        this.data = response;
      },
      error => {
        console.error('API request error:', error);
      }
    );
    }}

