import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service'; 
import { AlertService } from 'src/app/services/alert/alert.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/app/constant/constant';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrls: ['./add-edit-view.component.scss']
})
export class AddEditViewComponent implements OnInit {
  answerForm : any;
  submitted:boolean = false
  datafetchSuccessfully: boolean = false;
  currentState: "Add" | "Edit" | "View" = "Add";
  statuses = Constants.Status;
  id: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private alertService: AlertService,
    private shareDataService: ShareDataService,
  ) { 
    this.form();
    this.selectState();
  }

  ngOnInit(): void {
  }
  selectState() {
    if(this.router.url.includes("add")) this.currentState = "Add";
    if(this.router.url.includes("view")) this.currentState = "View";
    if(this.router.url.includes("edit")) this.currentState = "Edit";
    if(this.currentState === 'View' || this.currentState === 'Edit'){
      this.activatedRoute.params.subscribe((params: any) => {
        this.id = params.id
      });
      this.getAnswer();
    }else{
      this.shareDataService.sharedQuestionId.subscribe(id=>{
        this.answerForm.patchValue({questionId:id});
      })
    }
  }
  form(){
    this.answerForm = this.formBuilder.group({
      questionId : new FormControl({value: null, disabled: this.currentState ==='View' ? true:false},[Validators.required]),
      answer: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false},[Validators.required]),
      status: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false},[Validators.required]),
    })
  }
  getAnswer(){
    this.apiService.callAPI('get',{},"cms/answer/"+this.id).subscribe((data:any)=>{      
      if(data.success){        
        this.answerForm.patchValue(data.data);
        this.datafetchSuccessfully = true;
      }else{
        this.alertService.apiResponseAlert(data.message,'error');
        this.router.navigate(['/question/listing']);
      }
    });
  }
  submit(){
    this.submitted = true
    if(!this.answerForm.valid) return
    switch (this.currentState) {
      case "Add":
        this.apiService.callAPI('post',this.answerForm.value,"cms/answer",).subscribe((data:any)=>{             
          this.alertService.apiResponseAlert (data.message,'success');
          this.router.navigate(['/question/view/'+this.answerForm.value.questionId]);
        });
        break;
      case "Edit":
        this.apiService.callAPI("put",this.answerForm.value,"cms/answer/"+this.id).subscribe((data:any)=>{             
          this.alertService.apiResponseAlert (data.message,'success');
          this.router.navigate(['/question/view/'+this.answerForm.value.questionId]);
        });
        break;
      case "View":
        break;
      default:
        break;
    }
  }
}
