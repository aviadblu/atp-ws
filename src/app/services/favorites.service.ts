import {Injectable} from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {FavoriteWebsite} from "../models/favorite-website.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import {ActionsLogService} from "./actions-log.service";

@Injectable()
export class FavoritesService {
  favoritesWebsites$: BehaviorSubject<FavoriteWebsite[]> = new BehaviorSubject([]);
  websitesCounter$: BehaviorSubject<number> = new BehaviorSubject(0);

  private favoriteWebsitesDataSource;
  private localWebsitesList;

  constructor(private firebaseSvc: FirebaseService,
              private actionsLogSvc: ActionsLogService) {
    this.favoriteWebsitesDataSource = new FavoriteWebsitesDataSource(this.favoritesWebsites$);


    this.firebaseSvc.fb.ref(`/websites`)
      .on('value', this.onWebsitesValueChanged.bind(this));

    this.favoritesWebsites$.subscribe(list => {
      this.localWebsitesList = this.listToArray(list);
      this.websitesCounter$.next(this.localWebsitesList.length);
    });
  }

  private onWebsitesValueChanged(snapshot) {
    const wsValue = snapshot.val() || {};
    this.favoritesWebsites$.next(this.listToArray(wsValue));
  }

  private listToArray(list) {
    let arr = [];
    Object.keys(list).forEach(ws => {
      arr.push(list[ws]);
    });
    return arr;
  }

  getFavoritesWebsitesDataSource() {
    return this.favoriteWebsitesDataSource;
  }

  addNewFavoriteWebsite(payload) {
    payload.thumbnail = '/assets/img/progress-loader.gif';
    let newId = FirebaseService.hashString(new Date().getTime() + payload.url);
    payload.id = newId;
    this.firebaseSvc.fb.ref(`/websites`).child(newId).update(payload);
    this.actionsLogSvc.addActionLog('Website was added', {
      name: payload.name,
      url: payload.url
    });
  }

  saveFavoriteWebsite(id, payload) {
    this.firebaseSvc.fb.ref(`/websites`).child(id).update(payload);
    this.actionsLogSvc.addActionLog('Website was edited', {
      name: payload.name,
      url: payload.url
    });
  }

  deleteFavoriteWebsite(payload) {
    this.firebaseSvc.fb.ref(`/websites`).child(payload.id).remove();
    this.actionsLogSvc.addActionLog('Website was removed', {
      name: payload.name,
      url: payload.url
    });
  }
}

class FavoriteWebsitesDataSource extends DataSource<any> {
  private data$: Observable<FavoriteWebsite[]>;
  private filterChange$ = new BehaviorSubject('');

  private _filter: string = '';
  set filter(value: string) {
    this._filter = value;
    this.filterChange$.next(value);
  }

  constructor(dataObserver) {
    super();
    this.data$ = dataObserver;
  }

  connect(): Observable<FavoriteWebsite[]> {

    const displayDataChanges = [
      this.data$,
      this.filterChange$,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      let ws = [];
      this.data$.take(1).subscribe(wsRes => {
        ws = wsRes;
      });
      return ws.filter(w => {
        let searchStr = (w.name + w.url).toLowerCase();
        return searchStr.indexOf(this._filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {
  }
}
