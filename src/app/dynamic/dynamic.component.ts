import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';

export interface Survey {
  question: string;
  answertype: string;
  options: string[];
}

export class RootObject {
  title: string = "";
  email: string = "";
  survey: Survey[] = [];
}

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponent implements OnInit {
  public data: any;
  public url: string = '';
  public surveyID: String = '';
  dynamicForm = this.fb.group({});

  constructor(
    public allservices: AllservicesService,
    private fb: FormBuilder,
    private route: Router
  ) {}
  ngOnInit() {
    //To get a SurveyID from URL
    this.url = this.route.routerState.snapshot.url;
    this.surveyID = this.url.split('/')[2];

    this.data = {
      response: [
        {
          type: 'Title',
          data: {
            formTitle: 'form title',
          },
        },
        {
          type: 'Short Answer',
          data: {
            question: 'first question',
            value: 'first answer',
          },
        },
        {
          type: 'Number',
          data: {
            question: 'number question',
            value: 123456,
          },
        },
        {
          type: 'Email',
          data: {
            question: 'email question',
            value: 'example@email.com',
          },
        },
      ],
    };

    // modify the data for backend

    // this.allservices.getSurveyStructure(this.surveyID).subscribe((response: RootObject) => {
    //   // console.log(response);
    //   this.data = response;
    //   // this.formField=response;
    //   // console.log(this.formField);
    //   // this.setDynamicForm();
    // });
  }

  setDynamicForm() {
    // for(const control of controls)
    // {
    //   this.dynamicForm.addControl(control.title,this.fb.control(control.survey))
    //   console.log(typeof controls)
    // }
    // console.log(JSON.parse(JSON.stringify(this.data.survey[0])).question)
  }
  // saveForm(): void {
  //   const responses = this.data.response.map((item: { type: any; data: { formTitle: any; question: any; }; }) => {
  //     const type = item.type;
  //     let response;
  //     switch (type) {
  //       case 'Title':
  //         response = item.data.formTitle;
  //         break;
  //       case 'Short Answer':
  //       case 'Number':
  //       case 'Email':
  //         response = (
  //           document.querySelector(
  //             `[name="${type}-${item.data.question}"]`
  //           ) as HTMLInputElement
  //         )?.value;
  //         break;
  //       default:
  //         response = '';
  //         break;
  //     }
  //     return { type, response };
  //   });
  //   console.log(responses);
  // }

  saveForm(): void {
    const title = this.data.response.find((item: any) => item.type === 'Title')
      .data.formTitle;
    const description = this.data.response.find(
      (item: any) => item.type === 'Description'
    )?.data;

    const formData: any = {
      title,
      description,
      questions: [],
    };

    this.data.response.forEach((item: any, i: number) => {
      if (item.type !== 'Title' && item.type !== 'Description') {
        const question: any = {
          questionContent: item.data.question,
          questionType: item.type,
          questionNumber: i,
        };
        formData.questions.push(question);
      }
    });

    console.log(formData);
  }
}