import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'class-row',
  styleUrls: ['./class-row.component.scss'],
  template: `
    <tr [style.backgroundColor]="rowSelected ? '#2980b9' : '#fff'" (click)="selectClassRow()">
    <td [ngClass]="{'table-selected': rowSelected}" class="table-data" *ngFor="let row of classColumn; let rowIndex=index" id={{rowIndex}}>
      <ng-container *ngFor="let assignedRow of assignedSeatsArray; let assignedRowIndex=index">
        <span *ngIf="assignedRowIndex === rowIndex">
        <ng-container *ngFor="let nameAssigned of assignedSeatsNameArray; let assignedNameRowIndex=index">
        <span class="names" *ngIf="assignedRowIndex === assignedNameRowIndex">{{nameAssigned}}</span>
      </ng-container>
        </span>
      </ng-container>
    </td>
    </tr>
    `
})

export class ClassRowComponent implements OnInit, OnChanges {
  @Input() classRow: any;
  @Input() rowIndex: any;
  @Input() classColumn: any;
  @Input() selectedRow: any;
  @Output() onRowSelected = new EventEmitter<any>();
  
  rowSelected: boolean = false;
  hasInitialized: boolean = false;
  availableSeats: any;
  assignedSeats: number;
  assignedSeatsArray: any[] = [];
  assignedSeatsNameArray: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.availableSeats = [...this.classColumn].reverse();
  }

  removeClassRowData() {
    this.assignedSeatsArray = [];
    this.assignedSeatsNameArray = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ClassRowComponent selectedRow is:', this.selectedRow);
    console.log('rowIndex is:', this.rowIndex);
    // Not for ranges
    if (!!(this.selectedRow.indexOf(this.rowIndex.toString())+1)) {
      this.rowSelected = true;
    } else {
      this.rowSelected = false;
    }
    // Ranges
    if (this.findRanges(this.selectedRow)) {
      console.log('Found a range:');
      let range = this.findRanges(this.selectedRow);
      let firstNumber = parseInt(range.charAt(0), 10);
      let lastNumber = parseInt(range.substr(-1), 10);

      for (let i = firstNumber; i <= lastNumber; i++) {
        if (i == this.rowIndex) {
          this.rowSelected = true;
        }
      }
      
    }
    
  }


  findRanges(array) {
    var detected = null;
    array.some(function(item) {
        return item.length > 1 ? ((detected = item), true) : false;
    });
    return detected;
}

  selectClassRow() {
    console.log('Selected:', this.rowIndex);
    this.rowSelected = !this.rowSelected;
    this.onRowSelected.emit(this.rowIndex);
  }

  getRowSeats(name: string) {
    console.log('This row has', this.availableSeats + ' seats');
    console.log('This row has', this.availableSeats.length + ' available seats');
    console.log('Assigning a new seat...');

    if (this.availableSeats.length < 1) {
      console.log('No more free seats!');
      return;
    } else {
      this.assignedSeats = this.availableSeats[this.availableSeats.length - 1];
      console.log('element is', this.assignedSeats);
      this.assignedSeatsArray.push(this.assignedSeats);
      this.assignedSeatsNameArray.push(name);
      console.log('SEATS: ', this.assignedSeatsArray);
      console.log('NAMES: ', this.assignedSeatsNameArray);
      this.availableSeats.pop();
    }
    
    console.log('Seats adjusted. Now they are:', this.availableSeats);
    console.log(this.availableSeats.length + ' more seats available for this row!');
  }
   
}
