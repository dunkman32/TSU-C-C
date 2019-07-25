import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material";
import {AddOrEditWorkExperienceDialogComponent} from "./add-or-edit-work-experience-dialog/add-or-edit-work-experience-dialog.component";
import {MatSnackBarService} from "../../../../shared/services/mat-snack-bar.service";
import {ConfirmDeletionDialogComponent} from "../../../../shared/components/dialogs/confirm-deletion-dialog/confirm-deletion-dialog.component";
import {StudentsService} from "../../../../public/services/students.service";



@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent {
  @Output() onWorkExperiencesChange = new EventEmitter();
  @Input() workExperiences: object[];
  @Input() canEdit: boolean;


  constructor(private _matDialog: MatDialog,
              private _matSnackBarService: MatSnackBarService,
              private _studentsService: StudentsService) {
  }


  openAddOrEditWorkExperienceDialog(clickedWorkExperience: object) {
    const dialogRef = this._matDialog.open(AddOrEditWorkExperienceDialogComponent, {
      'data': clickedWorkExperience
    });

    const saveSubscription = dialogRef.componentInstance.onSave.subscribe(() => {
      this.onWorkExperiencesChange.emit();
      this._matSnackBarService.openSnackBar('სამუშაო გამოცდილება შეინახა');
    });

    dialogRef.afterClosed().subscribe(() => {
      saveSubscription.unsubscribe();
    })
  }

  openConfirmDeletionDialog(clickedWorkExperience: object) {
    const dialogRef = this._matDialog.open(ConfirmDeletionDialogComponent, {
      'data': null
    });

    const deleteSubscription = dialogRef.componentInstance.onDelete.subscribe(() => {
      this._deleteWorkExperience(clickedWorkExperience).subscribe(() => {
        dialogRef.close();
        this.onWorkExperiencesChange.emit();
        this._matSnackBarService.openSnackBar('სამუშაო გამოცდილება წაიშალა');
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      deleteSubscription.unsubscribe();
    })
  }

  private _deleteWorkExperience(workExperienceToDelete: object) {
    if (!workExperienceToDelete) {
      return;
    }

    workExperienceToDelete['_destroy'] = true;
    let reqData: object = {
      user: {
        'id': JSON.parse(localStorage.getItem('userData')).id,
        'user_portfolios_attributes': [workExperienceToDelete]
      }
    };
    return this._studentsService.addOrEditOrDeleteWorkExperience(reqData);
  }
}
