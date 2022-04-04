import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { SetPasswordComponent } from './set-password/set-password.component';

const routes: Routes = [
  {
    path:'email-verify/:token',
    component:EmailVerifyComponent
  },
  {
    path:'set-password/:token',
    component:SetPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
