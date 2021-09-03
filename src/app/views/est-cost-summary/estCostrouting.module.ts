import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstSummAddEditComponent } from './est-summ-add-edit/est-summ-add-edit.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [

    {
        path: '',
        data: {
            title: 'Home'
        },

        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'EstimationCostAddEdit',
                component: EstSummAddEditComponent,
                data: {
                    title: 'Estimation Cost Master'
                }
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EstimateCostRoutingModule { }