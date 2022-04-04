import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddEditViewComponent } from './add-edit-view/add-edit-view.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  {
    path:'listing',
    component:ListingComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'add',
    component:AddEditViewComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'edit/:id',
    component:AddEditViewComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'view/:id',
    component:AddEditViewComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
