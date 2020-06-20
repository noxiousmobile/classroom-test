import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'class-row',
  styleUrls: ['./class-row.component.scss'],
  template: `
    <tr [style.backgroundColor]="rowSelected ? '#2980b9' : '#fff'" (click)="selectClassRow()">
    <td [ngClass]="{'table-selected': rowSelected}" class="table-data" *ngFor="let row of classColumn; let rowIndex=index"></td>
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

  constructor() { 

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

  }

  ngOnInit() {
    this.rowIndex = this.rowIndex + 1;
  }

  selectClassRow() {
    console.log('Selected:', this.rowIndex);
    this.rowSelected = !this.rowSelected;
    this.onRowSelected.emit(this.rowIndex);
  }
   
}
