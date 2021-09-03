import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class OverHeadAddEditModel {
    public overHeadAddeditModel: any = {
        OPTM_OVERHEADGRPCODE: "",
        OPTM_OVERHEADGRPDESC: "",
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD:1
    }
}