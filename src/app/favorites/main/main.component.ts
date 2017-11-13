import {Component, OnInit} from '@angular/core';
import {FavoritesService} from "../../services/favorites.service";
import {ActionsLogService} from "../../services/actions-log.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  websitesCounter: number = 0;
  actionLogsCounter: number = 0;

  constructor(private favSvc: FavoritesService,
              private alSvc: ActionsLogService) {

    this.favSvc.websitesCounter$
      .subscribe(count => {
        this.websitesCounter = count;
      });

    this.alSvc.actionsLogCounter$
      .subscribe(count => {
        this.actionLogsCounter = count;
      });
  }

  ngOnInit() {
  }

}
