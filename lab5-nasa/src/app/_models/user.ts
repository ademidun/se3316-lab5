export class User {
  _id: string;
  email: string;
  password: string;
  collections: any[];
  firstName: string;
  lastName: string;
  security_policy: any;
  privacy_policy: any;



  constructor(email?: any, password?: string) {
    this.email = email ? email : '';
    this.password = password ? password : '';
    this.collections = [];
  }
}
