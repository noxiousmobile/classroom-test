import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';

export interface Students {
  id: number;
  name: string;
  surname: string;
}

const STUDENTS_MOCK: Students[] = [
  {id: 0, name: 'Nikola', surname: 'Dimitrov'},
  {id: 1, name: 'Kire', surname: 'Kostov'},
  {id: 2, name: 'Mirce', surname: 'Acev'},
  {id: 3, name: 'Ivan', surname: 'Burev'}
];

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  @ViewChild('studentsTable', {static: true}) studentsTable: MatTable<any>;
  tableColumns: string[] = ['id', 'name', 'surname', 'edit'];
  mockDataSource = STUDENTS_MOCK;
  
  constructor() { }

  ngOnInit() {
  }

}
