import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { GridModule } from "@progress/kendo-angular-grid";
import {EstimateCostRoutingModule} from './estCostrouting.module';
import {LookupComponent} from '../../shared/lookup/lookup.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DatePickerModule, DateRangeModule, DateInputModule } from '@progress/kendo-angular-dateinputs';


import  { EstSummAddEditComponent } from './est-summ-add-edit/est-summ-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EstimateCostRoutingModule,
        GridModule,
        DialogsModule,
        DatePickerModule, DateRangeModule, DateInputModule


    ],
    declarations: [
      
        EstSummAddEditComponent,
        LookupComponent
       







    ]
})
export class EstimationCostModule { }