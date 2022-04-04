import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service'; 
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitBtn : boolean = false;
  submitted:boolean = false
  loginFrom: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.checkToken();
    this.form();
  }

  ngOnInit(): void {
    this.checkToken();
  }
  form(){
    this.loginFrom = this.formBuilder.group({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,]),
      role: new FormControl("admin"),
    })
  }
  formSubmit(){
    this.submitted = true;
    if(!this.loginFrom.valid) return;
    this.submitBtn = true;
    this.activatedRoute.params.subscribe((params:any)=>{
      this.loginFrom.value.token = params.token;
      this.apiService.callAPI('post', this.loginFrom.value, `cms/auth/login`).subscribe((data:any)=>{
        if(data.success){
          localStorage.setItem('token', data.token);
          this.router.navigate(['/category/listing']);
          this.alertService.apiResponseAlert(data.message,'success');
        }else{
          this.alertService.apiResponseAlert(data.message,'error');
        }
      })
    })
    this.submitBtn = false;
  }
  checkToken(){
    if(localStorage.getItem("token")){
      this.router.navigate(['/category/listing']);
    }
  }
}
