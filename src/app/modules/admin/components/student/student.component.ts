import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {StudentsService} from "../../../public/services/students.service";



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentId: string;
  studentInfo: object;
  canEditTheProfile: boolean = false;


  constructor(private _activatedRoute: ActivatedRoute,
              private _ngxSpinnerService: NgxSpinnerService,
              private _studentsService: StudentsService) {
    this._getStudentId();
  }

  ngOnInit() {
    this.canEditTheProfile = this.studentId == JSON.parse(localStorage.getItem('userData')).id;
    this.fetchStudentInfo(this.studentId);
  }


  private _getStudentId() {
    this.studentId = this._activatedRoute.snapshot.paramMap.get('id');
  }

  fetchStudentInfo(id: string) {
    this._ngxSpinnerService.show();

    this._studentsService.getStudent(id).subscribe((res) => {
      this.studentInfo = res['data'];
    }, (err) => {
      // if (err.status === 401) {
      //   this._ngxSpinnerService.hide();
      //   this._router.navigate(['auth/sign-in']);
      // }
    }, () => {
      this._ngxSpinnerService.hide();
    });
  }
}
