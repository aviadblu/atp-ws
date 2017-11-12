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

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddNewWebsiteComponent
  ],
  providers: [
    FavoritesService,
    FirebaseService
  ],
  declarations: [MainComponent, WebsitesComponent, ActionsLogComponent, AddNewWebsiteComponent],
  exports: [MainComponent, WebsitesComponent, ActionsLogComponent]
})
export class FavoritesModule {
}
