import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { ManageStudentsComponent } from './components/manage-students/manage-students.component';

export interface Students {
  id: number;
  name: string;
  surname: string;
  assigned: boolean;
}

const STUDENTS_MOCK: Students[] = [
  { id: 0, name: 'Nikola', surname: 'Dimitrov', assigned: false },
  { id: 1, name: 'Kire', surname: 'Kostov', assigned: false },
  { id: 2, name: 'Mirce', surname: 'Acev', assigned: false },
  { id: 3, name: 'Ivan', surname: 'Burev', assigned: false }
];

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  @ViewChild('studentsTable', { static: true }) studentsTable: MatTable<any>;
  @ViewChild('classRoomSelector', { static: true }) classRoomSelector;
  tableColumns: string[] = ['id', 'name', 'surname', 'assigned', 'edit'];
  mockDataSource = STUDENTS_MOCK;
  assignedRow: number = 0;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  manageStudent(action, item) {
    item.action = action;
    const manageDialog = this.dialog.open(ManageStudentsComponent, {
      width: '300px',
      data: item
    });

    manageDialog.afterClosed().subscribe(action => {
      if (action.event == 'Add') {
        this.addStudent(action.data);
      } else if (action.event == 'Modify') {
        this.modifyStudent(action.data);
      } else if (action.event == 'Delete') {
        this.deleteStudent(action.data);
      } else if (action.event == 'Assign') {
        this.assignStudent(action.data);
      }
    });

  }

  addStudent(item) {
    let rowID = this.mockDataSource.length;

    this.mockDataSource.push({
      id: rowID,
      name: item.name,
      surname: item.surname,
      assigned: false
    });
    this.studentsTable.renderRows();

  }

  modifyStudent(item) {
    this.mockDataSource = this.mockDataSource.filter((value, key) => {
      if (value.id == item.id) {
        value.name = item.name;
        value.surname = item.surname;
      }
      return true;
    });
  }

  deleteStudent(item) {
    this.mockDataSource = this.mockDataSource.filter((value, key) => {
      return value.id != item.id;
    });
  }

  assignStudent(item) {
    // I am getting the row I wish this student to be assigned for
    let name = item.name;
    console.log('Student assigned for row', this.assignedRow);
    this.mockDataSource = this.mockDataSource.filter((value, key) => {
      if (value.id == item.id) {
        value.name = item.name;
        value.surname = item.surname;
        value.assigned = true;
        this.assignedRow = parseInt(item.assign, 10);
      }
      return true;
    });
    this.classRoomSelector.getRowSeats(this.assignedRow, name);
  }

}
