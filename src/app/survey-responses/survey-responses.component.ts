import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';


export interface Survey {
  question: string;
  answer: string;
}

export interface Respons {
  _id: string;
  survey_id: string;
  title: string;
  email: string;
  survey: Survey[];
}

export class ResponsesRootObject {
  message: string='';
  Responses: Respons[]=[];
}

@Component({
  selector: 'app-survey-responses',
  templateUrl: './survey-responses.component.html',
  styleUrls: ['./survey-responses.component.scss']
})
export class SurveyResponsesComponent implements OnInit {
  public data: any;
  public url: String = '';
  public surveyID: String = '';

  constructor(
    public allservices: AllservicesService,
    private route: Router
  ) {
  }
  ngOnInit(): void {

    //To get a SurveyID from URL
    this.url = (this.route.routerState.snapshot.url)
    this.surveyID = this.url.split('/')[2]

    this.allservices.getAllResponsesBySurveyID(this.surveyID).subscribe((response: ResponsesRootObject) => {
      console.log(response);
      this.data = response;
      console.log(this.data.message)
    });

  }

}
