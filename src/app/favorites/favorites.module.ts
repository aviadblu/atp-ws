import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {MaterialModule} from "../material/material.module";
import {WebsitesComponent} from './websites/websites.component';
import {ActionsLogComponent} from './actions-log/actions-log.component';
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [MainComponent, WebsitesComponent, ActionsLogComponent],
  exports: [MainComponent, WebsitesComponent, ActionsLogComponent]
})
export class FavoritesModule {
}
