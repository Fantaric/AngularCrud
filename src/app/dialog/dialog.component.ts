import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataRestService } from '../services/data-rest.service';
import { Employee } from '../Employee';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  Employee : Employee | undefined
  url : string | undefined
  EmployeePlaceHolder : Employee | undefined
  idEmp : number | undefined
  
  constructor(public dialog: MatDialog, private dataRest: DataRestService) {}

  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;

  @ViewChild('modifieEmployee')
   modifieEmployee!: TemplateRef<any>;

  
  openDialog(): void {
    const dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogModifie(id: number){
    this.idEmp = id
    this.url = "http://localhost:8080/employees/" + id;
    this.dataRest.getDataRow(this.url).subscribe(
        Employee1 => {this.EmployeePlaceHolder = Employee1
          this.dialog.open(this.modifieEmployee);}
    );
  }

  addRow(form :NgForm){
    this.dataRest.addRows("http://localhost:8080/employees/", form.value).subscribe(
      Employee => {this.Employee = Employee
        alert('Nuovo Dipendente Aggiunto')}
    )
  }

  modifieRow(body: NgForm){
    this.url = "http://localhost:8080/employees/" + this.idEmp;
    this.dataRest.modifieRows(this.url, body.value).subscribe(
      Employee => {this.Employee = Employee
        alert('Modificato Dipendente')}
    )
  }

}
