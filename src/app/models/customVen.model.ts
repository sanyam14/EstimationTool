import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class CustVenAddEditModel {
    public custVenAddeditModel: any = {
        OPTM_CV_CODE: "",
        OPTM_CV_NAME: "",
        OPTM_CV_TYPE:"",
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD:1
    }
}