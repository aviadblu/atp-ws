import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class FirebaseService {
  private _firebaseInstance;
  private _fb;
  private FacebookProvider;

  constructor() {
    var config = {
      apiKey: "AIzaSyAHkiAkPceE3OzontGXc88vvbGwaoiMuWc",
      authDomain: "atp-ws.firebaseapp.com",
      databaseURL: "https://atp-ws.firebaseio.com",
      projectId: "atp-ws",
      storageBucket: "atp-ws.appspot.com",
      messagingSenderId: "385394053795"
    };
    this._firebaseInstance = firebase;
    firebase.initializeApp(config);
    this._fb = firebase.database();
  }


  get fb() {
    return this._fb;
  }

  get firebaseInstance() {
    return this._firebaseInstance;
  }

  public static hashString(string) {
    return Md5.hashStr(string);
  }

}
