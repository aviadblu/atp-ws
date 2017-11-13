import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FavoritesService} from "../../../services/favorites.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-new-website',
  styles: [
      `
      mat-form-field {
        width: 100%;
      }
    `
  ],
  template: `
    <h2 mat-dialog-title>{{headline}}</h2>
    <mat-dialog-content>
      <form [formGroup]="newWebsiteForm">
        <div>
          <mat-form-field>
            <input matInput [formControl]="newWebsiteForm.controls['name']" placeholder="Website name">
          </mat-form-field>

          <mat-form-field>
            <input type="url" matInput [formControl]="newWebsiteForm.controls['url']" placeholder="Website URL">
            <mat-hint align="start"
                      *ngIf="newWebsiteForm.controls['url'].errors &&
                             newWebsiteForm.controls['url'].dirty &&
                             newWebsiteForm.controls['url'].errors.validUrl">
              Invalid URL
            </mat-hint>
          </mat-form-field>

        </div>
      </form>


    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-raised-button (click)="onSubmit()">{{saveText}}</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button mat-raised-button mat-dialog-close>Cancel</button>
    </mat-dialog-actions>
  `
})
export class AddNewWebsiteComponent implements OnInit {
  newWebsiteForm: FormGroup;
  headline: string = 'Add a new website';
  saveText: string = 'Add website';

  private beforeEditData = {
    id: '',
    name: '',
    url: ''
  };
  private editMode = false;

  constructor(public dialogRef: MatDialogRef<AddNewWebsiteComponent>,
              private fb: FormBuilder,
              private favSvc: FavoritesService,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    if (data.mode == 'edit') {
      this.editMode = true;
      this.headline = 'Edit website';
      this.saveText = 'Save changes';
      this.beforeEditData = data.data;
    }

    this.newWebsiteForm = this.fb.group({
      'name': [this.beforeEditData.name || '', Validators.required],
      'url': [this.beforeEditData.url || '', [Validators.required, ValidateUrl]]
    });

  }

  onSubmit() {
    if (this.newWebsiteForm.valid) {
      if (this.editMode) {
        this.favSvc.saveFavoriteWebsite(this.beforeEditData.id, this.newWebsiteForm.value);
      } else {
        this.favSvc.addNewFavoriteWebsite(this.newWebsiteForm.value);
      }
      this.dialogRef.close();
    }
  }

  ngOnInit() {
  }

}


export function ValidateUrl(control: AbstractControl) {
  const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
  if (!control.value.match(regex)) {
    return {validUrl: true};
  }
  return null;
}
