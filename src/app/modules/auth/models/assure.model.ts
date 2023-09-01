import { Card } from "src/app/pages/cards/card.model";

export class AssureModel {
   _id: string;
    DriverId: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    cin: string;
    drivingLicense: string;
    registrationCards: Card[];
  }