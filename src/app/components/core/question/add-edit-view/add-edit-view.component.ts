import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service'; 
import { AlertService } from 'src/app/services/alert/alert.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/app/constant/constant'
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrls: ['./add-edit-view.component.scss']
})
export class AddEditViewComponent implements OnInit {
  id:string = ''
  questionForm : any;
  submitted:boolean = false
  datafetchSuccessfully: boolean = false;
  currentState: "Add" | "Edit" | "View" = "Add";
  statuses = Constants.Status;
  categoryList : Array<any>=[]; 
  answerList : Array<any>=[];
  pageNo : number = 0;
  listLength : number = 10;
  listCount : number = 0;
  fStatus : string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private alertService: AlertService,
    private shareDataService: ShareDataService,
  ) { 
    this.selectState()
    this.form();
  }

  ngOnInit() {
    this.getCategorys();
    if(this.currentState === 'Edit' || this.currentState === 'View'){
      this.getQuestion();
      this.getAnswers(this.pageNo,this.listLength,this.fStatus);
    }
    this.datafetchSuccessfully = true;
  }
  selectState() {
    if(this.router.url.includes("add")) this.currentState = "Add";
    if(this.router.url.includes("view")) this.currentState = "View";
    if(this.router.url.includes("edit")) this.currentState = "Edit";
    if(this.currentState === 'Edit' || this.currentState === 'View'){
      this.activatedRoute.params.subscribe((params: any) => {
        this.id = params.id
      })
    }
  }
  form(){
    this.questionForm = this.formBuilder.group({
      categoryId: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false},[Validators.required]),
      question: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false},[Validators.required]),
      status: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false}),
    })
  }
  getCategorys(){
    this.apiService.callAPI('get',{},"cms/category/verified",).subscribe((data:any)=>{            
      this.categoryList = data.data;
    });
  }
  getQuestion(){
    this.apiService.callAPI('get',{},"cms/question/"+this.id,).subscribe((data:any)=>{             
        this.questionForm.patchValue(data.data);
    });
  }
  getAnswers(pageNo:number,listLength:number,fStatus:string){
    this.apiService.callAPI('get',{},`cms/question/${this.id}/answers?pageNo=${pageNo}&limit=${listLength}&status=${fStatus}`).subscribe((data:any)=>{             
      this.answerList = data.data.answers;
      this.listCount = data.data.count;
    });
  }
  async delete(id:string){
    if(await this.alertService.YesOrNo("Delete Answer","Are you sure","warning")){
      this.apiService.callAPI("delete",{},"cms/answer/"+id).subscribe(async(data:any)=>{      
        await this.getAnswers(this.pageNo,this.listLength,this.fStatus);
      })
    }
  }
  questionIdSet(id:string){
    this.shareDataService.nextQuestionId(id);
  }
  onChangedPage(e:any){

  }
  async fStatusChange(e:string){
    this.fStatus = e;
    console.log('this.fStatus', this.fStatus)
    await this.getAnswers(this.pageNo,this.listLength,this.fStatus);
  }
  submit(){
    this.submitted = true
    if(!this.questionForm.valid) return
    switch (this.currentState) {
      case "Add":
        this.apiService.callAPI('post',this.questionForm.value,"cms/question",).subscribe((data:any)=>{            
          this.alertService.apiResponseAlert (data.message,'success');
          this.router.navigate(['/question/listing']);
        });
        break;
      case "Edit":
        this.apiService.callAPI("put",this.questionForm.value,"cms/question/"+this.id,).subscribe((data:any)=>{             
          this.alertService.apiResponseAlert (data.message,'success');
          this.router.navigate(['/question/listing']);
        });
        break;
      case "View":
        break;
      default:
        break;
    }
  }
}
