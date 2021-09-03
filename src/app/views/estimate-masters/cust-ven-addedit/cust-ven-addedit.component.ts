import { Component, OnInit } from '@angular/core';
import { CustVenAddEditModel } from '../../../models/customVen.model';
import { CommonService } from '../../../core/services/common.service';
import { CustVenService } from '../../../core/services/custVen.service';
import { CommonData } from '../../../core/data/CommonData';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cust-ven-addedit',
  templateUrl: './cust-ven-addedit.component.html',
  styleUrls: ['./cust-ven-addedit.component.scss']
})

export class CustVenAddeditComponent implements OnInit {

  constructor(private CustVenAddEditModel: CustVenAddEditModel, private ActivatedRouter: ActivatedRoute, private router: Router, private service: CustVenService
    , private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/CustVenView"
  public custVenAddeditModel = this.CustVenAddEditModel.custVenAddeditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public isdisabled : any =false;

  ngOnInit(): void {
    this.resetFields();
    this.codeKey = this.ActivatedRouter.snapshot.paramMap.get('id');
    if (this.codeKey != null) {
      this.fetchEditData(this.codeKey)
      this.isdisabled = true;
    }
  }

  // function for fetch edit data 

  fetchEditData(id: any) {
    this.service.fetchCustVenEditData(id).subscribe(
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
          this.custVenAddeditModel.OPTM_CV_CODE = data.OPTM_EST_CUST_VENDOR[0].OPTM_CV_CODE;
          this.custVenAddeditModel.OPTM_CV_NAME = data.OPTM_EST_CUST_VENDOR[0].OPTM_CV_NAME;
          this.custVenAddeditModel.OPTM_CV_TYPE = data.OPTM_EST_CUST_VENDOR[0].OPTM_CV_TYPE;
          this.custVenAddeditModel.OPTM_ISACTIVE = data.OPTM_EST_CUST_VENDOR[0].OPTM_ACTIVE;
          if (this.custVenAddeditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

          this.custVenAddeditModel.ADD = 0;

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
    if (this.custVenAddeditModel.OPTM_CV_CODE == "") {
      this.CommonService.show_notification(this.language.Field_BusinessPartner, 'warning');
      return false;
    }
    if (this.custVenAddeditModel.OPTM_CV_NAME == "") {
      this.CommonService.show_notification(this.language.Field_Name, 'warning');
      return false;
    }
    if (this.custVenAddeditModel.OPTM_CV_TYPE == "") {
      this.CommonService.show_notification(this.language.Field_Type, 'warning');
      return false;
    }

    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.custVenAddeditModel.OPTM_CV_TYPE = "";
    this.custVenAddeditModel.OPTM_CV_NAME = "";
    this.custVenAddeditModel.OPTM_CV_CODE = "";
    this.custVenAddeditModel.OPTM_USER = "";

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.custVenAddeditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    if (this.isActive) {
      this.custVenAddeditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.custVenAddeditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_CUST_VENDOR = [];
    savedData.OPTM_EST_CUST_VENDOR.push(this.custVenAddeditModel);

    this.service.addUpdateCustVen(savedData).subscribe(data => {

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
        this.router.navigateByUrl("/estimate-item/CustVenView");
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
