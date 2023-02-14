import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent {

  @Output() valueEvent = new EventEmitter<void>();

  getValue() {
    const formTitle = (
      document.querySelector(
        '.example-form .example-full-width input'
      ) as HTMLInputElement
    ).value;
    this.valueEvent.emit();
    console.log(`Form Title: ${formTitle}`);
    return { formTitle };
  }
}
