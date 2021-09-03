import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonData } from "./../data/CommonData";


@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    public config_params: any;
    public logged_in_company: any;
    common_params = new CommonData();
    constructor(private httpclient: HttpClient) {
        this.config_params = JSON.parse(sessionStorage.getItem('system_config'));
    }

    // function for Add Update Department Relationship

    addUpdateDepart(saveData: any): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        saveData.OPTM_EST_DEPARTMENT_MST[0]['GUID'] = sessionStorage.getItem("GUID");
        saveData.OPTM_EST_DEPARTMENT_MST[0]['UsernameForLic'] = sessionStorage.getItem("loggedInUser");
        saveData.OPTM_EST_DEPARTMENT_MST[0]['CompanyDBID'] = sessionStorage.selectedComp;

        var jObject = { GetData: JSON.stringify(saveData) };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/DepartmentMaster/AddUpdateDepartmentMaster", jObject, this.common_params.httpOptions);
    }

    // function for fetch Department Relation data 

    fetchDepartData(): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        let jObject = {
            GetData: JSON.stringify([{
                CompanyDBID: this.logged_in_company,
                GUID: sessionStorage.getItem("GUID"), UsernameForLic: sessionStorage.getItem("loggedInUser")
            }])
        };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/DepartmentMaster/GetDataForDepartmentMaster ", jObject, this.common_params.httpOptions);
    }

    // function for fetch Department Relation data 

    fetchDepartEditData(id: any): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        let jObject = {
            GetData: JSON.stringify([{
                CompanyDBID: this.logged_in_company,
                OPTM_DEPTCODE:id,
                GUID: sessionStorage.getItem("GUID"), UsernameForLic: sessionStorage.getItem("loggedInUser")
            }])
        };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/DepartmentMaster/GetDataByDepCode", jObject, this.common_params.httpOptions);
    }

    // delete Department data 

    deleteDepartData(Id): Observable<any> {
        //JSON Obeject Prepared to be send as a param to API
        let jObject = { GetData: JSON.stringify(Id) };

        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/DepartmentMaster/DeleteByDepCode", jObject, this.common_params.httpOptions);
    }





}