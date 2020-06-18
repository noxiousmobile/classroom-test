import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'classroom-selector',
  templateUrl: './classroom-selector.component.html',
  styleUrls: ['./classroom-selector.component.scss']
})
export class ClassroomSelectorComponent implements OnInit {

  @Input() row: number = 0;
  @Input() column: number = 0;
  classRow = new Array();
  classColumn = new Array();
  public number;
  public disableInput = false;

  constructor() { }

  ngOnInit() {
    this.doClassroom();
  }

  doClassroom() {
    this.classRow = [];
    this.classColumn = [];
    for (let i = 1; i < this.row + 1; i++) {
      this.classRow.push(i);
    }
    for (let i = 1; i < this.column + 1; i++) {
      this.classColumn.push(i);
    }
  }

  onChange(event: any): void {
    let verifyRows = event.target.value;

    console.log(verifyRows);
    let stringToVerify = [];
    stringToVerify = verifyRows.split(",");

    let lastItem = parseInt(stringToVerify.slice(-1)[0], 10);

    // console.log('stringToVerify is', stringToVerify);
    // console.log('lastItem is', lastItem);
    if (lastItem > this.row) {
      console.log('Number is bigger than row');
      this.number = this.number.toString().substring(0, this.number.length - 1);
      console.log('number value is', this.number);
    }

    let searchDuplicate = numbers => numbers.filter((item, index) => numbers.indexOf(item) != index);
    searchDuplicate(stringToVerify);

    if (searchDuplicate(stringToVerify).length > 0) {
      console.log('Duplicate found');
      this.number = this.number.toString().substring(0, this.number.length - 1);
    }

  }

}
