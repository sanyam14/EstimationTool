import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { GridModule } from "@progress/kendo-angular-grid";
import { EstWorkAddEditComponent } from './est-work-add-edit/est-work-add-edit.component';
import { EstWorkViewComponent } from './est-work-view/est-work-view.component';
import { EstAddEditItemComponent } from './est-add-edit-item/est-add-edit-item.component';
import { EstViewitemComponent } from './est-viewitem/est-viewitem.component'
import { EstimateItemRoutingModule } from './estimate-routing.module';
import { AssemblyRelationViewComponent } from './assembly-relation-view/assembly-relation-view.component';
import { AssemblyRelAddEditComponent } from './assembly-rel-add-edit/assembly-rel-add-edit.component';
import { EstimateGroupViewComponent } from './estimate-group-view/estimate-group-view.component';
import { EstimateGroupAddEditComponent } from './estimate-group-add-edit/estimate-group-add-edit.component';
import { MarketCategoryViewComponent } from './markup-category-view/markup-category-view.component';
import { MarketCategoryAddEditComponent } from './markup-category-add-edit/markup-category-add-edit.component';
import { CategoryviewComponent } from './categoryview/categoryview.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';
import { ResourceViewComponent } from './resource-view/resource-view.component';
import { ResourceAddEditComponent } from './resource-add-edit/resource-add-edit.component';
import { DepartViewComponent } from './depart-view/depart-view.component';
import { OverheadViewComponent } from './overhead-view/overhead-view.component';
import { DepartAddEditComponent } from './depart-add-edit/depart-add-edit.component';
import { OverHeadAddEditComponent } from './over-head-add-edit/over-head-add-edit.component';
import { EstSummAddEditComponent } from '../est-cost-summary/est-summ-add-edit/est-summ-add-edit.component';
import { CustVenViewComponent } from './cust-ven-view/cust-ven-view.component';
import { CustVenAddeditComponent } from './cust-ven-addedit/cust-ven-addedit.component';
import { CustomDialogsComponent } from '../../shared/custom-dialogs/custom-dialogs.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DatePickerModule, DateRangeModule, DateInputModule } from '@progress/kendo-angular-dateinputs';
import {LookupComponent} from '../../shared/lookup/lookup.component';
import { MasterDashboardComponent } from './master-dashboard/master-dashboard.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EstimateItemRoutingModule,
        GridModule,
        DialogsModule,
        DatePickerModule, 
        DateRangeModule,
        DateInputModule 


    ],
    declarations: [
        EstAddEditItemComponent,
        EstViewitemComponent,
        EstSummAddEditComponent,
        AssemblyRelationViewComponent,
        AssemblyRelAddEditComponent,
        EstimateGroupViewComponent,
        EstimateGroupAddEditComponent,
        MarketCategoryViewComponent,
        MarketCategoryAddEditComponent,
        CategoryviewComponent,
        CategoryAddEditComponent,
        ContactViewComponent,
        ContactAddEditComponent,
        ResourceViewComponent,
        ResourceAddEditComponent,
        DepartViewComponent,
        OverheadViewComponent,
        DepartAddEditComponent,
        OverHeadAddEditComponent,
        EstWorkViewComponent,
        EstWorkAddEditComponent,
        CustVenViewComponent,
        CustVenAddeditComponent,
        CustomDialogsComponent,
        LookupComponent,
	  MasterDashboardComponent
    ]
})
export class EstimationItemModule { }