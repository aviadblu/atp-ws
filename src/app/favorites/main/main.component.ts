import {Component, OnInit} from '@angular/core';
import {FavoritesService} from "../../services/favorites.service";
import {ActionsLogService} from "../../services/actions-log.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  websitesCounter: number = 0;
  actionLogsCounter: number = 0;
  isPhone: boolean = false;

  constructor(private favSvc: FavoritesService,
              private alSvc: ActionsLogService,
              private breakpointObserver: BreakpointObserver) {

    this.favSvc.websitesCounter$
      .subscribe(count => {
        this.websitesCounter = count;
      });

    this.alSvc.actionsLogCounter$
      .subscribe(count => {
        this.actionLogsCounter = count;
      });

    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isPhone = result.matches;
    });
  }

  ngOnInit() {
  }

}
