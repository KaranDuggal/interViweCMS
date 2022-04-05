import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service'; 
import { AlertService } from 'src/app/services/alert/alert.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/app/constant/constant';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrls: ['./add-edit-view.component.scss']
})
export class AddEditViewComponent implements OnInit {
  submitBtn:boolean = false;
  categoryForm : any;
  submitted:boolean = false
  datafetchSuccessfully: boolean = false;
  currentState: "Add" | "Edit" | "View" = "Add";
  statuses = Constants.Status;
  imageSrc: string = '';
  id: string = '';
  formData = new FormData();
  fStatus:string = '';
  pageNo : number = 0;
  listLength : number = 10;
  listCount : number = 0;
  questionList: Array<question> = []
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private alertService: AlertService,
  ) { 
    this.selectState()
    this.form();
    this.getQuestions(this.pageNo,this.listLength,this.fStatus)
  }
  async ngOnInit() {
    if(this.router.url.includes("view") || this.router.url.includes("edit")){
      await this.getcategory();
    }
  }
  selectState() {
    if(this.router.url.includes("add")) this.currentState = "Add";
    if(this.router.url.includes("view")) this.currentState = "View";
    if(this.router.url.includes("edit")) this.currentState = "Edit";
    if(this.currentState === 'View' || this.currentState === 'Edit'){
      this.activatedRoute.params.subscribe((params: any) => {
        this.id = params.id
      })
    }
  }
  form(){
    this.categoryForm = this.formBuilder.group({
      name: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false},[Validators.required,Validators.maxLength(20)]),
      description: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false},[Validators.required,Validators.maxLength(100)]),
      status: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false},[Validators.required]),
      position: new FormControl({value: null, disabled: this.currentState ==='View' ? true:false}),
      // image:new FormControl(null,[Validators.required,]),
    })
  }
  getcategory(){
    this.apiService.callAPI('get',{},"cms/category/"+this.id).subscribe((data:any)=>{             
      this.categoryForm.patchValue(data.data);
      this.imageSrc = `${environment.imgBaseURL}${data.data.image}`;
      this.datafetchSuccessfully = true;
    });
  }
  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      this.formData.append("image",file)
    }
  }
  submit(){
    this.submitBtn = true;
    this.submitted = true;
    if(!this.categoryForm.valid) {this.submitBtn = false; return;}
    for (const key in this.categoryForm.value) this.formData.set(key,this.categoryForm.value[key]);    
    switch (this.currentState) {
      case "Add":
        this.formData.delete("position")
        this.apiService.callAPI('post',this.formData,"cms/category",).subscribe((data:any)=>{             
          this.alertService.apiResponseAlert (data.message,'success');
          this.router.navigate(['/category/listing']);
        });
        break;
      case "Edit":
        this.apiService.callAPI("put",this.formData,"cms/category/"+this.id).subscribe((data:any)=>{           
          this.alertService.apiResponseAlert (data.message,'success');
          this.router.navigate(['/category/listing']);
        });
        break;
      case "View":
        break;
      default:
        break;
    }
    this.submitBtn = false;
  }
  getQuestions(pageNo:number,limit:number,status:string){
    this.apiService.callAPI("get",{},`cms/question?pageNo=${pageNo}&limit=${limit}&categoryId=${this.id}&status=${status}`,).subscribe((data:any)=>{            
        this.questionList = data.data.question as Array<question>;
        this.listCount = data.data.count;
        this.datafetchSuccessfully = true;
    })
  }
  async onChangedPage(e:any){
    if(this.listLength !== e.pageSize) this.listLength = e.pageSize;
    this.pageNo  = e.pageIndex * e.pageSize
    await this.getQuestions(this.pageNo,this.listLength,this.fStatus);
  }
  async delete(id:string){
    if(await this.alertService.YesOrNo("Delete Category","Are you sure","warning")){
      this.apiService.callAPI("delete",{},"cms/question/"+id).subscribe(async(data:any)=>{
        if(data.success){        
          await this.getQuestions(this.pageNo,this.listLength,this.fStatus);
        }else{
            this.alertService.apiResponseAlert(data.message,'error');
          }
        })
    }
  }
  async fStatusChange(e:string){
    this.fStatus = e;
    await this.getQuestions(this.pageNo,this.listLength,this.fStatus);
  }
}

export interface question {
  _id: string,
  categoryId: string,
  question: string,
  rank: number,
  reports: number,
  user: {
      _id: string,
      name: string,
      profileImage: string
  },
  category: {
    _id: string,
    name: string
  }
}