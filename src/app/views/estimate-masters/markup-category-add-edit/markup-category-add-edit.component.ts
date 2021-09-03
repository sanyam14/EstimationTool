import { Component, OnInit } from '@angular/core';
import { MarkupAddEditModel } from '../../../models/markup.model';
import { CommonService } from '../../../core/services/common.service';
import { MarkUpCtgService } from '../../../core/services/markup.service';
import { CommonData } from '../../../core/data/CommonData';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-market-category-add-edit',
  templateUrl: './markup-category-add-edit.component.html',
  styleUrls: ['./markup-category-add-edit.component.scss']
})

export class MarketCategoryAddEditComponent implements OnInit {

  constructor(private markupAddEditModel: MarkupAddEditModel, private ActivatedRouter: ActivatedRoute, private router: Router, private service: MarkUpCtgService, private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/EstiMarketCtgview"
  public markupAddeditModel = this.markupAddEditModel.markupAddeditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public isMarkDisable : any = false;

  ngOnInit(): void {
    this.resetFields();
    this.codeKey = this.ActivatedRouter.snapshot.paramMap.get('id');
    if (this.codeKey != null) {
      this.fetchEditData(this.codeKey)
    }
  }

  // function for fetch edit data 

  fetchEditData(id: any) {
    this.service.fetchMarkUpCtgEditData(id).subscribe(
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
          this.markupAddeditModel.OPTM_SEQ_ID = data.OPTM_EST_MARKUPCATEGORY[0].OPTM_SEQ_ID;
          this.markupAddeditModel.OPTM_MARKUP_PERC = data.OPTM_EST_MARKUPCATEGORY[0].OPTM_MARKUP_PERC;
          this.markupAddeditModel.OPTM_MARKUP_CODE = data.OPTM_EST_MARKUPCATEGORY[0].OPTM_MARKUP_CODE;
          this.markupAddeditModel.OPTM_ISACTIVE = data.OPTM_EST_MARKUPCATEGORY[0].OPTM_ACTIVE;
          if (this.markupAddeditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }
          this.markupAddeditModel.ADD = 0;
          this.isMarkDisable = true;

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
    if (this.markupAddeditModel.OPTM_MARKUP_CODE == "") {
      this.CommonService.show_notification(this.language.Field_Markup_Ctg, 'warning');
      return false;
    }
    if (this.markupAddeditModel.OPTM_MARKUP_PERC == "") {
      this.CommonService.show_notification(this.language.Field_MarkupPer, 'warning');
      return false;
    }

    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.markupAddeditModel.OPTM_MARKUP_PERC = "";
    this.markupAddeditModel.OPTM_MARKUP_CODE = "";
    this.markupAddeditModel.OPTM_USER = "";

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.markupAddeditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    if (this.isActive) {
      this.markupAddeditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.markupAddeditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_MARKUPCATEGORY = [];
    savedData.OPTM_EST_MARKUPCATEGORY.push(this.markupAddeditModel);

    this.service.addUpdateMarkUpCtg(savedData).subscribe(data => {

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
        this.router.navigateByUrl("/estimate-item/EstiMarketCtgview");
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
