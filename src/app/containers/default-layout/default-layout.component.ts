import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import {CommonService} from '../../core/services/common.service';
import {CommonData} from '../../core/data/CommonData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public config_data =[];
  public commonData = new CommonData();
  public language = JSON.parse(sessionStorage.getItem('current_lang'));

  constructor(private CommonService :CommonService, private router :Router )
  {

  }

  ngOnInit ()
  {
    let objj = this;
    this.CommonService.get_config(function (response) {
      objj.CommonService.set_language(response, function () {
        objj.config_data = JSON.parse(sessionStorage.getItem('system_config'));
      })
    });

    this.CommonService.getMenuRecord().subscribe(
      menu_items => {
       
       

       
      }, error => {
        if (error.error.ExceptionMessage.trim() == this.commonData.unauthorizedMessage) {
          this.CommonService.isUnauthorized();
        } else {
          this.CommonService.show_notification(this.language.server_error, 'error');
        }
        return
      });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logOut()
  {
    this.router.navigateByUrl('/login');
    this.CommonService.RemoveLoggedInUser().subscribe();
    this.CommonService.signOut(this.router, 'Logout');
  }
 
}
