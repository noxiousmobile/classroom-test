import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { ManageStudentsComponent } from './components/manage-students/manage-students.component';

export interface Students {
  id: number;
  name: string;
  surname: string;
}

const STUDENTS_MOCK: Students[] = [
  { id: 0, name: 'Nikola', surname: 'Dimitrov' },
  { id: 1, name: 'Kire', surname: 'Kostov' },
  { id: 2, name: 'Mirce', surname: 'Acev' },
  { id: 3, name: 'Ivan', surname: 'Burev' }
];

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  @ViewChild('studentsTable', { static: true }) studentsTable: MatTable<any>;
  tableColumns: string[] = ['id', 'name', 'surname', 'edit'];
  mockDataSource = STUDENTS_MOCK;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  manageStudent(action, item) {
    item.action = action;
    console.log('NOXIOUS IS', item.action);
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
      }
    });

  }

  addStudent(item) {
    console.log('NOXIOUS ADD STUDENT', this.mockDataSource.length);
    let rowID = this.mockDataSource.length;

    this.mockDataSource.push({
      id: rowID,
      name: item.name,
      surname: item.surname
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

}
