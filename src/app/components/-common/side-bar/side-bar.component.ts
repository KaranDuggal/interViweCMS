import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  shownavbar:boolean = true;
  showNav: boolean = true;
  blockedRoutes: string[] = ['/', '/auth/login'];
  constructor(
    private router: Router,
  ) {
    this.checkCurrentRoute()
   }

  ngOnInit(): void {
  }
  checkCurrentRoute() {
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        event = event as NavigationEnd;
        if (!this.blockedRoutes.includes(event.url)/*  && await this.sharedService.verifyLogin() */) {
          this.showNav = true;
        } else {
          this.showNav = false;
        }
      }
    })
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
  toggle(){
    this.shownavbar = !this.shownavbar;
  }
}
