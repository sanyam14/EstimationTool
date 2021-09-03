import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class AssembelyRelAddEdit {
    public AssemleyAddEditModel: any = {
        OPTM_SEQ_ID: 0,
        OPTM_PARENT_ASSB: "",
        OPTM_CHILD_ASSB: "",
        OPTM_ISACTIVE: "1",
        OPTM_USER: ""
    }
}

