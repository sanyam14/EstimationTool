import { Component, OnInit } from '@angular/core';
import { CatalogueRelAddEdit } from '../../../models/catalogue.model';
import { CommonService } from '../../../core/services/common.service';
import { CatalogueService } from '../../../core/services/catalogue.service';
import { CommonData } from '../../../core/data/CommonData';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})

export class CategoryAddEditComponent implements OnInit {

  constructor(private catalogueAddEditModel: CatalogueRelAddEdit, private ActivatedRouter: ActivatedRoute, private router: Router, private service: CatalogueService, private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/CategoryView"
  public catalogueAddedtModel = this.catalogueAddEditModel.catalogueAddEditModel;
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
    this.service.fetchCatalogueEditData(id).subscribe(
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
          this.catalogueAddedtModel.OPTM_SEQ_ID = data.OPTM_EST_CATALOGUEMST[0].OPTM_SEQ_ID;
          this.catalogueAddedtModel.OPTM_CATALOGUEID = data.OPTM_EST_CATALOGUEMST[0].OPTM_CATALOGUEID;
          this.catalogueAddedtModel.OPTM_CATLG_DESC = data.OPTM_EST_CATALOGUEMST[0].OPTM_CATLG_DESC;
          this.catalogueAddedtModel.OPTM_ISACTIVE = data.OPTM_EST_CATALOGUEMST[0].OPTM_ISACTIVE;
          if (this.catalogueAddedtModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

          this.catalogueAddedtModel.ADD = 0;

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
    if (this.catalogueAddedtModel.OPTM_CATALOGUEID == "") {
      this.CommonService.show_notification(this.language.Field_CatalogueID, 'warning');
      return false;
    }
    if (this.catalogueAddedtModel.OPTM_CATLG_DESC == "") {
      this.CommonService.show_notification(this.language.Field_Description, 'warning');
      return false;
    }

    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.catalogueAddedtModel.OPTM_CATALOGUEID = "";
    this.catalogueAddedtModel.OPTM_CATLG_DESC = "";
    this.catalogueAddedtModel.OPTM_USER = "";
    this.catalogueAddedtModel.OPTM_SEQ_ID = 0;

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.catalogueAddedtModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    if (this.isActive) {
      this.catalogueAddedtModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.catalogueAddedtModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_CATALOGUEMST = [];
    savedData.OPTM_EST_CATALOGUEMST.push(this.catalogueAddedtModel);

    this.service.addUpdateCatalogue(savedData).subscribe(data => {

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
        this.router.navigateByUrl("/estimate-item/CategoryView");
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