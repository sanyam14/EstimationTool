import { Component, OnInit } from '@angular/core';
import { ResourceAddEditModel } from '../../../models/resource.model';
import { CommonService } from '../../../core/services/common.service';
import { OverHeadService } from '../../../core/services/overhead.service';
import { CommonData } from '../../../core/data/CommonData';
import { DepartmentService } from '../../../core/services/depart.service';
import { ResourceService } from '../../../core/services/resource.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resource-add-edit',
  templateUrl: './resource-add-edit.component.html',
  styleUrls: ['./resource-add-edit.component.scss']
})

export class ResourceAddEditComponent implements OnInit {

  constructor(private resourceaddeditmodel: ResourceAddEditModel, private ActivatedRouter: ActivatedRoute, private router: Router, private service: ResourceService, private departservice: DepartmentService, private overhide: OverHeadService
    , private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/ResourceView"
  public resourceAddeditModel = this.resourceaddeditmodel.resourceAddeditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public serviceData = [];
  public showLookupLoader: any = false;
  public lookupfor = "";
  public isdisable : any = false;

  ngOnInit(): void {
    this.resetFields();
    this.codeKey = this.ActivatedRouter.snapshot.paramMap.get('id');
    if (this.codeKey != null) {
      this.fetchEditData(this.codeKey)
      this.isdisable = true;
    }
  }

  getLookupValue($event) {

    if ($event.length == 0) {
      this.lookupfor = "";
      return;
    }
    if (this.lookupfor != "") {
      if (this.lookupfor == "Overhead Master") {
        this.resourceAddeditModel.OPTM_OVERHEADGRPCODE = $event[0];
      }
      if (this.lookupfor == "Department Master") {
        this.resourceAddeditModel.OPTM_DEPTCODE = $event[0];
      }
    }
    this.lookupfor = "";
  }

  // function for look up of Department Code 

  fetchDepartmentlookupData() {
    this.serviceData = [];
    this.departservice.fetchDepartData().subscribe(
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

          this.serviceData = data;
          this.showLookupLoader = true;
          this.lookupfor = "Department Master";

        }
        else {

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

  // function for Open Cust Ven data look up

  fetchOverHeadlookupData() {
    this.serviceData = [];
    this.overhide.fetchoverHeadData().subscribe(
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

          this.serviceData = data;
          this.showLookupLoader = true;
          this.lookupfor = "Overhead Master";

        }
        else {

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

  // function for fetch edit data 

  fetchEditData(id: any) {
    this.service.fetchResourceEditData(id).subscribe(
      data => {

        if (data != undefined && data.length > 0) {
          if (data[0].ErrorMsg == "7001") {
            CommonData.made_changes = false;

            this.CommonService.RemoveLoggedInUser().subscribe();
            this.CommonService.signOut(this.router, 'Sessionout');
            return;
          }
        }
        if (data != undefined) {
          this.resourceAddeditModel.OPTM_RESCODE = data.OPTM_EST_RESOURCEMST[0].OPTM_RESCODE;
          this.resourceAddeditModel.OPTM_RESDESC = data.OPTM_EST_RESOURCEMST[0].OPTM_RESDESC;
          this.resourceAddeditModel.OPTM_RESTYPE = data.OPTM_EST_RESOURCEMST[0].OPTM_RESTYPE;
          this.resourceAddeditModel.OPTM_OVERHEADGRPCODE = data.OPTM_EST_RESOURCEMST[0].OPTM_OVERHEADGRPCODE;
          this.resourceAddeditModel.OPTM_DEPTCODE = data.OPTM_EST_RESOURCEMST[0].OPTM_DEPTCODE;
          this.resourceAddeditModel.OPTM_HR_RATE = data.OPTM_EST_RESOURCEMST[0].OPTM_HR_RATE;
          this.resourceAddeditModel.OPTM_ISACTIVE = data.OPTM_EST_RESOURCEMST[0].OPTM_ACTIVE;
          if (this.resourceAddeditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

          this.resourceAddeditModel.ADD = 0;

        }
        else {
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
  // function for Validate Fields 
  validateFields() {
    if (this.resourceAddeditModel.OPTM_RESCODE == "") {
      this.CommonService.show_notification(this.language.Field_Resourcecode, 'warning');
      return false;
    }
    if (this.resourceAddeditModel.OPTM_RESDESC == "") {
      this.CommonService.show_notification(this.language.Field_Description, 'warning');
      return false;
    }
   
    if (this.resourceAddeditModel.OPTM_RESTYPE == "") {
      this.CommonService.show_notification(this.language.Field_Resourcetype, 'warning');
      return false;
    }
    if (this.resourceAddeditModel.OPTM_DEPTCODE == "") {
      this.CommonService.show_notification(this.language.Field_Departmentcode, 'warning');
      return false;
    }
    if (this.resourceAddeditModel.OPTM_HR_RATE == 0) {
      this.CommonService.show_notification(this.language.Field_Hourlyrate, 'warning');
      return false;
    }
   
    if (this.resourceAddeditModel.OPTM_OVERHEADGRPCODE == "") {
      this.CommonService.show_notification(this.language.Field_OverheadGroup, 'warning');
      return false;
    }



    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.resourceAddeditModel.OPTM_DEPTCODE = "";
    this.resourceAddeditModel.OPTM_USER = "";
    this.resourceAddeditModel.OPTM_RESCODE = "";
    this.resourceAddeditModel.OPTM_OVERHEADGRPCODE = "";
    this.resourceAddeditModel.OPTM_HR_RATE = 0;
    this.resourceAddeditModel.OPTM_RESTYPE = "";
    this.resourceAddeditModel.OPTM_RESDESC = "";
    this.resourceAddeditModel.ADD = 1;

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.resourceAddeditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    this.resourceAddeditModel.OPTM_HR_RATE = parseInt(this.resourceAddeditModel.OPTM_HR_RATE);
    if (this.isActive) {
      this.resourceAddeditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.resourceAddeditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_RESOURCEMST = [];
    savedData.OPTM_EST_RESOURCEMST.push(this.resourceAddeditModel);

    this.service.addUpdateResource(savedData).subscribe(data => {

      if (data == "7001") {
        CommonData.made_changes = false
        this.CommonService.RemoveLoggedInUser().subscribe();
        this.CommonService.signOut(this.router, 'Sessionout');
        return;
      }

      if (data === "True") {
        CommonData.made_changes = false
        this.CommonService.show_notification(this.language.DataSaved, 'success');
        this.resetFields();
        this.router.navigateByUrl("/estimate-item/ResourceView");
        return;
      } else if (data == "AlreadyExist") {

        this.CommonService.show_notification(this.language.DuplicateCode, 'error');
        return;
      }
      else {
        this.CommonService.show_notification(this.language.DataNotSaved, 'error');
        return;
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
}

