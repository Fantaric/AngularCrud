import { Component, Input, ViewChild } from '@angular/core';
import { DataRestService } from '../services/data-rest.service';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { Employee, Links2, RootObject } from '../Employee';
import { NgForm } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  dataSource :MatTableDataSource<RootObject> = new MatTableDataSource<RootObject>([]);
  
  constructor(private dataRest: DataRestService){ 
    this.getData("http://localhost:8080/employees");
  }
  
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate', 'gender', 'action'];

  data: RootObject | undefined;
  links: Links2 | undefined;
  error: any;
  url : string | undefined;
  Employee : Employee | undefined;
  currentUrl : string | undefined;
 
  @ViewChild(DialogComponent) dialog:DialogComponent | undefined;
  
  getData(url: string){
    this.currentUrl = url;
    this.dataRest.getDataRows(url).subscribe(
      data => {
        this.data = data;
        this.links = data._links
      },
      error => this.error = error
    )
  }

  pageUp(){
    if(this.data) this.getData(this.data._links.next.href)
  }

  pageDown(){
    if(this.data) this.getData(this.data._links.prev.href)
  }

  firstPage(){
    if(this.data) this.getData(this.data._links.first.href)
  }

  lastPage(){
    if(this.data) this.getData(this.data._links.last.href)
  }

  deleteRow(i : string){
    this.url = "http://localhost:8080/employees/" + i;
    this.dataRest.deleteRows(this.url).subscribe(
      data => {this.data = data;
      if (this.currentUrl)
        this.getData(this.currentUrl);
    });
  }

  modifieRow(Employee : Employee){
    const dialogRef = this.dialog?.openDialogModifie(Employee, this.currentUrl, this.getData);
    dialogRef?.afterClosed().subscribe(result => {
      if(this.currentUrl)
        this.getData(this.currentUrl);
    });

  }

  addRow() {
    const dialogRef = this.dialog?.openDialog()
    dialogRef?.afterClosed().subscribe(result => {
        this.lastPage()
    })
  }




}

  




