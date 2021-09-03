import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class CatalogueRelAddEdit {
    public catalogueAddEditModel: any = {
        OPTM_SEQ_ID: 0,
        OPTM_CATALOGUEID: "",
        OPTM_CATLG_DESC: "",
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD:1
    }
}

