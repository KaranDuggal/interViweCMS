import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service'; 
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  setPasswordFrom: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.form();
  }

  ngOnInit(): void {
  }
  form(){
    this.setPasswordFrom = this.formBuilder.group({
      password: new FormControl(null,[Validators.required]),
      confirmPassword: new FormControl(null,[Validators.required,]),
    })
  }
  async formSubmit(){
    if(!this.setPasswordFrom.valid) return
    if(this.setPasswordFrom.value.password === this.setPasswordFrom.value.confirmPassword){
      this.activatedRoute.params.subscribe((params:any)=>{
        this.setPasswordFrom.value.token = params.token;
        this.apiService.callAPI('post', this.setPasswordFrom.value, `mobile/auth/setpassword`).subscribe((data:any)=>{
          if(data.success){
            this.alertService.apiResponseAlert("Password Set Successfully",'success');
          }else{
            this.alertService.apiResponseAlert("Invalid Token",'error');
          }
        })
      })
    }else{
      this.alertService.apiResponseAlert("Confirm password must be equal to password",'warning');
    }
  }
}
