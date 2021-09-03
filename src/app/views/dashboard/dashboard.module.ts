import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TreeViewModule } from "@progress/kendo-angular-treeview";
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TreeViewModule,
    DateInputsModule,
   PopoverModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent, AdminDashboardComponent ]
})
export class DashboardModule { }
