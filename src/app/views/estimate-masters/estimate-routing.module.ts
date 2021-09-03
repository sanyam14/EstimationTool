import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstAddEditItemComponent } from './est-add-edit-item/est-add-edit-item.component';
import { EstViewitemComponent } from './est-viewitem/est-viewitem.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {AdminDashboardComponent} from '../dashboard/admin-dashboard/admin-dashboard.component';
import {EstWorkAddEditComponent} from './est-work-add-edit/est-work-add-edit.component';
import {EstWorkViewComponent} from './est-work-view/est-work-view.component';
import {EstimateGroupAddEditComponent} from './estimate-group-add-edit/estimate-group-add-edit.component';
import {EstimateGroupViewComponent} from './estimate-group-view/estimate-group-view.component';
import {MarketCategoryAddEditComponent} from './markup-category-add-edit/markup-category-add-edit.component';
import {MarketCategoryViewComponent} from './markup-category-view/markup-category-view.component';

import {AssemblyRelAddEditComponent} from './assembly-rel-add-edit/assembly-rel-add-edit.component';
import {AssemblyRelationViewComponent} from './assembly-relation-view/assembly-relation-view.component';
import {CategoryAddEditComponent} from './category-add-edit/category-add-edit.component';
import {CategoryviewComponent} from './categoryview/categoryview.component';
import {ContactAddEditComponent} from './contact-add-edit/contact-add-edit.component';
import {ContactViewComponent} from './contact-view/contact-view.component';
import { ResourceViewComponent } from './resource-view/resource-view.component';
import { ResourceAddEditComponent } from './resource-add-edit/resource-add-edit.component';
import { DepartViewComponent } from './depart-view/depart-view.component';
import { DepartAddEditComponent } from './depart-add-edit/depart-add-edit.component';
import { OverheadViewComponent } from './overhead-view/overhead-view.component';
import { OverHeadAddEditComponent } from './over-head-add-edit/over-head-add-edit.component';
import { EstSummAddEditComponent } from '../est-cost-summary/est-summ-add-edit/est-summ-add-edit.component';
import {CustVenAddeditComponent} from './cust-ven-addedit/cust-ven-addedit.component';
import {CustVenViewComponent} from './cust-ven-view/cust-ven-view.component';
import { MasterDashboardComponent } from './master-dashboard/master-dashboard.component';


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
                path: 'admindashboard',
                component: AdminDashboardComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'CustVenAddEdit',
                component: CustVenAddeditComponent,
                data: {
                    title: 'Customer Vendor Master'
                }
            },
            {
                path: 'CustVenAddEdit/:id',
                component: CustVenAddeditComponent,
                data: {
                    title: 'Customer Vendor Master'
                }
            },
            {
                path: 'CustVenView',
                component: CustVenViewComponent,
                data: {
                    title: 'Customer Vendor Master'
                }
            },
           
            {
                path: 'ContactAddEdit',
                component: ContactAddEditComponent,
                data: {
                    title: 'Contact Master'
                }
            },
            {
                path: 'ContactAddEdit/:id',
                component: ContactAddEditComponent,
                data: {
                    title: 'Contact Master'
                }
            },
            {
                path: 'ContactView',
                component: ContactViewComponent,
                data: {
                    title: 'Contact Master'
                }
            },
            {
                path: 'EstimateWorkingView',
                component: EstWorkViewComponent,
                data: {
                    title: 'Estimation Workings'
                }
            },
            {
                path: 'EstimateWorkingAddEdit',
                component: EstWorkAddEditComponent,
                data: {
                    title: 'Estimation Workings'
                }
            },
            {
                path: 'AssemblyRelAddEdit',
                component: AssemblyRelAddEditComponent,
                data: {
                    title: 'Assembly Relation'
                }
            },
            {
                path: 'AssemblyRelEdit/:id',
                component: AssemblyRelAddEditComponent,
                data: {
                    title: 'Assembly Relation'
                }
            },
            {
                path: 'AssemblyRelationView',
                component: AssemblyRelationViewComponent,
                data: {
                    title: 'AssemblyRelationView'
                }
            },
	      {
                path: 'MasterDashboard',
                component: MasterDashboardComponent,
                data: {
                    title: 'Estimation Cost Master'
                }
                
            },
            {
                path: 'CategoryAddEdit',
                component: CategoryAddEditComponent,
                data: {
                    title: 'Catalogue Master'
                }
            },
            {
                path: 'CategoryAddEdit/:id',
                component: CategoryAddEditComponent,
                data: {
                    title: 'Catalogue Master'
                }
            },
            {
                path: 'CategoryView',
                component: CategoryviewComponent,
                data: {
                    title: 'Catalogue Master'
                }
            },
            {
                path: 'EstiMateItemAddEdit',
                component: EstAddEditItemComponent,
                data: {
                    title: 'Item Master'
                }
            },
            {
                path: 'EstiMateItemAddEdit/:id',
                component: EstAddEditItemComponent,
                data: {
                    title: 'Item Master'
                }
            },
            {
                path: 'EstiMateItemView',
                component: EstViewitemComponent,
                data: {
                    title: 'EstViewitemComponent'
                }
            },
            {
                path: 'EstimateGroup',
                component: EstimateGroupAddEditComponent,
                data: {
                    title: 'Estimate Group'
                }
            },
            {
                path: 'EstimateGroup/:id',
                component: EstimateGroupAddEditComponent,
                data: {
                    title: 'Estimate Group'
                }
            },
            {
                path: 'EstimateGroupView',
                component: EstimateGroupViewComponent,
                data: {
                    title: 'Estimate Group'
                }
            },
            {
                path: 'EstiMarketCtg',
                component: MarketCategoryAddEditComponent,
                data: {
                    title: 'MarkUp Category'
                }
            },
            {
                path: 'EstiMarketCtg/:id',
                component: MarketCategoryAddEditComponent,
                data: {
                    title: 'MarkUp Category'
                }
            },
            {
                path: 'EstiMarketCtgview',
                component: MarketCategoryViewComponent,
                data: {
                    title: 'Market Category'
                }
            },
            {
                path: 'ResourceView',
                component: ResourceViewComponent,
                data: {
                    title: 'Resource Master'
                }
            },
            {
                path: 'ResourceAddEdit',
                component: ResourceAddEditComponent,
                data: {
                    title: 'Resource Master'
                }
            },
            {
                path: 'ResourceAddEdit/:id',
                component: ResourceAddEditComponent,
                data: {
                    title: 'Resource Master'
                }
            },
            {
                path: 'DepartView',
                component: DepartViewComponent,
                data: {
                    title: 'Department Master'
                }
            },
            {
                path: 'DepartAddEdit',
                component: DepartAddEditComponent,
                data: {
                    title: 'Department Master'
                }
            },
            {
                path: 'DepartAddEdit/:id',
                component: DepartAddEditComponent,
                data: {
                    title: 'Department Master'
                }
            },
            {
                path: 'OverheadView',
                component: OverheadViewComponent,
                data: {
                    title: 'Overhead Master'
                }
            },
            {
                path: 'OverHeadAddEdit',
                component: OverHeadAddEditComponent,
                data: {
                    title: 'Overhead Master'
                }
            },
            {
                path: 'OverHeadAddEdit/:id',
                component: OverHeadAddEditComponent,
                data: {
                    title: 'Overhead Master'
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
export class EstimateItemRoutingModule { }