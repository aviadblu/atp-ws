import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Remove favorite website?</h2>
    <mat-dialog-content>This action will remove favorite website permanently.</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-raised-button [mat-dialog-close]="true">Remove website</button>
      <button mat-button mat-raised-button [mat-dialog-close]="false">cancel</button>
    </mat-dialog-actions>
  `
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
