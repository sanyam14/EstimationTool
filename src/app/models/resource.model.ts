import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ResourceAddEditModel {
    public resourceAddeditModel: any = {
        OPTM_RESCODE:"",
        OPTM_RESDESC:"",
        OPTM_RESTYPE:"",
        OPTM_DEPTCODE:"",
        OPTM_HR_RATE:0,
        OPTM_OVERHEADGRPCODE:"",
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD:1
    }
}