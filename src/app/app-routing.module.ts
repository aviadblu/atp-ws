import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./favorites/main/main.component";
import {WebsitesComponent} from "./favorites/websites/websites.component";
import {ActionsLogComponent} from "./favorites/actions-log/actions-log.component";

const routes: Routes = [
  {
    path: 'favorites',
    component: MainComponent,
    children: [
      {
        path: 'websites',
        component: WebsitesComponent
      },
      {
        path: 'actions-log',
        component: ActionsLogComponent
      },
      {
        path: '',
        redirectTo: 'websites',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: 'favorites/websites',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
