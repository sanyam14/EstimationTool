import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class EstimateGroupAddEditModel {
    public estgroupAddeditModel: any = {
        OPTM_ESTGROUPCODE: "",
        OPTM_ESTGROUPDESC: "",
        OPTM_MARKUP_CODE: "",
        OPTM_OVERHEADGRPCODE: "",
        OPTM_PROPERTYGRPCODE: "",
        OPTM_DSP_ORDER: 0,
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD: 1
    }
}