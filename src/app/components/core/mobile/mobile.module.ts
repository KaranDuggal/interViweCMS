import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    EmailVerifyComponent,
    SetPasswordComponent
  ],
  imports: [
    CommonModule,
    MobileRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MobileModule { }
