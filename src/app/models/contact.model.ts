import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ContactAddEditModel {
    public contactAddeditModel: any = {
        OPTM_CV_CODE: "",
        OPTM_ADDRESS1: "",
        OPTM_ADDRESS2: "",
        OPTM_ADDTYPE:"",
        OPTM_CITY:"",
        OPTM_ZIPCODE:"",
        OPTM_STATE:"",
        OPTM_COUNTRY:"",
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD:1
    }
}