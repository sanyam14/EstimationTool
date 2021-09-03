import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonData } from "./../data/CommonData";


@Injectable({
    providedIn: 'root'
})
export class CatalogueService {
    public config_params: any;
    public logged_in_company: any;
    common_params = new CommonData();
    constructor(private httpclient: HttpClient) {
        this.config_params = JSON.parse(sessionStorage.getItem('system_config'));
    }

    // function for Add Update Assembely Relationship

    addUpdateCatalogue(saveData: any): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        saveData.OPTM_EST_CATALOGUEMST[0]['GUID'] = sessionStorage.getItem("GUID");
        saveData.OPTM_EST_CATALOGUEMST[0]['UsernameForLic'] = sessionStorage.getItem("loggedInUser");
        saveData.OPTM_EST_CATALOGUEMST[0]['CompanyDBID'] = sessionStorage.selectedComp;

        var jObject = { GetData: JSON.stringify(saveData) };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/CatalogueMaster/AddUpdateCatalogueMaster", jObject, this.common_params.httpOptions);
    }

    // function for fetch Assembely Relation data 

    fetchCatalogueData(): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        let jObject = {
            GetData: JSON.stringify([{
                CompanyDBID: this.logged_in_company,
                GUID: sessionStorage.getItem("GUID"), UsernameForLic: sessionStorage.getItem("loggedInUser")
            }])
        };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/CatalogueMaster/GetDataForCatalogueMaster ", jObject, this.common_params.httpOptions);
    }

    // function for fetch Assembely Relation data 

    fetchCatalogueEditData(id: any): Observable<any> {
        this.logged_in_company = sessionStorage.selectedComp;
        let jObject = {
            GetData: JSON.stringify([{
                CompanyDBID: this.logged_in_company,
                OPTM_SEQ_ID:id,
                GUID: sessionStorage.getItem("GUID"), UsernameForLic: sessionStorage.getItem("loggedInUser")
            }])
        };
        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/CatalogueMaster/GetDataBySeqID", jObject, this.common_params.httpOptions);
    }

    // delete assembely data 

    deleteCatalogueData(Id): Observable<any> {
        //JSON Obeject Prepared to be send as a param to API
        let jObject = { GetData: JSON.stringify(Id) };

        //Return the response form the API  
        return this.httpclient.post(this.config_params.service_url + "/CatalogueMaster/DeleteDataBySeqID", jObject, this.common_params.httpOptions);
    }





}