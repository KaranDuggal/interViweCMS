import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerRoutingModule } from './answer-routing.module';
import { AddEditViewComponent } from './add-edit-view/add-edit-view.component';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AddEditViewComponent
  ],
  imports: [
    CommonModule,
    AnswerRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
  ]
})
export class AnswerModule { }
