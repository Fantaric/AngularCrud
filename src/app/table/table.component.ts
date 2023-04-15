import { Component } from '@angular/core';
import { DataRestService } from '../services/data-rest.service';
import { MatTableDataSource} from '@angular/material/table';
import { Embedded, Employee, Links2, RootObject } from '../Employee';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  dataSource :MatTableDataSource<RootObject> = new MatTableDataSource<RootObject>([]);

  constructor(private dataRest: DataRestService){ 
    this.getData("http://localhost:8080/employees");
    //this.dataSource = new MatTableDataSource();
  }
  
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'gender', 'action'];

  data: RootObject | undefined;
  links: Links2 | undefined;
  error: any;
  id : RootObject | undefined
  url : string | undefined
  Employee : Employee | undefined
  
  public isDisplayed = true


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

  modifieRow(body: NgForm){
    this.isDisplayed = false;
    this.url = "http://localhost:8080/employees/";
    this.dataRest.modifieRows(this.url, body.value).subscribe(
    )
  }

  addRow(form :NgForm){
    this.dataRest.addRows("http://localhost:8080/employees/2000", form.value).subscribe(
      Employee => {this.Employee = Employee
        alert('Nuovo Dipendente Aggiunto')}
    )
  }

  


  



}
