import {NgModule} from '@angular/core';
import {MatIconModule, MatListModule, MatSidenavModule} from "@angular/material";

@NgModule({
  imports: [
    MatListModule,
    MatSidenavModule,
    MatIconModule
  ],
  declarations: [],
  exports: [
    MatListModule,
    MatSidenavModule,
    MatIconModule
  ]
})
export class MaterialModule {
}
