import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface CheckboxItem {
  checked: boolean;
  text: string;
}

@Component({
  selector: 'app-multiple-correct',
  templateUrl: './multiple-correct.component.html',
  styleUrls: ['./multiple-correct.component.css']
})
export class MultipleCorrectComponent {
  questionControl = new FormControl('');
  items: CheckboxItem[] = [{ checked: false, text: '' }];

  onCheckboxChange(index: number) {
    this.items[index].checked = !this.items[index].checked;
  }

  addCheckBox() {
    this.items.push({ checked: false, text: '' });
  }

  deleteCheckBox(index: number) {
    this.items.splice(index, 1);
  }
}
