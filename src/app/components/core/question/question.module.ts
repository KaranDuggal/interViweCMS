import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { ListingComponent } from './listing/listing.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { AddEditViewComponent } from './add-edit-view/add-edit-view.component';

@NgModule({
  declarations: [
    ListingComponent,
    AddEditViewComponent,
    
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule
  ]
})
export class QuestionModule { }
