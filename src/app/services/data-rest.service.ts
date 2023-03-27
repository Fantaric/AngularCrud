import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Embedded, Employee, RootObject } from '../Employee';




@Injectable({
  providedIn: 'root'
})
export class DataRestService {

  constructor(private http: HttpClient) { }

  getDataRows(apiURL: string): Observable<RootObject>{
    return this.http.get<RootObject>(apiURL);
  }

  deleteRows(){

  }



}
