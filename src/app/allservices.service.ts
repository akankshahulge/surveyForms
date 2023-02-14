import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { HistoryRootObject } from './history/history.component';
import { ResponsesRootObject } from './survey-responses/survey-responses.component';
@Injectable({
  providedIn: 'root',
})
export class AllservicesService {
  //Constructor...
  constructor(private httpClient: HttpClient) {}

  //Register User
  registerUser(userObj: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.httpClient.post(
      'http://localhost:7777/users/register',
      userObj,
      { headers: httpHeaders }
    );
  }

  //Get All Users
  async getAllUsers() {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return await this.httpClient.get('http://localhost:7777/users/getall');
  }

  //Get a User ID By its Email...
  getUserIDByEmail(emai: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.httpClient.post('http://localhost:7777/users/get', emai, {
      headers: httpHeaders,
    });
  }

  //Login request...
  login(userObj: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.httpClient.post('http://localhost:7777/users/login', userObj, {
      headers: httpHeaders,
    });
  }

  //Add Servey Structure to Database
  createSurvey(surveyObj: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.httpClient.post(
      'http://localhost:7777/survey/addsurvey',
      surveyObj,
      { headers: httpHeaders }
    );
  }

  //All Survey Created By User
  getAllSurveyofUser(user_id: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.httpClient.get<HistoryRootObject>(
      `http://localhost:7777/survey/get/${user_id}`,
      { headers: httpHeaders }
    );
  }

  //Fetch induvisual Survey From Database for recording Response..
  getSurveyStructure(survey_id: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
    });
    //here
    return 0;
  }

  //Fetch Survey ID
  getSurveyID(survey: any) {
    let httpHeaders = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.httpClient.post(`http://localhost:7777/survey/get`, survey, {
      headers: httpHeaders,
    });
  }

  //Delete Survey By Survey ID
  deleteSurveyBySurveyID(survey_id: any) {
    return this.httpClient.delete(
      `http://localhost:7777/survey/delete/${survey_id}`
    );
  }

  //Responses Services

  //Get all responses by SurveyID

  getAllResponsesBySurveyID(survey_id: any) {
    return this.httpClient.get<ResponsesRootObject>(
      `http://localhost:7777/responses/get/${survey_id}`
    );
  }
}
