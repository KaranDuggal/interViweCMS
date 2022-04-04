import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service'; 
import { AlertService } from 'src/app/services/alert/alert.service';
import { Constants } from 'src/app/constant/constant';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
  ) { }
  datafetchSuccessfully: boolean = false;
  fStatus:string = '';
  statuses = Constants.Status;
  pageNo : number = 0;
  listLength : number = 10;
  listCount : number = 0;
  questionList: Array<question> = []
  ngOnInit(): void {
    this.getQuestions(this.pageNo,this.listLength,this.fStatus)
  }
  async getQuestions(pageNo:number,limit:number,status:string){
    this.apiService.callAPI("get",{},`cms/question?pageNo=${pageNo}&limit=${limit}&status=${status}`,).subscribe((data:any)=>{      
      if(data.success){        
        this.questionList = data.data.question as Array<question>;
        this.listCount = data.data.count;
        this.datafetchSuccessfully = true;
      }else{
        this.alertService.apiResponseAlert(data.message,'error');
      }
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
