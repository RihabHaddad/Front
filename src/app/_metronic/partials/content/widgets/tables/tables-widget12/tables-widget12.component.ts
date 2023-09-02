import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssureModel } from 'src/app/modules/auth/models/assure.model';
import { Card } from 'src/app/pages/cards/card.model';
import { CardService } from 'src/app/pages/cards/cards.service';
import { DataService } from 'src/app/pages/dashboard/DataService';
import { UserService } from 'src/app/pages/user.service';
import { RatingService } from './RatingService';

@Component({
  selector: 'app-tables-widget12',
  templateUrl: './tables-widget12.component.html',
})
export class TablesWidget12Component implements OnInit {
  cards: Card[] = [];
  data: any[] = [];
  data1: any[] = [];
  users: AssureModel[] = [];
   userRating: number = 0; 
  private dataSubscription: Subscription;


  
  constructor(private cardService:CardService,private dataService: DataService,private userService: UserService,private ratingService: RatingService) {}
  ngOnInit(): void {    this.loadAllCards(); this.loadData(); this.loadAllusersCards() ;
    this.loadData1();
  }
 

  setRating(rating: number) {
    this.userRating = rating;
    
    // Envoie la note au serveur en utilisant le service
    this.ratingService.sendRating(rating).subscribe(response => {
      console.log('Note envoyée avec succès !', response);
    }, error => {
      console.error('Erreur lors de l\'envoi de la note :', error);
    });
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
    }
  
    loadData1() {
      this.dataSubscription = this.dataService.getDataFromSpark2().subscribe(
        response => {
          this.data1 = response;
        },
        error => {
          console.error('API request error:', error);
        }
      );
      }
  
  }

