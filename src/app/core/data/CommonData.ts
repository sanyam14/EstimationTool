import { HttpHeaders } from '@angular/common/http';


export interface ColumnSetting {
    field: string;
    title: string;
    format?: string;
    type: 'text' | 'numeric' | 'boolean' | 'date';
    width?: string;
    attrType: string;
}

// Example of Data as model, can be used for non updating data (exaple - names, task type and etc)
export class CommonData {
    public imgPath = 'assets/images';
    public project_name: string = "Optipro Configurator";
    public adminDBName: string = "OPTIPROADMIN";
    public href: any = window.location.href;
    public application_path = this.get_current_url();
    public unauthorizedMessage = "The remote server returned an error: (401) Unauthorized.";
    public static sessionExpire: boolean = false;
    public static made_changes: boolean = false;

    /* constructor(private router:Router,private toastr: ToastrService,private commonservice: CommonService) { } */

    public get_current_url() {
        let temp: any = this.href.substring(0, this.href.lastIndexOf('/'));
        if (temp.lastIndexOf('#') != '-1') {
            temp = temp.substring(0, temp.lastIndexOf('#'));
        }
        let sanitized = temp.replace(/^http\:\/\//, '').replace(/\/+/g, '/').replace(/\/+$/, '');
        temp = (window.location.protocol + '//' + sanitized);

        return temp;
    }

    //defining properties for the call 
    public httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate, post- check=0, pre-check=0',
            'Pragma': 'no-cache',
            'Expires': '0'
        })
    }

    
  

  

   
      

  


 



   
}
