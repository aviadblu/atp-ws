import {Component, OnInit} from '@angular/core';
import {ActionsLogService} from "../../services/actions-log.service";

@Component({
  selector: 'app-actions-log',
  templateUrl: './actions-log.component.html',
  styleUrls: ['./actions-log.component.less']
})
export class ActionsLogComponent implements OnInit {
  displayedColumns = ['time', 'action', 'name', 'url'];
  dataSource;
  filter: string = '';

  constructor(private actionsLogSvc: ActionsLogService) {
    this.dataSource = actionsLogSvc.getActionsLogDataSource();
  }

  ngOnInit() {
  }

}
