import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Students {
  id: number;
  name: string;
  surname: string;
}

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss']
})
export class ManageStudentsComponent implements OnInit {

  dialogData: any;
  action: string;

  constructor(
    public manageDialog: MatDialogRef<ManageStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Students
  ) {
    this.dialogData = { ...data };
    this.action = this.dialogData.action;
    console.log('dialogData action', this.dialogData.action);
  }

  ngOnInit() {
  }

  submit() {
    console.log('Submitting', this.action);
    this.manageDialog.close({ event: this.action, data: this.dialogData });
  }

  closeDialog() {
    this.manageDialog.close({ event: 'Dismiss' });
  }

}
