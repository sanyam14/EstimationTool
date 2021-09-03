import { Component, OnInit } from '@angular/core';
import { DepartAddEdit } from '../../../models/depart.model';
import { CommonService } from '../../../core/services/common.service';
import { OverHeadService } from '../../../core/services/overhead.service';
import { CommonData } from '../../../core/data/CommonData';
import { DepartmentService } from '../../../core/services/depart.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-depart-add-edit',
  templateUrl: './depart-add-edit.component.html',
  styleUrls: ['./depart-add-edit.component.scss']
})

export class DepartAddEditComponent implements OnInit {

  constructor(private departAddEditModel: DepartAddEdit, private ActivatedRouter: ActivatedRoute, private router: Router, private service: DepartmentService, private overhide: OverHeadService
    , private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/DepartView"
  public departAddeditModel = this.departAddEditModel.departAddEditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public serviceData = [];
  public showLookupLoader: any = false;
  public lookupfor = "";
  public isdisabled :any = false;

  ngOnInit(): void {
    this.resetFields();
    this.codeKey = this.ActivatedRouter.snapshot.paramMap.get('id');
    if (this.codeKey != null) {
      this.fetchEditData(this.codeKey)
      this.isdisabled = true;
    }
  }

  getLookupValue($event) {

    if ($event.length == 0) {
      this.lookupfor = "";
      return;
    }
    if (this.lookupfor != "") {
      if (this.lookupfor == "Overhead Master") {
        this.departAddeditModel.OPTM_OVERHEADGRPCODE = $event[0];
      }
    }
  }

  // function for Open Cust Ven data look up

  fetchOverHeadlookupData() {
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
    this.service.fetchDepartEditData(id).subscribe(
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
          this.departAddeditModel.OPTM_DEPTCODE = data.OPTM_EST_DEPARTMENT_MST[0].OPTM_DEPTCODE;
          this.departAddeditModel.OPTM_DEPTDESC = data.OPTM_EST_DEPARTMENT_MST[0].OPTM_DEPTDESC;
          this.departAddeditModel.OPTM_OVERHEADGRPCODE = data.OPTM_EST_DEPARTMENT_MST[0].OPTM_OVERHEADGRPCODE;
          this.departAddeditModel.OPTM_ISACTIVE = data.OPTM_EST_DEPARTMENT_MST[0].OPTM_ACTIVE;
          if (this.departAddeditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

          this.departAddeditModel.ADD = 0;

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
    if (this.departAddeditModel.OPTM_DEPTCODE == "") {
      this.CommonService.show_notification(this.language.Field_Departmentcode, 'warning');
      return false;
    }
    if (this.departAddeditModel.OPTM_DEPTDESC == "") {
      this.CommonService.show_notification(this.language.Field_Description, 'warning');
      return false;
    }
    if (this.departAddeditModel.OPTM_OVERHEADGRPCODE == "") {
      this.CommonService.show_notification(this.language.Field_OverheadGroup, 'warning');
      return false;
    }



    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.departAddeditModel.OPTM_DEPTCODE = "";
    this.departAddeditModel.OPTM_USER = "";
    this.departAddeditModel.OPTM_DEPTDESC = "";
    this.departAddeditModel.OPTM_OVERHEADGRPCODE = "";
    this.departAddeditModel.ADD = 1;

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.departAddeditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    if (this.isActive) {
      this.departAddeditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.departAddeditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_DEPARTMENT_MST = [];
    savedData.OPTM_EST_DEPARTMENT_MST.push(this.departAddeditModel);

    this.service.addUpdateDepart(savedData).subscribe(data => {

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
        this.router.navigateByUrl("/estimate-item/DepartView");
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
