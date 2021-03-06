import {Component} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog} from "@angular/material";
import {AddNewWebsiteComponent} from "./add-new-website/add-new-website.component";
import {FavoritesService} from "../../services/favorites.service";
import {DeleteConfirmDialogComponent} from "./delete-confirm-dialog/delete-confirm-dialog.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.less']
})
export class WebsitesComponent {
  displayedColumns = ['name', 'url', 'actions'];
  dataSource;
  filter: string = '';
  view: string = 'list';
  isPhone: boolean = false;

  constructor(public dialog: MatDialog,
              private favSvc: FavoritesService,
              private breakpointObserver: BreakpointObserver) {

    this.dataSource = favSvc.getFavoritesWebsitesDataSource();

    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isPhone = result.matches;
    });
  }

  filterData(filterText) {
    this.filter = filterText;
    this.dataSource.filter = filterText;
  }

  clearFilter() {
    this.filter = '';
    this.dataSource.filter = '';
  }

  toggleViewMode() {
    this.view = this.view == 'list' ? 'grid' : 'list';
  }

  openAddNewDialog(): void {
    this.dialog.open(AddNewWebsiteComponent, {
      width: '300px', data: {
        mode: 'add'
      }
    });
  }

  openEditDialog(ws): void {
    this.dialog.open(AddNewWebsiteComponent, {
      width: '300px', data: {
        mode: 'edit',
        data: ws
      }
    });
  }

  confirmDeleteDialog(ws): void {
    this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px'
    })
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.favSvc.deleteFavoriteWebsite(ws);
        }
      });
  }

}
