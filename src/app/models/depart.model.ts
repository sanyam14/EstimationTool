import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class DepartAddEdit {
    public departAddEditModel: any = {
        OPTM_DEPTCODE:"",
        OPTM_DEPTDESC:"",
        OPTM_OVERHEADGRPCODE:"",
        OPTM_ISACTIVE: "1",
        OPTM_USER: "",
        ADD:1
    }
}

