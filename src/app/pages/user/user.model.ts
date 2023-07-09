
export class UserModel {

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