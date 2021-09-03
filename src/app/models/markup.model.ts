import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class MarkupAddEditModel {
    public markupAddeditModel: any = {
        OPTM_SEQ_ID: 0,
        OPTM_MARKUP_PERC: "",
        OPTM_MARKUP_CODE: "",
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD:1
    }
}