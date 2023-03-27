import { Component } from '@angular/core';
import { DataRestService } from '../services/data-rest.service';
import { MatTableDataSource} from '@angular/material/table';
import { Embedded, Employee, Links2, RootObject } from '../Employee';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  dataSource :MatTableDataSource<RootObject> = new MatTableDataSource<RootObject>([]);

  constructor(private dataRest: DataRestService){ 
    this.getData();
    //this.dataSource = new MatTableDataSource();
  }
  
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'gender', 'action'];

  data: RootObject | undefined;
  links: Links2 | undefined;
  error: any;
  
  
  getData(){
    this.dataRest.getDataRows("http://localhost:8080/employees").subscribe(
      data => {
        this.data = data;
        this.links = data._links
        
      },
      error => this.error = error
    )
  }


  pageDown(){

  }

  pageUp(){

  }

}
