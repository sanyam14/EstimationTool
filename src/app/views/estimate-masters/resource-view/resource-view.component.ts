import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { Router } from '@angular/router';
import { CommonService } from '../../../core/services/common.service';
import { ResourceService } from '../../../core/services/resource.service';
import { CommonData } from '../../../core/data/CommonData';
import { process } from "@progress/kendo-data-query";

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})

export class ResourceViewComponent implements OnInit {

  public gridData: any = [];

  public add_route_link = "/estimate-item/ResourceAddEdit"
  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public isColumnFilter: boolean = false;
  public dialog_params: any = [];
  public commonData = new CommonData();
  public selectedValue: number = 10;
  public skip: number = 0;
  private data: Object[];
  public gridView: GridDataResult;
  record_per_page: any = 10;
  current_page: any = 1;
  public filter: CompositeFilterDescriptor;
  public show_dialog: boolean = false;
  public GetItemData: any;
  public rowId: any = "";

  constructor(private router: Router, private service: ResourceService, private CommonService: CommonService) { }

  ngOnInit(): void {
    this.fetchResourceData();
  }

  // function for page change in grid.

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.selectedValue = event.take;
    this.loadItems();
  }


  // function for filter column and get filter data in grid .

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    let gridData = filterBy(this.gridData, filter);
    this.gridView =
    {
      data: gridData.slice(this.skip, this.skip + this.selectedValue),
      total: gridData.length
    }
  }


  // function for load items  in grid .

  public loadItems(): void {
    this.gridView = {
      data: this.gridData.slice(this.skip, this.skip + this.selectedValue),
      total: this.gridData.length
    };
  }

  //function for filter 

  public onFilter(inputValue: string): void {
    let gridData = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "OPTM_RESCODE",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "OPTM_RESDESC",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "OPTM_RESTYPE",
            operator: "contains",
            value: inputValue,
          },

        ],
      },
    }).data;

    this.gridView =
    {
      data: gridData.slice(this.skip, this.skip + this.selectedValue),
      total: gridData.length
    }


  }

  // function for get current page of grid .

  getcurrentPageSize(grid_value) {
    sessionStorage.setItem('defaultRecords', grid_value);
    console.log('=sessionStorage=======', sessionStorage.defaultRecords);
    this.skip = 0;
    this.selectedValue = grid_value;
    this.record_per_page = sessionStorage.getItem('defaultRecords');
    this.loadItems();
  }


  // function for set default state for filter
  saveFilterState() {
    sessionStorage.setItem('isFilterEnabled', this.isColumnFilter.toString());
  }

  // function for fetch Assembly Rel data 

  fetchResourceData() {
    CommonData.made_changes = true;


    this.service.fetchResourceData().subscribe(
      data => {

        if (data != undefined && data.length > 0) {
          if (data[0].ErrorMsg == "7001") {
            CommonData.made_changes = false;

            this.CommonService.RemoveLoggedInUser().subscribe();
            this.CommonService.signOut(this.router, 'Sessionout');
            return;
          }
        }
        if (data.length > 0) {

          this.gridData = data;
          this.loadItems();
        }
        else {
          this.gridView = null;
          this.CommonService.show_notification(this.language.NoDataAvailable, 'error');
        }
      },
      error => {
        if (error.error.ExceptionMessage.trim() == this.commonData.unauthorizedMessage) {
          this.CommonService.isUnauthorized();
        }
        return;
      }
    )
  }

  // function for Edit Click icon 
  onEdit(data: any) {
    this.router.navigateByUrl('/estimate-item/ResourceAddEdit/' + data.OPTM_RESCODE);
  }

  // function for Delete Click icon 
  onDeleteClick(data: any) {
    this.dialog_params.push({ 'dialog_type': 'delete_confirmation', 'message': this.language.DeleteConfimation });
    this.show_dialog = true;
    this.rowId = data.OPTM_RESCODE;
  }

  //This will take confimation box value
  get_dialog_value(userSelectionValue) {
    if (userSelectionValue == true) {
      this.delete_row();
    }
    this.show_dialog = false;
  }
  //delete values
  delete_row() {
    this.GetItemData = []
    this.GetItemData.push({
      CompanyDBId: sessionStorage.getItem("selectedComp"),
      OPTM_RESCODE : this.rowId,
      GUID: sessionStorage.getItem("GUID"),
      UsernameForLic: sessionStorage.getItem("loggedInUser")
    });
    this.service.deleteResourceData(this.GetItemData).subscribe(
      data => {

        if (data != undefined && data.length > 0) {
          if (data[0].ErrorMsg == "7001") {
            this.CommonService.RemoveLoggedInUser().subscribe();
            this.CommonService.signOut(this.router, 'Sessionout');
            return;
          }
        }

        if (data[0].IsDeleted == "0") {
          this.CommonService.show_notification(this.language.Refrence, 'error');

        }
        else if (data[0].IsDeleted == "1") {
          this.CommonService.show_notification(this.language.DataDeleteSuccesfully, 'error');

          this.fetchResourceData();
        }
        else {
          this.CommonService.show_notification(this.language.DataNotDelete, 'error');
        }


      }, error => {

        if (error.error.ExceptionMessage.trim() == this.commonData.unauthorizedMessage) {
          this.CommonService.isUnauthorized();
        }
        return;
      }
    )
  }

}

