import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';


export interface Survey2 {
  question: string;
  answertype: string;
  options: string[];
}

export interface Survey {
  _id: string;
  userid: string;
  title: string;
  email: string;
  survey: Survey2[];
}

export class HistoryRootObject {
  message: string="";
  Survey: Survey[]=[];
}


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{
  public data:any;
  public url: String = '';
  public userID: String = '';

  constructor(
    public allservices:AllservicesService,
    private route: Router
  ){
  }

  ngOnInit() {
    //To get a UserID from URL
    this.url = (this.route.routerState.snapshot.url)
    this.userID = this.url.split('/')[2]

    this.allservices.getAllSurveyofUser(this.userID).subscribe((response: HistoryRootObject) => {
      // console.log(response);
      this.data = response;
      console.log(this.data.Survey)
    });


  }


  //Delete Survey By Survey ID
  deleteSurvey(survey_id:any){
    this.allservices.deleteSurveyBySurveyID(survey_id).subscribe(response=>{
      console.log(response);
      location.reload();
    })
    alert(survey_id+" Deleted ...")  
  }

  //Publish Survey Link
  publishlink(survey_id:any){
    alert('http://localhost:4200/dynamic/'+survey_id)
    window.open('http://localhost:4200/dynamic/'+survey_id,'_blank')
  }

  //Get All Responses
  getAllResponsesBy(survey_id:any){
    alert("All Responses of Survey ID "+survey_id)
    window.open(`http://localhost:4200/survey_responses/${survey_id}`)
  }

}
