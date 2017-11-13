import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {MaterialModule} from "../material/material.module";
import {WebsitesComponent} from './websites/websites.component';
import {ActionsLogComponent} from './actions-log/actions-log.component';
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddNewWebsiteComponent} from './websites/add-new-website/add-new-website.component';
import {FavoritesService} from "../services/favorites.service";
import {FirebaseService} from "../services/firebase.service";
import {DeleteConfirmDialogComponent} from './websites/delete-confirm-dialog/delete-confirm-dialog.component';
import {ActionsLogService} from "../services/actions-log.service";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddNewWebsiteComponent,
    DeleteConfirmDialogComponent
  ],
  providers: [
    FirebaseService,
    FavoritesService,
    ActionsLogService
  ],
  declarations: [MainComponent, WebsitesComponent, ActionsLogComponent, AddNewWebsiteComponent, DeleteConfirmDialogComponent],
  exports: [MainComponent, WebsitesComponent, ActionsLogComponent]
})
export class FavoritesModule {
}
