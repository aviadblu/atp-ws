import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {FavoritesService} from "../../../services/favorites.service";
import {MatDialogRef} from "@angular/material";

0

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
    <h2 mat-dialog-title>Add a new website</h2>
    <mat-dialog-content>
      <form [formGroup]="newWebsiteForm">
        <div>
          <mat-form-field>
            <input matInput [formControl]="newWebsiteForm.controls['name']" placeholder="Website name">
          </mat-form-field>

          <mat-form-field>
            <input type="url" matInput [formControl]="newWebsiteForm.controls['url']" placeholder="Website URL">
          </mat-form-field>

        </div>
      </form>


    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onSubmit()">Add website</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button mat-dialog-close>Cancel</button>
    </mat-dialog-actions>
  `
})
export class AddNewWebsiteComponent implements OnInit {
  newWebsiteForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddNewWebsiteComponent>,
              private fb: FormBuilder,
              private favSvc: FavoritesService) {

    this.newWebsiteForm = this.fb.group({
      'name': ['', Validators.required],
      'url': ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.newWebsiteForm.valid) {
      this.favSvc.addNewFavoriteWebsite(this.newWebsiteForm.value);
      this.dialogRef.close();
    }
  }

  ngOnInit() {
  }

}

const urlRegExp = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;

function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const forbidden = urlRegExp.test(control.value);
    return forbidden ? {'forbiddenUrl': {value: control.value}} : null;
  };
}
