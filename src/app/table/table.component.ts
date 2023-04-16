import { Component, ViewChild } from '@angular/core';
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
    this.dataSource._renderChangesSubscription
  }
  
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate', 'gender', 'action'];

  data: RootObject | undefined;
  links: Links2 | undefined;
  error: any;
  id : RootObject | undefined
  url : string | undefined
  Employee : Employee | undefined
  pageNumber : BigInteger | undefined
 

  @ViewChild(DialogComponent) dialog:DialogComponent | undefined;
  
  getData(url: string){
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

  // cancellazione singola riga tabella
  deleteRow(i : string){
    this.url = "http://localhost:8080/employees/" + i;
    this.dataRest.deleteRows(this.url).subscribe(
      data => {this.data = data;
      window.location.reload()},
      error => this.error = error
    )
  }

  modifieRow(id : number){
    this.dialog?.openDialogModifie(id)
  }

  addRow(form :NgForm){
    this.dataRest.addRows("http://localhost:8080/employees/", form.value).subscribe(
      Employee => {this.Employee = Employee
        alert('Nuovo Dipendente Aggiunto')}
    )
  }


}

  




