import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-dashboard',
  templateUrl: './master-dashboard.component.html',
  styleUrls: ['./master-dashboard.component.scss']
})
export class MasterDashboardComponent implements OnInit {
  public assembly_relation_view_link: any = "/estimate-item/AssemblyRelationView";
  public estimate_item_view_link: any = "/estimate-item/EstiMateItemView";
  public estimate_group_link: any = "/estimate-item/EstimateGroup";
  public estiMarket_ctg_link: any = "/estimate-item/EstiMarketCtg";
  public custVen_add_edit_link: any = "/estimate-item/CustVenAddEdit";
  public contact_add_edit_link: any = "/estimate-item/ContactAddEdit";
  public category_add_edit_link: any = "/estimate-item/CategoryAddEdit";
  public resource_view_link: any = "/estimate-item/ResourceView";
  public depart_view_link: any = "/estimate-item/DepartView";
  public overhead_view_link: any = "/estimate-item/OverheadView";
  public estimate_working_add_edit_link: any = "/estimate-item/EstimateWorkingAddEdit";
  constructor() { }

  ngOnInit(): void {
  }

} 





