import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListingComponent } from './listing/listing.component';
import {MatTableModule} from '@angular/material/table';
import { AddEditViewComponent } from './add-edit-view/add-edit-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    ListingComponent,
    AddEditViewComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class CategoryModule { }
