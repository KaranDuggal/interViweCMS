import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  apiResponseAlert(Title: string,Icon:any) {
    Swal.fire({
      position: 'top',
      icon: Icon,
      title: Title,
      showConfirmButton: false,
      timer: 1500
    })
  }
  YesOrNo(Title:string,Text:string,Icon:any){
    return Swal.fire({
      title: Title,
      text: Text,
      icon: Icon,  /* warning */
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        return true
      }
      return false
    })
  }
}
