import {Injectable} from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {FavoriteWebsite} from "../models/favorite-website.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class FavoritesService {
  favoritesWebsites$: BehaviorSubject<FavoriteWebsite[]> = new BehaviorSubject([]);
  private favoriteWebsitesDataSource;
  private localWebsitesList;

  constructor(private firebaseSvc: FirebaseService) {
    this.favoriteWebsitesDataSource = new FavoriteWebsitesDataSource(this.favoritesWebsites$);


    this.firebaseSvc.fb.ref(`/websites`)
      .on('value', this.onWebsitesValueChanged.bind(this));

    this.favoritesWebsites$.subscribe(list => {
      this.localWebsitesList = list;
    });
  }

  private onWebsitesValueChanged(snapshot) {
    const wsValue = snapshot.val();
    this.favoritesWebsites$.next(wsValue);
  }

  initData() {
    console.log('init service');

    let self = this;
    let websitesRef = self.firebaseSvc.fb.ref(`/websites`);
    websitesRef.set([
      {
        name: 'test name',
        url: 'http://www.a.com',
        thumbnail: '/assets/img/screenshot-demo.jpg'
      },
      {
        name: 'test name 2',
        url: 'http://www.b.com',
        thumbnail: '/assets/img/screenshot-demo.jpg'
      },
      {
        name: 'test name 3',
        url: 'http://www.c.com',
        thumbnail: '/assets/img/screenshot-demo.jpg'
      }
    ]);
  }

  addNewFavoriteWebsite(payload) {
    payload.thumbnail = '/assets/img/screenshot-soon.jpg';
    this.localWebsitesList.push(payload);
    this.saveList();
  }

  private saveList() {
    this.firebaseSvc.fb.ref(`/websites`).update(this.localWebsitesList);
  }

  getFavoritesWebsitesDataSource() {
    return this.favoriteWebsitesDataSource;
  }

}

class FavoriteWebsitesDataSource extends DataSource<any> {
  data$: Observable<FavoriteWebsite[]>;

  constructor(dataObserver) {
    super();
    this.data$ = dataObserver;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FavoriteWebsite[]> {
    return this.data$;
  }

  disconnect() {
  }
}
