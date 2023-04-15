import { HttpClient, HttpParams } from '@angular/common/http';
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

  modifieRows(apiURL: string, body : any): Observable<Employee>{
    return this.http.post<Employee>(apiURL, body);
  }


  deleteRows(apiURL : string): Observable<RootObject>{
   // let httpParams = new HttpParams().set('id', i);
   // let options = { params: httpParams };
     return this.http.delete<RootObject>(apiURL);
  }

  
  addRows(apiURL : string, body: any): Observable<Employee>{
    return this.http.put<Employee>(apiURL, body);
  }

  

}
