import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
   _id: string;
    username: string;
    email: string;
    password: string;
    token:string;
  

    setUser(_user: unknown) {
        const user = _user as UserModel;
        this._id = user._id;
        this.username = user.username || '';
        this.password = user.password || '';
        this.email = user.email || '';
        this.token = user.token || '';
  }
  
  
}
