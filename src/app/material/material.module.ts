import {NgModule} from '@angular/core';
import {
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatButtonModule,
  MatGridListModule,
  MatDialogModule
} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";

@NgModule({
  imports: [
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    LayoutModule
  ],
  declarations: [],
  exports: [
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    LayoutModule
  ]
})
export class MaterialModule {
}
