import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonData, ColumnSetting } from '../../core/data/CommonData';

import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';


@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {
  @Input() serviceData: any;
  @Input() lookupfor: any;
  @Input() selectedImage: any
  @Input() inputTitle: any
  @Output() lookupvalue = new EventEmitter();
  @Output() lookupvalues = new EventEmitter();

  public commonData = new CommonData();
  language = JSON.parse(sessionStorage.getItem('current_lang'));
  popup_title = '';

  public dialogOpened = false;
  public windowState = "default";
  public isDraggable: boolean = true;
  public skip: number = 0;
  public popup_lookupfor = "";
  public isColumnFilter = false;
  public showLookupLoader: boolean = false;
  public lookup_key = "";
  public fill_input_id = "";
  public table_head: ColumnSetting[] = [];
  public table_head_hidden_elements = [];
  public width_value = '100%';
  public allowUnsort = true;
  public sort: SortDescriptor[];
  public gridView: GridDataResult;


  constructor(

    private CommonService: CommonService,
    private router: Router,

  ) {
  }

  ngOnInit() {
  }

  async ngOnChanges(): Promise<void> {
    this.popup_lookupfor = this.lookupfor;
    this.lookup_key = '';
    this.skip = 0;
    this.dialogOpened = false;
    if (this.popup_lookupfor == "Customer Vendor Master") {
      this.getCustomerVendorlookup();
      return;
    }
    if (this.popup_lookupfor == "Overhead Master") {
      this.getOverHeadlookup();
      return;
    }
    if (this.popup_lookupfor == "Department Master") {
      this.getDepartmentlookup();
      return;
    }
    if (this.popup_lookupfor == "Markup Category") {
      this.getMarkuplookup();
      return;
    }
    if (this.popup_lookupfor == "Catalogue Master") {
      this.getCataloguelookup();
      return;
    }
    if (this.popup_lookupfor == "Assembly Relationship") {
      this.getAssemblyRelookup();
      return;
    }
    if (this.popup_lookupfor == "Product_Details") {
      this.getProductsList();
    }
    if (this.popup_lookupfor == "item_master_parent") {
      this.getItemList();
    }
    if (this.popup_lookupfor == "item_master_child") {
      this.getItemList();
    }
    if (this.lookupfor == "save_product_details") {
      this.getSavedProductsList();
    }


    

  }

  getCataloguelookup()
  {
    this.popup_title = this.language.catalogueMaster;

    this.fill_input_id = 'OPTM_PARENT_ASSB';
    this.lookup_key = 'OPTM_PARENT_ASSB';
    this.table_head = [
      {
        field: 'OPTM_CATALOGUEID',
        title: this.language.catalogueID,
        type: 'text',
        width: '50',
        attrType: 'text'
      },
      {
        field: 'OPTM_CATLG_DESC',
        title: this.language.description,
        type: 'text',
        width: '50',
        attrType: 'text'
      },

    ];
    this.loadtableData();
  }

  getItemList()
  {
    this.popup_title = this.language.itemMaster;

    this.fill_input_id = 'OPTM_PARTCODE';
    this.lookup_key = 'OPTM_PARTCODE';
    this.table_head = [
      {
        field: 'OPTM_PARTCODE',
        title: this.language.partcode,
        type: 'text',
        width: '50',
        attrType: 'text'
      },
      {
        field: 'OPTM_PARTDESC',
        title: this.language.description,
        type: 'text',
        width: '50',
        attrType: 'text'
      },

    ];
    this.loadtableData();
  }

  getAssemblyRelookup ()
  {
    this.popup_title = this.language.AssemblyTitle;

    this.fill_input_id = 'OPTM_PARENT_ASSB';
    this.lookup_key = 'OPTM_PARENT_ASSB';
    this.table_head = [
      {
        field: 'OPTM_PARENT_ASSB',
        title: this.language.ParentAssy,
        type: 'text',
        width: '50',
        attrType: 'text'
      },
      {
        field: 'OPTM_CHILD_ASSB',
        title: this.language.SubAssy,
        type: 'text',
        width: '50',
        attrType: 'text'
      },

    ];
    this.loadtableData();
  }

  getOverHeadlookup() {
    this.popup_title = this.language.overheadMaster;

    this.fill_input_id = 'OPTM_OVERHEADGRPCODE';
    this.lookup_key = 'OPTM_OVERHEADGRPCODE';
    this.table_head = [
      {
        field: 'OPTM_OVERHEADGRPCODE',
        title: this.language.overheadGroup,
        type: 'text',
        width: '50',
        attrType: 'text'
      },
      {
        field: 'OPTM_OVERHEADGRPDESC',
        title: this.language.description,
        type: 'text',
        width: '50',
        attrType: 'text'
      },

    ];
    this.loadtableData();
  }

  getCustomerVendorlookup() {
    this.popup_title = this.language.custVenMaster;

    this.fill_input_id = 'OPTM_CV_CODE';
    this.lookup_key = 'OPTM_CV_CODE';
    this.table_head = [
      {
        field: 'OPTM_CV_CODE',
        title: this.language.businessPartner,
        type: 'text',
        width: '50',
        attrType: 'text'
      },
      {
        field: 'OPTM_CV_TYPE',
        title: this.language.type,
        type: 'text',
        width: '50',
        attrType: 'text'
      },

    ];
    this.loadtableData();

  }

  // function for department look up

  getDepartmentlookup() {

    this.popup_title = this.language.departmentMaster;

    this.fill_input_id = 'OPTM_DEPTCODE';
    this.lookup_key = 'OPTM_DEPTCODE';
    this.table_head = [
      {
        field: 'OPTM_DEPTCODE',
        title: this.language.departmentcode,
        type: 'text',
        width: '50',
        attrType: 'text'
      },
      {
        field: 'OPTM_DEPTDESC',
        title: this.language.description,
        type: 'text',
        width: '50',
        attrType: 'text'
      },

    ];
    this.loadtableData();

  }

  // function for Mark up look up 
  getMarkuplookup()
  {
    
    this.popup_title = this.language.Markup_Category;

    this.fill_input_id = 'OPTM_MARKUP_CODE';
    this.lookup_key = 'OPTM_MARKUP_CODE';
    this.table_head = [
      {
        field: 'OPTM_MARKUP_CODE',
        title: this.language.Markup_Category,
        type: 'text',
        width: '50',
        attrType: 'text'
      },
      {
        field: 'OPTM_MARKUP_PERC',
        title: this.language.MarkUp_per,
        type: 'text',
        width: '50',
        attrType: 'text'
      },

    ];
    this.loadtableData();
  }

  // function for load data in window 
  loadtableData() {
    this.table_head_hidden_elements = [false];
    this.width_value = ((100 / this.table_head.length) + '%');

    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
        this.loadServerData(this.serviceData);
        // $("#lookup_modal").modal('show');
      }
    }
  }

  getSavedProductsList() {
    this.popup_title = "Product Details";
   
    this.fill_input_id = 'OPTM_SEQ';
    this.lookup_key = 'OPTM_SEQ';
    this.table_head = [
      {
        field: 'OPTM_SEQ',
        title: "Sequance No.",
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_CUSTOMER',
        title: "Customer",
        type: 'text',
        width: '150',
        attrType: 'text'
      },
      {
        field: 'OPTM_CODE',
        title: "Product Code",
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_PROJECT_DESC',
        title: "Product Name",
        type: 'text',
        width: '150',
        attrType: 'text'
      },
      {
        field: 'OPTM_PARTNO',
        title: "Part Number",
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_ESTIMATE_DUEDT',
        title: "Estimetion Date",
        type: 'text',
        width: '150',
        attrType: 'text'
      },
      {
        field: 'OPTM_SALES_REP',
        title: "Sales Representative",
        type: 'text',
        width: '150',
        attrType: 'text'
      },

      {
        field: 'OPTM_TOTAL_COST',
        title: "Total Cost",
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_TOTAL_PRICE',
        title: "Total Price",
        type: 'text',
        width: '100',
        attrType: 'text'
      },

    ];
    this.table_head_hidden_elements = [false];
    this.width_value = ((100 / this.table_head.length) + '%');

    
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
        this.loadServerData(this.serviceData);
        // $("#lookup_modal").modal('show');
      }
    }
  }

  getProductsList() {
    this.popup_title = "Product Details";
    
    this.fill_input_id = 'OPTM_CODE';
    this.lookup_key = 'OPTM_CODE';
    this.table_head = [
      {
        field: 'OPTM_CODE',
        title: "Product Code",
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_DESCRIPTION',
        title: "Product Name",
        type: 'text',
        width: '100',
        attrType: 'text'
      },

    ];
    this.table_head_hidden_elements = [false];
    this.width_value = ((100 / this.table_head.length) + '%');

  
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
        this.loadServerData(this.serviceData);
        // $("#lookup_modal").modal('show');
      }
    }
  }




  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadServerData(this.serviceData);
  }




  private loadServerData(dataset): void {
    if (this.sort !== undefined && this.sort !== null) {
      this.gridView = {
        data: orderBy(dataset, this.sort),
        total: dataset.length
      };
    } else {
      this.gridView = {
        data: dataset,
        total: dataset.length
      };
    }


  }

  on_item_select(selection) {
    var lookup_key = selection.selectedRows[0].dataItem;
    this.lookupvalue.emit(Object.values(lookup_key));
    this.popup_lookupfor = "";
    this.dialogOpened = false;
  }

  close_inner_kenod_dialog() {
    this.dialogOpened = false;
    this.popup_lookupfor = "";
  }


















}


