import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonData } from '../../../core/data/CommonData';
import { AssembelyrelService } from '../../../core/services/assembelyRel.service';
import { CommonService } from '../../../core/services/common.service';
import { AssembelyRelAddEdit } from '../../../models/assembleyRelmodel';
import {ItemGroupService} from '../../../core/services/itemgrp.service';


@Component({
  selector: 'app-assembly-rel-add-edit',
  templateUrl: './assembly-rel-add-edit.component.html',
  styleUrls: ['./assembly-rel-add-edit.component.scss']
})
export class AssemblyRelAddEditComponent implements OnInit {

  constructor(private assembelyRelAddEditModel: AssembelyRelAddEdit, private itemservice : ItemGroupService, private ActivatedRouter: ActivatedRoute, private router: Router, private service: AssembelyrelService, private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/AssemblyRelationView"
  public assembelyAddEditModel = this.assembelyRelAddEditModel.AssemleyAddEditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public lookupfor : any ="";
  public serviceData : any = [];
  public showLoader : any = false;
  public showLookupLoader : any = false;

  ngOnInit(): void {
    this.resetFields();
    this.codeKey = this.ActivatedRouter.snapshot.paramMap.get('id');
    if (this.codeKey != null) {
      this.fetchEditData(this.codeKey)
    }
  }

  // function for fetch item master lookup

  fetchItemlookupData(data: any)
  {
  if(data.currentTarget.classList[1] == "p")
  {
    this.lookupfor = "item_master_parent";
  }
  else
  {
    this.lookupfor = "item_master_child";
  }

  this.itemservice.fetchItemGroupData().subscribe(
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

  getLookupValue($event) {

    if ($event.length == 0) {
      this.lookupfor = "";
      return;
    }
    if (this.lookupfor != "") {
      if (this.lookupfor == "item_master_parent") {
        this.assembelyAddEditModel.OPTM_PARENT_ASSB = $event[0];
      }
      if(this.lookupfor == "item_master_child")
      {
        this.assembelyAddEditModel.OPTM_CHILD_ASSB = $event[0];
      }
     

    }
    this.lookupfor = "";
  }

  // function for fetch edit data 

  fetchEditData(id: any) {
    this.service.fetchAssembelyRelEditData(id).subscribe(
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
          this.assembelyAddEditModel.OPTM_SEQ_ID = data.OPTM_EST_ITM_ASM_PC[0].OPTM_SEQ_ID;
          this.assembelyAddEditModel.OPTM_PARENT_ASSB = data.OPTM_EST_ITM_ASM_PC[0].OPTM_PARENT_ASSB;
          this.assembelyAddEditModel.OPTM_CHILD_ASSB = data.OPTM_EST_ITM_ASM_PC[0].OPTM_CHILD_ASSB;
          this.assembelyAddEditModel.OPTM_ISACTIVE = data.OPTM_EST_ITM_ASM_PC[0].OPTM_ISACTIVE;
          if (this.assembelyAddEditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

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
    if (this.assembelyAddEditModel.OPTM_PARENT_ASSB == "") {
      this.CommonService.show_notification(this.language.Field_ParentAssb, 'warning');
      return false;
    }
    if (this.assembelyAddEditModel.OPTM_CHILD_ASSB == "") {
      this.CommonService.show_notification(this.language.Field_SubAssb, 'warning');
      return false;
    }

    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.assembelyAddEditModel.OPTM_PARENT_ASSB = "";
    this.assembelyAddEditModel.OPTM_CHILD_ASSB = "";
    this.assembelyAddEditModel.OPTM_USER = "";
    this.assembelyAddEditModel.OPTM_SEQ_ID = 0;

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.assembelyAddEditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    if (this.isActive) {
      this.assembelyAddEditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.assembelyAddEditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_ITM_ASM_PC = [];
    savedData.OPTM_EST_ITM_ASM_PC.push(this.assembelyAddEditModel);
    this.showLoader = true;

    this.service.addUpdateAssembelyRel(savedData).subscribe(data => {
      this.showLoader = false;

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
        this.router.navigateByUrl("/estimate-item/AssemblyRelationView");
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


