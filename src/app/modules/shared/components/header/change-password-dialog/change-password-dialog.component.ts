import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {AuthService} from "../../../../auth/services/auth.service";



@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  changePasswordFormGroup: FormGroup;

  onPasswordChange = new EventEmitter();

  errorMessage: string = '';


  constructor(private _matDialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private _authService: AuthService) {
  }

  ngOnInit() {
    this._initializeForm();
  }


  private _initializeForm() {
    this.changePasswordFormGroup = new FormGroup({
      'old_password': new FormControl(null, Validators.required),
      'new_password': new FormControl(null, Validators.required),
      'confirmNewPassword': new FormControl(null, [Validators.required, this._validateConfirmPasswordInputFieldMatch])
    });
  }

  private _validateConfirmPasswordInputFieldMatch(control: FormControl): { [s: string]: boolean } {
    if (control.root['controls'] && control.value) {
      const new_password = control.root['controls'].new_password.value;
      const confirmNewPassword = control.value;

      if (new_password === confirmNewPassword) {
        return null; // confirm password input field is valid because it matches with password
      } else {
        return {'confirm password does NOT match with password': true}; // confirm password input field is NOT valid
      }
    }
  }


  save() {
    if (this.changePasswordFormGroup.valid) {
      const requestData = {
        'old_password': this.changePasswordFormGroup.value.old_password,
        'new_password': this.changePasswordFormGroup.value.new_password,
        'id': localStorage.getItem('user_id')
      };
      this._authService.changePassword(requestData).subscribe(() => {
        this.errorMessage = '';
        this._matDialogRef.close();
        this.onPasswordChange.emit();
      }, (err) => {
        this.errorMessage = err['error']['errs'][0];
      });
    }
  }
}
