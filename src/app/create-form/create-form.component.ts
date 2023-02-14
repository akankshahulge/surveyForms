import { Component, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { HeadComponent } from '../head/head.component';
import { ShortAnsComponent } from '../short-ans/short-ans.component';
import { NumberComponent } from '../number/number.component';
import { EmailComponent } from '../email/email.component';
import { DateComponent } from '../date/date.component';
import { SingleCorrectComponent } from '../single-correct/single-correct.component';
import { MultipleCorrectComponent } from '../multiple-correct/multiple-correct.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const formElementsMapping = {
  Title: 'app-head',
  'Short Answer': 'app-short-ans',
  Number: 'app-number',
  Email: 'app-email',
  Date: 'app-date',
  'Single Correct': 'app-single-correct',
  'Multiple Correct': 'app-multiple-correct',
};

@Component({
  selector: 'app-create-form',
  templateUrl: 'create-form.component.html',
  styleUrls: ['create-form.component.scss'],
})
export class CreateFormComponent {
  constructor(public httpclient: HttpClient) {}

  formElements = [
    'Title',
    'Short Answer',
    'Number',
    'Email',
    // 'Date',
    // 'Single Correct',
    // 'Multiple Correct',
  ];

  mainForm = ['Title', 'Short Answer', 'Number', 'Email'];

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      event.previousContainer.id === 'formElements' &&
      event.container.id === 'mainForm'
    ) {
      const formElement = event.previousContainer.data[event.previousIndex];
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex] = formElement;
    } else if (
      event.previousContainer.id === 'mainForm' &&
      event.container.id === 'formElements'
    ) {
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  @ViewChild(HeadComponent)
  headComponent!: HeadComponent;

  @ViewChild(ShortAnsComponent)
  shortAnsComponent!: ShortAnsComponent;

  @ViewChild(NumberComponent)
  numberComponent!: NumberComponent;

  @ViewChild(EmailComponent)
  emailComponent!: EmailComponent;

  @ViewChild(DateComponent)
  dateComponent!: DateComponent;

  @ViewChild(SingleCorrectComponent)
  singleCorrectComponent!: SingleCorrectComponent;

  @ViewChild(MultipleCorrectComponent)
  multipleCorrectComponent!: MultipleCorrectComponent;

  onFormSubmit() {
    const formData: any[] = [];
    for (let i = 0; i < this.mainForm.length; i++) {
      if (this.mainForm[i] in formElementsMapping) {
        const key = this.mainForm[i] as keyof typeof formElementsMapping;
        const component = this.getComponentForKey(key);
        for (let j = 0; j < component.length; j++) {
          formData.push({
            type: key,
            data: component[j].getValue(),
          });
        }
      }
    }
    let headers1 = new HttpHeaders({
      'content-Type': 'application/json',
    });

    console.log(formData);
    // Store formData in the database

    this.httpclient
      .post('http://localhost:7600/create_form', formData, {
        headers: headers1,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getComponentForKey(key: string) {
    switch (key) {
      case 'Title':
        return [this.headComponent];
      case 'Short Answer':
        return [this.shortAnsComponent];
      case 'Number':
        return [this.numberComponent];
      case 'Email':
        return [this.emailComponent];
      case 'Date':
        return [this.dateComponent];
      case 'Single Correct':
        return [this.singleCorrectComponent];
      case 'Multiple Correct':
        return [this.multipleCorrectComponent];
      default:
        return [];
    }
  }
}
