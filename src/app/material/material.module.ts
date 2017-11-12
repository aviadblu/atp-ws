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
    MatDialogModule
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
    MatDialogModule
  ]
})
export class MaterialModule {
}
