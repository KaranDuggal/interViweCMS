import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service'; 
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {
  isVerified:boolean = false;
  isLoading:boolean = true;
  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    await this.emailverify();
  }
  async emailverify(){
    this.activatedRoute.params.subscribe((params:any)=>{
      this.apiService.callAPI('post', {token:params.token}, `mobile/auth/verify`).subscribe((data:any)=>{
        if(data.success){
          this.isVerified  = true;
          this.alertService.apiResponseAlert("Verify Successfully",'success');
        }else{
          this.alertService.apiResponseAlert("Invalid Token",'error');
        }
        this.isLoading = false
      })
    })
  }
}
