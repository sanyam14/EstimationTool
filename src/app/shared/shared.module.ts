import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { CustomDialogsComponent } from './custom-dialogs/custom-dialogs.component';
import { LookupComponent } from './lookup/lookup.component';
import { DatePickerModule, DateRangeModule, DateInputModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
    declarations: [
        CustomDialogsComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        DialogsModule,
        LookupComponent,
        DatePickerModule, 
        DateRangeModule,
         DateInputModule
    ],
    exports: [
        FormsModule, CommonModule, CustomDialogsComponent, DatePickerModule, DateInputModule, DateRangeModule,LookupComponent],
    providers: [],
    bootstrap: []
})
export class SharedModules { }