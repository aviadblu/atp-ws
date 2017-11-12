import {Component, OnInit} from '@angular/core';
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {MatDialog} from "@angular/material";
import {AddNewWebsiteComponent} from "./add-new-website/add-new-website.component";
import {FavoritesService} from "../../services/favorites.service";

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.less']
})
export class WebsitesComponent implements OnInit {
  displayedColumns = ['name', 'url', 'actions'];
  dataSource;
  filter: string = '';
  view: string = 'grid';

  constructor(public dialog: MatDialog,
              private favSvc: FavoritesService) {
    //favSvc.initData()
    this.dataSource = favSvc.getFavoritesWebsitesDataSource();
  }

  ngOnInit() {
  }

  filterData(filterText) {
    this.filter = filterText;
  }

  clearFilter() {
    this.filter = '';
  }

  toggleViewMode() {
    this.view = this.view == 'list' ? 'grid' : 'list';
  }

  openAddNewDialog(): void {
    let dialogRef = this.dialog.open(AddNewWebsiteComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
