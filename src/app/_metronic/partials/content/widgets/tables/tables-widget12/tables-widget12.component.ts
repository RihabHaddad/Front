import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssureModel } from 'src/app/modules/auth/models/assure.model';
import { Card } from 'src/app/pages/cards/card.model';
import { CardService } from 'src/app/pages/cards/cards.service';
import { DataService } from 'src/app/pages/dashboard/DataService';
import { UserService } from 'src/app/pages/user.service';
import { RatingService } from './RatingService';
import { SelectedDriverService } from '../../mixed/mixed-widget1/SelectedDriverService';


@Component({
  selector: 'app-tables-widget12',
  templateUrl: './tables-widget12.component.html',
})
export class TablesWidget12Component implements OnInit {
  cards: Card[] = [];
  data: any[] = [];
  data1: any[] = [];
  users: AssureModel[] = [];
  userRatings: { [key: string]: number } = {};
  searchTerm: string = '';
  private dataSubscription: Subscription;

  constructor(
    private cardService: CardService,
    private dataService: DataService,
    private userService: UserService,
    private ratingService: RatingService,private selectedDriverService: SelectedDriverService
  ) {}
  

  ngOnInit(): void {
    this.loadAllCards();
    this.loadData();
    this.loadAllUsersCards();
    this.loadData1();
  }
  selectDriver(driverId: string) {
    this.selectedDriverService.setSelectedDriver(driverId);
  }
  setRating(rating: number, userId: string) {
    this.userRatings[userId] = rating;

    // Send the rating to the server using the RatingService
    this.ratingService.sendRating(userId, rating).subscribe(
      (response) => {
        console.log('Rating sent successfully!', response);
      },
      (error) => {
        console.error('Error sending rating:', error);
      }
    );
  }

  getBehavior(driverId: string): string {
    const behaviorData = this.data.find((d) => d.DriverId === driverId);
    return behaviorData ? behaviorData.Behavior : '';
  }

  getEcoDriving(driverId: string): string {
    const ecoDrivingData = this.data1.find((d) => d.DriverId === driverId);
    return ecoDrivingData ? ecoDrivingData.EcoDriving : '';
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

  loadAllUsersCards() {
    this.userService.getUsers().subscribe(
      (users: AssureModel[]) => {
        this.users = users;
        console.log('Users:', users); // Display users in the console
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }
  searchUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.loadAllUsersCards(); // Réinitialiser la liste des utilisateurs en cas de recherche vide
      return;
    }
   
    this.userService.searchUsers(searchTerm).subscribe(
      (users: AssureModel[]) => {
        this.users = users; // Mettre à jour la liste des utilisateurs avec les résultats de recherche
      },
      (error) => {
        console.error('Erreur lors de la recherche des utilisateurs:', error);
      }
    );
  }
  loadData() {
    this.dataSubscription = this.dataService.getDataFromSpark().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('API request error:', error);
      }
    );
  }

  loadData1() {
    this.dataSubscription = this.dataService.getDataFromSpark2().subscribe(
      (response) => {
        this.data1 = response;
      },
      (error) => {
        console.error('API request error:', error);
      }
    );
  }
}
