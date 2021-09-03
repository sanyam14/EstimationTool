import { Component, OnInit } from '@angular/core';
import { EstimateGroupAddEditModel } from '../../../models/estimatgroup.model';
import { CommonService } from '../../../core/services/common.service';
import { OverHeadService } from '../../../core/services/overhead.service';
import { CommonData } from '../../../core/data/CommonData';
import { MarkUpCtgService } from '../../../core/services/markup.service';
import { EstgroupService } from '../../../core/services/estgroup.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-estimate-group-add-edit',
  templateUrl: './estimate-group-add-edit.component.html',
  styleUrls: ['./estimate-group-add-edit.component.scss']
})



export class EstimateGroupAddEditComponent implements OnInit {

  constructor(private estgrpaddeditmodel: EstimateGroupAddEditModel, private ActivatedRouter: ActivatedRoute, private router: Router, private service: EstgroupService, private markupservice: MarkUpCtgService, private overhide: OverHeadService
    , private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/EstimateGroupView"
  public estgrpAddeditModel = this.estgrpaddeditmodel.estgroupAddeditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public serviceData = [];
  public showLookupLoader: any = false;
  public lookupfor = "";
  public isdisabled : any =false;

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
        this.estgrpAddeditModel.OPTM_OVERHEADGRPCODE = $event[0];
      }
      if (this.lookupfor == "Markup Category") {
        this.estgrpAddeditModel.OPTM_MARKUP_CODE = $event[0];
      }
    }
    this.lookupfor = "";
  }

  // function for look up of Department Code 

  fetchMarkupctglookupData() {
    this.serviceData = [];
    this.markupservice.fetchMarkUpCtgData().subscribe(
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
          this.lookupfor = "Markup Category";

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
    this.service.fetchEstGroupEditData(id).subscribe(
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
          this.estgrpAddeditModel.OPTM_ESTGROUPCODE = data.OPTM_EST_ESTGROUP[0].OPTM_ESTGROUPCODE;
          this.estgrpAddeditModel.OPTM_ESTGROUPDESC = data.OPTM_EST_ESTGROUP[0].OPTM_ESTGROUPDESC;
          this.estgrpAddeditModel.OPTM_DSP_ORDER = data.OPTM_EST_ESTGROUP[0].OPTM_DSP_ORDER;
          this.estgrpAddeditModel.OPTM_OVERHEADGRPCODE = data.OPTM_EST_ESTGROUP[0].OPTM_OVERHEADGRPCODE;
          this.estgrpAddeditModel.OPTM_MARKUP_CODE = data.OPTM_EST_ESTGROUP[0].OPTM_MARKUP_CODE;
          this.estgrpAddeditModel.OPTM_PROPERTYGRPCODE = data.OPTM_EST_ESTGROUP[0].OPTM_PROPERTYGRPCODE;
          this.estgrpAddeditModel.OPTM_ISACTIVE = data.OPTM_EST_ESTGROUP[0].OPTM_ACTIVE;
          if (this.estgrpAddeditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

          this.estgrpAddeditModel.ADD = 0;

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
    if (this.estgrpAddeditModel.OPTM_ESTGROUPCODE == "") {
      this.CommonService.show_notification(this.language.Field_Estgroup, 'warning');
      return false;
    }
    if (this.estgrpAddeditModel.OPTM_ESTGROUPDESC == "") {
      this.CommonService.show_notification(this.language.Field_Description, 'warning');
      return false;
    }
   
    if (this.estgrpAddeditModel.OPTM_DSP_ORDER == 0) {
      this.CommonService.show_notification(this.language.Field_Displaygroup, 'warning');
      return false;
    }
    if (this.estgrpAddeditModel.OPTM_PROPERTYGRPCODE == "") {
      this.CommonService.show_notification(this.language.Field_Propertygroup, 'warning');
      return false;
    }
    if (this.estgrpAddeditModel.OPTM_MARKUP_CODE == 0) {
      this.CommonService.show_notification(this.language.Field_Markup_Ctg, 'warning');
      return false;
    }
   
    if (this.estgrpAddeditModel.OPTM_OVERHEADGRPCODE == "") {
      this.CommonService.show_notification(this.language.Field_OverheadGroup, 'warning');
      return false;
    }



    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.estgrpAddeditModel.OPTM_ESTGROUPDESC = "";
    this.estgrpAddeditModel.OPTM_USER = "";
    this.estgrpAddeditModel.OPTM_ESTGROUPCODE= "";
    this.estgrpAddeditModel.OPTM_OVERHEADGRPCODE = "";
    this.estgrpAddeditModel.OPTM_DSP_ORDER = 0;
    this.estgrpAddeditModel.OPTM_PROPERTYGRPCODE = "";
    this.estgrpAddeditModel.OPTM_MARKUP_CODE = "";
    this.estgrpAddeditModel.ADD = 1;

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.estgrpAddeditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    this.estgrpAddeditModel.OPTM_DSP_ORDER= parseInt(this.estgrpAddeditModel.OPTM_DSP_ORDER);
    if (this.isActive) {
      this.estgrpAddeditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.estgrpAddeditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_ESTGROUP = [];
    savedData.OPTM_EST_ESTGROUP.push(this.estgrpAddeditModel);

    this.service.addUpdateEstGroup(savedData).subscribe(data => {

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
        this.router.navigateByUrl("/estimate-item/EstimateGroupView");
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

