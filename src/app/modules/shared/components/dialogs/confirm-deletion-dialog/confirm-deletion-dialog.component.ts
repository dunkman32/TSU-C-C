import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";



@Component({
  selector: 'app-confirm-deletion-dialog',
  templateUrl: './confirm-deletion-dialog.component.html',
  styleUrls: ['./confirm-deletion-dialog.component.scss']
})
export class ConfirmDeletionDialogComponent {
  onDelete = new EventEmitter();


  constructor(public matDialogRef: MatDialogRef<ConfirmDeletionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private _matDialogData: any) {
  }


  // closeDialog(wasAStudentDeleted: boolean) {
  //   this._matDialogRef.close(wasAStudentDeleted);
  // }

  delete() {
    this.onDelete.emit();
    // this.closeDialog(true);
    // this.matDialogRef.close();
  }
}
