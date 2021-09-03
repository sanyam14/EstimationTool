import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonData } from "./../data/CommonData";


@Injectable({
    providedIn: 'root'
})
export class ItemGroupService {
    public config_params: any;
    public logged_in_company: any;
    common_params = new CommonData();
    constructor(private httpclient: HttpClient) {
        this.config_params = JSON.parse(sessionStorage.getItem('system_config'));
    }

    // function for Add Update Item Group

    addUpdateItemGroup(saveData: any): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        saveData.OPTM_EST_PRODUCTS[0]['GUID'] = sessionStorage.getItem("GUID");
        saveData.OPTM_EST_PRODUCTS[0]['UsernameForLic'] = sessionStorage.getItem("loggedInUser");
        saveData.OPTM_EST_PRODUCTS[0]['CompanyDBID'] = sessionStorage.selectedComp;

        var jObject = { GetData: JSON.stringify(saveData) };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/EstimateProducts/AddUpdateEstimateProducts", jObject, this.common_params.httpOptions);
    }

    // function for fetch Assembely Relation data 

    fetchItemGroupData(): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        let jObject = {
            GetData: JSON.stringify([{
                CompanyDBID: this.logged_in_company,
                GUID: sessionStorage.getItem("GUID"), UsernameForLic: sessionStorage.getItem("loggedInUser")
            }])
        };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/EstimateProducts/GetDataForEstimateProducts ", jObject, this.common_params.httpOptions);
    }

    // function for fetch Assembely Relation data 

    fetchItemGroupEditData(id: any): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        let jObject = {
            GetData: JSON.stringify([{
                CompanyDBID: this.logged_in_company,
                OPTM_PARTCODE:id,
                GUID: sessionStorage.getItem("GUID"), UsernameForLic: sessionStorage.getItem("loggedInUser")
            }])
        };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/EstimateProducts/GetDataByPartCode", jObject, this.common_params.httpOptions);
    }

    // delete item Group data 

    deleteItemGroupData(Id): Observable<any> {
        //JSON Obeject Prepared to be send as a param to API
        let jObject = { GetData: JSON.stringify(Id) };

        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/EstimateProducts/DeleteByPartCode", jObject, this.common_params.httpOptions);
    }





}