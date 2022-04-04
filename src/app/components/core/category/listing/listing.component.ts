import { Component, OnInit } from '@angular/core';
// import { Router,ActivatedRoute } from '@angular/router';
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
    // private router: Router,
    // private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private alertService: AlertService,
  ) { 
    this.getcategorys(this.pageNo,this.cListLength,this.fStatus);
  }

  datafetchSuccessfully: boolean = false;
  fStatus:string = '';
  statuses = Constants.Status;
  pageNo : number = 0;
  cListLength : number = 10;
  cListCount : number = 0;
  categoryList: Array<category> = []
  ngOnInit(): void {
  }
  getcategorys(pageNo:number,limit:number,status:string){
    this.apiService.callAPI("get",{},`cms/category?pageNo=${pageNo}&limit=${limit}&status=${status}`,).subscribe((data:any)=>{             
      this.categoryList = data.data.categories as Array<category>;
      this.cListCount = data.data.count;
      this.datafetchSuccessfully = true;
      // this.alertService.apiResponseAlert (data.message,'success');
    })
  }
  async onChangedPage(e:any){
    if(this.cListLength !== e.pageSize) this.cListLength = e.pageSize;
    this.pageNo  = e.pageIndex * e.pageSize
    await this.getcategorys(this.pageNo,this.cListLength,this.fStatus);
  }
  async delete(id:string){
    if(await this.alertService.YesOrNo("Delete Category","Are you sure","warning")){
      this.apiService.callAPI("delete",{},"cms/category/"+id).subscribe(async(data:any)=>{       
        await this.getcategorys(this.pageNo,this.cListLength,this.fStatus);
      })
    }
  }
  async fStatusChange(e:string){
    this.fStatus = e;
    await this.getcategorys(this.pageNo,this.cListLength,this.fStatus);
  }
}
export interface category {
  _id:string,
  name:string,
  image:string,
  status:string,
  position:string,
}
