import {Injectable} from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ActionLog} from '../models/action-log.model';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';


@Injectable()
export class ActionsLogService {
  actionsLog$: BehaviorSubject<ActionLog[]> = new BehaviorSubject([]);
  actionsLogCounter$: BehaviorSubject<number> = new BehaviorSubject(0);

  private actionsLogsDataSource;
  private localLogsList;

  constructor(private firebaseSvc: FirebaseService) {
    this.actionsLogsDataSource = new ActionsLogDataSource(this.actionsLog$);


    this.firebaseSvc.fb.ref(`/actions-log`)
      .on('value', this.onActionsLogValueChanged.bind(this));

    this.actionsLog$.subscribe(list => {
      this.localLogsList = this.listToArray(list);
      this.actionsLogCounter$.next(this.localLogsList.length);
    });
  }

  private onActionsLogValueChanged(snapshot) {
    const logsValue = snapshot.val() || {};
    this.actionsLog$.next(this.listToArray(logsValue));
  }

  private listToArray(list) {
    let arr = [];
    Object.keys(list).forEach(key => {
      arr.push(list[key]);
    });
    return arr;
  }

  getActionsLogDataSource() {
    return this.actionsLogsDataSource;
  }

  addActionLog(action, payload) {
    this.firebaseSvc.fb.ref(`/actions-log`).push({
      time: this.getFormattedTime(),
      action: action,
      name: payload.name,
      url: payload.url
    });
  }

  private getFormattedTime() {
    function checkZero(data) {
      if (data.length == 1) {
        data = "0" + data;
      }
      return data;
    }

    var today = new Date();
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);

    return day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
  }

}

class ActionsLogDataSource extends DataSource<any> {
  private data$: Observable<ActionLog[]>;
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

  connect(): Observable<ActionLog[]> {

    const displayDataChanges = [
      this.data$,
      this.filterChange$,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      let logs = [];
      this.data$.take(1).subscribe(logsRes => {
        logs = logsRes;
      });
      return logs.filter(log => {
        let searchStr = (log.name + log.url).toLowerCase();
        return searchStr.indexOf(this._filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {
  }
}
