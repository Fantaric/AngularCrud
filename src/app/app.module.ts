import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { DataRestService } from './services/data-rest.service';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ DataRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
