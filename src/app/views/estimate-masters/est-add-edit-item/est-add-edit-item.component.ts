import { Component, OnInit } from '@angular/core';
import { ItemGroupAddEditModel } from '../../../models/itemgrp.model';
import { CommonService } from '../../../core/services/common.service';
import { OverHeadService } from '../../../core/services/overhead.service';
import { CommonData } from '../../../core/data/CommonData';
import { MarkUpCtgService } from '../../../core/services/markup.service';
import { ItemGroupService } from '../../../core/services/itemgrp.service';
import { CatalogueService } from '../../../core/services/catalogue.service';
import { AssembelyrelService } from '../../../core/services/assembelyRel.service';
import { CustVenService } from '../../../core/services/custVen.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-est-add-edit-item',
  templateUrl: './est-add-edit-item.component.html',
  styleUrls: ['./est-add-edit-item.component.scss']
})

export class EstAddEditItemComponent implements OnInit {

  constructor(private itemAddeditmodel: ItemGroupAddEditModel, private custVenService: CustVenService, private catelog: CatalogueService, private assemblyRel: AssembelyrelService, private ActivatedRouter: ActivatedRoute, private router: Router, private service: ItemGroupService, private markupservice: MarkUpCtgService, private overhide: OverHeadService
    , private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/EstiMateItemView"
  public itemgrpAddeditModel = this.itemAddeditmodel.itemgroupAddeditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public serviceData = [];
  public showLookupLoader: any = false;
  public lookupfor = "";
  public isdisabled: any = false;

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
        this.itemgrpAddeditModel.OPTM_OVERHEADGRPCODE = $event[0];
      }
      if (this.lookupfor == "Markup Category") {
        this.itemgrpAddeditModel.OPTM_MARKUP_CODE = $event[0];
      }
      if (this.lookupfor == "Catalogue Master") {
        this.itemgrpAddeditModel.OPTM_CATALOGUEID = $event[1];
      }
      if (this.lookupfor == "Assembly Relationship") {
        this.itemgrpAddeditModel.OPTM_PARENT_ASSB = $event[1];
      }
      if (this.lookupfor == "Customer Vendor Master") {
        this.itemgrpAddeditModel.OPTM_VENDORCODE = $event[0];
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

  fetchVendorlookupData() {
    this.serviceData = [];
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

  // function for look up of Catalogue Code 

  fetchCataloguelookupData() {
    this.serviceData = [];
    this.catelog.fetchCatalogueData().subscribe(
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
          this.lookupfor = "Catalogue Master";

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

  // function for look up of Department Code 

  fetchAssemblyRellookupData() {
    this.serviceData = [];
    this.assemblyRel.fetchAssembelyRelData().subscribe(
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
          this.lookupfor = "Assembly Relationship";

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
    this.service.fetchItemGroupEditData(id).subscribe(
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
          this.itemgrpAddeditModel.OPTM_PARTCODE = data.OPTM_EST_PRODUCTS[0].OPTM_PARTCODE;
          this.itemgrpAddeditModel.OPTM_PARTDESC = data.OPTM_EST_PRODUCTS[0].OPTM_PARTDESC;
          this.itemgrpAddeditModel.OPTM_VENDORCODE = data.OPTM_EST_PRODUCTS[0].OPTM_VENDORCODE;
          this.itemgrpAddeditModel.OPTM_PRICELISTCODE = data.OPTM_EST_PRODUCTS[0].OPTM_PRICELISTCODE;
          this.itemgrpAddeditModel.OPTM_PRICE = data.OPTM_EST_PRODUCTS[0].OPTM_PRICE;
          this.itemgrpAddeditModel.OPTM_VENDORITMCODE = data.OPTM_EST_PRODUCTS[0].OPTM_VENDORITMCODE;
          this.itemgrpAddeditModel.OPTM_CUSTOMERITMCODE = data.OPTM_EST_PRODUCTS[0].OPTM_CUSTOMERITMCODE;
          this.itemgrpAddeditModel.OPTM_QUANTITY = data.OPTM_EST_PRODUCTS[0].OPTM_QUANTITY;
          this.itemgrpAddeditModel.OPTM_UOMCODE = data.OPTM_EST_PRODUCTS[0].OPTM_UOMCODE;
          this.itemgrpAddeditModel.OPTM_CATALOGUEID = data.OPTM_EST_PRODUCTS[0].OPTM_CATALOGUEID;
          this.itemgrpAddeditModel.OPTM_ITEMCODE = data.OPTM_EST_PRODUCTS[0].OPTM_ITEMCODE;
          this.itemgrpAddeditModel.OPTM_ITEMGRPCODE = data.OPTM_EST_PRODUCTS[0].OPTM_ITEMGRPCODE;
          this.itemgrpAddeditModel.OPTM_ITEMTYPCODE = data.OPTM_EST_PRODUCTS[0].OPTM_ITEMTYPCODE;
          this.itemgrpAddeditModel.OPTM_TOTAL = data.OPTM_EST_PRODUCTS[0].OPTM_TOTAL;
          this.itemgrpAddeditModel.OPTM_OVERHEADGRPCODE = data.OPTM_EST_PRODUCTS[0].OPTM_OVERHEADGRPCODE;
          this.itemgrpAddeditModel.OPTM_MARKUP_CODE = data.OPTM_EST_PRODUCTS[0].OPTM_MARKUP_CODE;
          this.itemgrpAddeditModel.OPTM_PARENT_ASSB = data.OPTM_EST_PRODUCTS[0].OPTM_PARENT_ASSB;
          this.itemgrpAddeditModel.OPTM_PROPERTYGRPCODE = data.OPTM_EST_PRODUCTS[0].OPTM_PROPERTYGRPCODE;
          this.itemgrpAddeditModel.OPTM_ISACTIVE = data.OPTM_EST_PRODUCTS[0].OPTM_ACTIVE;
          if (this.itemgrpAddeditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

          this.itemgrpAddeditModel.ADD = 0;

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

  // function for Calculate Total Price 

  calculateTotalPrice() {
    if (this.itemgrpAddeditModel.OPTM_QUANTITY != "") {
      this.itemgrpAddeditModel.OPTM_QUANTITY = parseFloat(this.itemgrpAddeditModel.OPTM_QUANTITY).toFixed(2);
    }
    if (this.itemgrpAddeditModel.OPTM_PRICE != "") {
      this.itemgrpAddeditModel.OPTM_PRICE = parseFloat(this.itemgrpAddeditModel.OPTM_PRICE).toFixed(2);
    }
    if (this.itemgrpAddeditModel.OPTM_QUANTITY != "" && this.itemgrpAddeditModel.OPTM_PRICE != "") {
      this.itemgrpAddeditModel.OPTM_TOTAL = (parseInt(this.itemgrpAddeditModel.OPTM_QUANTITY) * parseFloat(this.itemgrpAddeditModel.OPTM_PRICE)).toFixed(2);
    }
  }
  // function for Validate Fields 
  validateFields() {
    if (this.itemgrpAddeditModel.OPTM_PARTCODE == "") {
      this.CommonService.show_notification(this.language.Field_Partcode, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_PARTDESC == "") {
      this.CommonService.show_notification(this.language.Field_Description, 'warning');
      return false;
    }

    if (this.itemgrpAddeditModel.OPTM_VENDORITMCODE == "") {
      this.CommonService.show_notification(this.language.Field_Vendoritem, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_CUSTOMERITMCODE == "") {
      this.CommonService.show_notification(this.language.Field_Customeritem, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_ITEMCODE == "") {
      this.CommonService.show_notification(this.language.Field_Itemcode, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_ITEMGRPCODE == "") {
      this.CommonService.show_notification(this.language.Field_Itemcode, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_ITEMTYPCODE == "") {
      this.CommonService.show_notification(this.language.Field_Itemtype, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_CATALOGUEID == "") {
      this.CommonService.show_notification(this.language.Field_CatalogueID, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_QUANTITY == "") {
      this.CommonService.show_notification(this.language.Field_Quantity, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_UOMCODE == "") {
      this.CommonService.show_notification(this.language.Field_Uom, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_PRICE == "") {
      this.CommonService.show_notification(this.language.Field_Price, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_MARKUP_CODE == "") {
      this.CommonService.show_notification(this.language.Field_Markup_Ctg, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_OVERHEADGRPCODE == "") {
      this.CommonService.show_notification(this.language.Field_OverheadGroup, 'warning');
      return false;
    }


    if (this.itemgrpAddeditModel.OPTM_PROPERTYGRPCODE == "") {
      this.CommonService.show_notification(this.language.Field_Propertygroup, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_PARENT_ASSB == "") {
      this.CommonService.show_notification(this.language.Field_ParentAssb, 'warning');
      return false;
    }
    if (this.itemgrpAddeditModel.OPTM_VENDORCODE == "") {
      this.CommonService.show_notification(this.language.Field_VendorCode, 'warning');
      return false;
    }






    return true;
  }

  // function for Reset Fields
  resetFields() {

    this.itemgrpAddeditModel.OPTM_USER = "";
    this.itemgrpAddeditModel.OPTM_PARTCODE = "";
    this.itemgrpAddeditModel.OPTM_PARTDESC = "";
    this.itemgrpAddeditModel.OPTM_VENDORCODE = "";
    this.itemgrpAddeditModel.OPTM_PRICELISTCODE = "";
    this.itemgrpAddeditModel.OPTM_PRICE = "";
    this.itemgrpAddeditModel.OPTM_QUANTITY = "";
    this.itemgrpAddeditModel.OPTM_UOMCODE = "";
    this.itemgrpAddeditModel.OPTM_CATALOGUEID = "";
    this.itemgrpAddeditModel.OPTM_ITEMCODE = "";
    this.itemgrpAddeditModel.OPTM_ITEMGRPCODE = "";
    this.itemgrpAddeditModel.OPTM_ITEMTYPCODE = "";
    this.itemgrpAddeditModel.OPTM_PARENT_ASSB = "";
    this.itemgrpAddeditModel.OPTM_VENDORITMCODE = "";
    this.itemgrpAddeditModel.OPTM_CUSTOMERITMCODE = "";
    this.itemgrpAddeditModel.OPTM_TOTAL = "";
    this.itemgrpAddeditModel.OPTM_OVERHEADGRPCODE = "";
    this.itemgrpAddeditModel.OPTM_MARKUP_CODE = "";
    this.itemgrpAddeditModel.OPTM_PROPERTYGRPCODE = "";
    this.itemgrpAddeditModel.ADD = 1;

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.itemgrpAddeditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    this.itemgrpAddeditModel.OPTM_DSP_ORDER = parseInt(this.itemgrpAddeditModel.OPTM_DSP_ORDER);
    if (this.isActive) {
      this.itemgrpAddeditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.itemgrpAddeditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_PRODUCTS = [];
    savedData.OPTM_EST_PRODUCTS.push(this.itemgrpAddeditModel);

    this.service.addUpdateItemGroup(savedData).subscribe(data => {

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
        this.router.navigateByUrl("/estimate-item/EstiMateItemView");
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


