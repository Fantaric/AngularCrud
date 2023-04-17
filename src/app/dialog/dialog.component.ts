import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataRestService } from '../services/data-rest.service';
import { Employee } from '../Employee';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  Employee: Employee;
  url: string | undefined
  EmployeePlaceHolder: Employee | undefined
  idEmp: number | undefined


  constructor(public dialog: MatDialog, private dataRest: DataRestService) {
    this.Employee = {
      id: 0, firstName: "", lastName: "", birthDate: "", hireDate: "", gender: "", _links: {
        self: { href: "" }, employee: { href: "" }
      }
    };
  }

  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;

  @ViewChild('modifieEmployee')
  modifieEmployee!: TemplateRef<any>;


  openDialog(): MatDialogRef<any, any> {
    return this.dialog.open(this.callAPIDialog);
  }

  openDialogModifie(Employee: Employee, currentUrl: string | undefined, getData: Function): MatDialogRef<any, any> {
    this.Employee = {...Employee};
    return this.dialog.open(this.modifieEmployee);
  }

  addRow(form: NgForm) {
    this.dataRest.addRows("http://localhost:8080/employees/", form.value).subscribe(
      Employee => {
        this.Employee = Employee
        this.dialog.closeAll()
      }
    )
  }

  modifieRow(body: NgForm) {
    this.url = "http://localhost:8080/employees/" + this.Employee.id;
    this.dataRest.modifieRows(this.url, body.value).subscribe(
      Employee => {
        this.Employee = Employee
        this.dialog.closeAll()
      }
    )
  }

}
