import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'classroom-selector',
  templateUrl: './classroom-selector.component.html',
  styleUrls: ['./classroom-selector.component.scss']
})
export class ClassroomSelectorComponent implements OnInit {

  @Input() row: number = 0;
  @Input() column: number = 0;
  @Input() value: string = '';

  classRow = new Array();
  classColumn = new Array();
  public number: any;
  public disableInput = false;
  public classRowToVerify: any = [];
  public rowSelectedToVerify: any = [];
  constructor() { }

  ngOnInit() {
    console.log('value is', this.value);
    if (this.value !== '') {
      console.log('Classroom has row selected by default.');
    }
    this.number = this.value;
    this.doClassroom();
    this.checkClassroom();
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

  checkClassroom() {
    console.log('checkClassroom...');
    console.log('this.value', this.value);
    console.log('this.classRow', this.classRow);

    // Converting the numbers into strings in the array
    // I need this function if someone enters values which are not mathing the number for rows
    // so they need to be removed/ignored
    let checkForRows = this.classRow.map(String);
    
    this.classRowToVerify = [];
    let stringToVerify = [];
    stringToVerify = this.value.split(",");
    this.classRowToVerify = stringToVerify;
    console.log('this.classRowToVerify', this.classRowToVerify);

    let checkIfElementsAvailable = checkForRows.filter(i => this.classRowToVerify.indexOf(i) !== -1);
    this.classRowToVerify = checkIfElementsAvailable;

    const joinStrings = this.classRowToVerify.join(',');
    this.number = joinStrings;
  }

  onChange(event: any): void {
    this.classRowToVerify = [];
    let verifyRows = event.target.value;
    console.log(verifyRows);
    let stringToVerify = [];
    stringToVerify = verifyRows.split(",");

    let lastItem = parseInt(stringToVerify.slice(-1)[0], 10);
    this.classRowToVerify = stringToVerify;
    console.log('stringToVerify is', stringToVerify);
    console.log('lastItem is', lastItem);
    console.log('number is', this.number);
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
    
    if (this.classRowToVerify[0] == "") {
      this.classRowToVerify = [];
    }

  }

  onBlur(event: any): void {
    console.log('onBlur called');
    let sortNumbers = event.target.value;
    let sortArray = [];

    sortArray = sortNumbers.split(",").sort(function (a, b) {
      if (isNaN(Number(a.charAt(0))))
        return -1;
      if (isNaN(Number(b.charAt(0))))
        return 1;
      return a.charAt(0) - b.charAt(0);
    });

    console.log('sortArray', sortArray);
    const joinStrings = sortArray.join(',');
    this.number = joinStrings;
    console.log('joinStrings', joinStrings);

    if (this.classRowToVerify[0] == "") {
      this.classRowToVerify = [];
    }
  }

  rowSelected(rowSelected: any) {
    let searchDuplicate = numbers => numbers.filter((item, index) => numbers.indexOf(item) != index);
    console.log('Row selected:', rowSelected);
    console.log('this.classRowToVerify', this.classRowToVerify);
    console.log('this.classRowToVerify', this.classRowToVerify.length);

     // number is probably entered in the input field
     if (this.classRowToVerify.length > 0 && this.number) {
      const duplicationFound = this.classRowToVerify.indexOf(rowSelected.toString());
        if (duplicationFound > -1) {
          console.log('Removing element');
          this.classRowToVerify.splice(duplicationFound, 1);
          console.log(this.classRowToVerify);
          const joinStrings = this.classRowToVerify.join(',');
          this.number = joinStrings;
        } else {
          this.classRowToVerify.push(rowSelected.toString());
          const joinStrings = this.classRowToVerify.join(',');
          this.number = joinStrings;
        }
      return;
    } else {
      this.classRowToVerify.push(rowSelected.toString());
      searchDuplicate(this.classRowToVerify);
    }
    if (searchDuplicate(this.classRowToVerify).length > 0) {
      console.log('Duplicate found!');
      this.classRowToVerify.pop();
      console.log('this.classRowToVerify', this.classRowToVerify);
      const duplicationFound = this.classRowToVerify.indexOf(rowSelected.toString());
      if (duplicationFound > -1) {
        console.log('Duplicate duplicationFound found. Removing!!!');
        this.classRowToVerify.splice(duplicationFound, 1);
        const joinStringsRow = this.classRowToVerify.join(',');
        this.number = joinStringsRow;
      }
    }
    const joinStringsRow = this.classRowToVerify.join(',');
    this.number = joinStringsRow;
    console.log('ROW SELECTED classRowToVerify', this.classRowToVerify);
    console.log('this.number', this.number);
  }

}
