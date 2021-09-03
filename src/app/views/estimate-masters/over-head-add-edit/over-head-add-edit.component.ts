import { Component, OnInit } from '@angular/core';
import { OverHeadAddEditModel } from '../../../models/overhead.model';
import { CommonService } from '../../../core/services/common.service';
import { OverHeadService } from '../../../core/services/overhead.service';
import { CommonData } from '../../../core/data/CommonData';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-over-head-add-edit',
  templateUrl: './over-head-add-edit.component.html',
  styleUrls: ['./over-head-add-edit.component.scss']
})

export class OverHeadAddEditComponent implements OnInit {

  constructor(private overheadAddEditModel: OverHeadAddEditModel, private ActivatedRouter: ActivatedRoute, private router: Router, private service: OverHeadService, private CommonService: CommonService) { }

  // Defines Variables 

  language = JSON.parse(sessionStorage.getItem('current_lang'));
  public view_route_link = "/estimate-item/OverheadView"
  public overheadAddeditModel = this.overheadAddEditModel.overHeadAddeditModel;
  private commonData = new CommonData();
  public codeKey: any = "";
  public isActive: any = true;
  public isdisable : any = false;

  ngOnInit(): void {
    this.resetFields();
    this.codeKey = this.ActivatedRouter.snapshot.paramMap.get('id');
    if (this.codeKey != null) {
      this.fetchEditData(this.codeKey)
      this.isdisable = true;
    }
  }

  // function for fetch edit data 

  fetchEditData(id: any) {
    this.service.fetchoverHeadEditData(id).subscribe(
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
          this.overheadAddeditModel.OPTM_OVERHEADGRPCODE = data.OPTM_EST_OVERHEADGRMST[0].OPTM_OVERHEADGRPCODE;
          this.overheadAddeditModel.OPTM_OVERHEADGRPDESC = data.OPTM_EST_OVERHEADGRMST[0].OPTM_OVERHEADGRPDESC;
          this.overheadAddeditModel.OPTM_OVERHEADGRPPERC = data.OPTM_EST_OVERHEADGRMST[0].OPTM_OVERHEADGRPPERC;
          this.overheadAddeditModel.OPTM_ISACTIVE = data.OPTM_EST_OVERHEADGRMST[0].OPTM_ACTIVE;
          if (this.overheadAddeditModel.OPTM_ISACTIVE = "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

          this.overheadAddeditModel.ADD = 0;

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

    if (this.overheadAddeditModel.OPTM_OVERHEADGRPCODE == "") {
      this.CommonService.show_notification(this.language.Field_OverheadGroup, 'warning');
      return false;
    }
    if (this.overheadAddeditModel.OPTM_OVERHEADGRPDESC == "") {
      this.CommonService.show_notification(this.language.Field_Description, 'warning');
      return false;
    }
    if (this.overheadAddeditModel.OPTM_OVERHEADGRPPERC == "") {
      this.CommonService.show_notification(this.language.Field_OverheadPer, 'warning');
      return false;
    }


    return true;
  }

  // function for Reset Fields
  resetFields() {
    this.overheadAddeditModel.OPTM_OVERHEADGRPCODE = "";
    this.overheadAddeditModel.OPTM_OVERHEADGRPDESC = "";
    this.overheadAddeditModel.OPTM_OVERHEADGRPPERC = "";
    this.overheadAddeditModel.OPTM_USER = "";

  }

  // function for Save Fields
  onSave() {
    if (!this.validateFields()) {
      return;
    }
    this.overheadAddeditModel.OPTM_USER = sessionStorage.getItem("loggedInUser");
    if (this.isActive) {
      this.overheadAddeditModel.OPTM_ISACTIVE = "1";
    }
    else {
      this.overheadAddeditModel.OPTM_ISACTIVE = "0";
    }
    let savedData: any = {};
    savedData.OPTM_EST_OVERHEADGRMST = [];
    savedData.OPTM_EST_OVERHEADGRMST.push(this.overheadAddeditModel);

    this.service.addUpdateoverHead(savedData).subscribe(data => {

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
        this.router.navigateByUrl("/estimate-item/OverheadView");
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
