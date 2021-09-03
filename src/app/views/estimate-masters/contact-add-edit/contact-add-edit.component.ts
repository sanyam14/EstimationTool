import { Component, OnInit } from '@angular/core';
import { ContactAddEditModel } from '../../../models/contact.model';
import { CommonService } from '../../../core/services/common.service';
import { CustVenService } from '../../../core/services/custVen.service';
import { CommonData } from '../../../core/data/CommonData';
import { ContactService } from '../../../core/services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.scss']
})

export class ContactAddEditComponent implements OnInit {

  constructor(private ContactAddEditModel: ContactAddEditModel, private ActivatedRouter: ActivatedRoute, private router: Router, private service: ContactService, public custVenService: CustVenService
    , private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/ContactView"
  public contactAddeditModel = this.ContactAddEditModel.contactAddeditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public serviceData = [];
  public showLookupLoader: any = false;
  public lookupfor = "";
  public isdisabled : any = false;

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
      if (this.lookupfor == "Customer Vendor Master") {
        this.contactAddeditModel.OPTM_CV_CODE = $event[0];
      }
    }
  }

  // function for Open Cust Ven data look up

  fetchCustVenlookupData() {
    this.custVenService.fetchCustVenData().subscribe(
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
          this.lookupfor = "Customer Vendor Master";

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
    this.service.fetchContactEditData(id).subscribe(
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
          this.contactAddeditModel.OPTM_CV_CODE = data.OPTM_EST_CV_ADDRESSES[0].OPTM_CV_CODE;
          this.contactAddeditModel.OPTM_STATE = data.OPTM_EST_CV_ADDRESSES[0].OPTM_STATE;
          this.contactAddeditModel.OPTM_COUNTRY = data.OPTM_EST_CV_ADDRESSES[0].OPTM_COUNTRY;
          this.contactAddeditModel.OPTM_CITY = data.OPTM_EST_CV_ADDRESSES[0].OPTM_CITY;
          this.contactAddeditModel.OPTM_ADDTYPE = data.OPTM_EST_CV_ADDRESSES[0].OPTM_ADDTYPE;
          this.contactAddeditModel.OPTM_ZIPCODE = data.OPTM_EST_CV_ADDRESSES[0].OPTM_ZIPCODE;
          this.contactAddeditModel.OPTM_ADDRESS1 = data.OPTM_EST_CV_ADDRESSES[0].OPTM_ADDRESS1;
          this.contactAddeditModel.OPTM_ADDRESS2 = data.OPTM_EST_CV_ADDRESSES[0].OPTM_ADDRESS2;
          this.contactAddeditModel.OPTM_ISACTIVE = data.OPTM_EST_CV_ADDRESSES[0].OPTM_ACTIVE;
          if (this.contactAddeditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

          this.contactAddeditModel.ADD = 0;

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
    if (this.contactAddeditModel.OPTM_CV_CODE == "") {
      this.CommonService.show_notification(this.language.Field_BusinessPartner, 'warning');
      return false;
    }
    if (this.contactAddeditModel.OPTM_ADDRESS1 == "") {
      this.CommonService.show_notification(this.language.Field_Address1, 'warning');
      return false;
    }
    if (this.contactAddeditModel.OPTM_ADDTYPE == "") {
      this.CommonService.show_notification(this.language.Field_Addresstype, 'warning');
      return false;
    }
    if (this.contactAddeditModel.OPTM_CITY == "") {
      this.CommonService.show_notification(this.language.Field_City, 'warning');
      return false;
    }
    if (this.contactAddeditModel.OPTM_STATE == "") {
      this.CommonService.show_notification(this.language.Field_State, 'warning');
      return false;
    }
    if (this.contactAddeditModel.OPTM_COUNTRY == "") {
      this.CommonService.show_notification(this.language.Field_Country, 'warning');
      return false;
    }
    if (this.contactAddeditModel.OPTM_ZIPCODE == "") {
      this.CommonService.show_notification(this.language.Field_Zipcode, 'warning');
      return false;
    }

    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.contactAddeditModel.OPTM_CV_CODE = "";
    this.contactAddeditModel.OPTM_USER = "";
    this.contactAddeditModel.OPTM_STATE = "";
    this.contactAddeditModel.OPTM_ZIPCODE = "";
    this.contactAddeditModel.OPTM_COUNTRY = "";
    this.contactAddeditModel.OPTM_CITY = "";
    this.contactAddeditModel.OPTM_ADDTYPE = "";
    this.contactAddeditModel.OPTM_ADDRESS1 = "";
    this.contactAddeditModel.OPTM_ADDRESS2 = "";
    this.contactAddeditModel.ADD = 1;

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.contactAddeditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    if (this.isActive) {
      this.contactAddeditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.contactAddeditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_CV_ADDRESSES = [];
    savedData.OPTM_EST_CV_ADDRESSES.push(this.contactAddeditModel);

    this.service.addUpdateContact(savedData).subscribe(data => {

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
        this.router.navigateByUrl("/estimate-item/ContactView");
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
