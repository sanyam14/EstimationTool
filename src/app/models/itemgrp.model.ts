import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ItemGroupAddEditModel {
    public itemgroupAddeditModel: any = {
        OPTM_PARTCODE: "",
        OPTM_PARTDESC: "",
        OPTM_MARKUP_CODE:"",
        OPTM_VENDORCODE:"",
        OPTM_PRICELISTCODE:"",
        OPTM_PRICE:"",
        OPTM_QUANTITY:"",
        OPTM_UOMCODE:"",
        OPTM_TOTAL:"",
        OPTM_VENDORITMCODE:"",
        OPTM_CUSTOMERITMCODE:"",
        OPTM_CATALOGUEID:"",
        OPTM_ITEMCODE:"",
        OPTM_ITEMGRPCODE:"",
        OPTM_OVERHEADGRPCODE:"",
        OPTM_PROPERTYGRPCODE:"",
        OPTM_ITEMTYPCODE:"",
        OPTM_PARENT_ASSB:"",
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD:1
    }
}