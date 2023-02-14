import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MultipleCorrectComponent } from './multiple-correct.component';

describe('MultipleCorrectComponent', () => {
  let component: MultipleCorrectComponent;
  let fixture: ComponentFixture<MultipleCorrectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule
      ],
      declarations: [ MultipleCorrectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleCorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a checkbox', () => {
    const initialLength = component.items.length;
    component.addCheckBox();
    expect(component.items.length).toBe(initialLength + 1);
  });

  it('should delete a checkbox', () => {
    component.items = [{ checked: false, text: 'Checkbox 1' }, { checked: true, text: 'Checkbox 2' }];
    const initialLength = component.items.length;
    component.deleteCheckBox(0);
    expect(component.items.length).toBe(initialLength - 1);
    expect(component.items[0].text).toBe('Checkbox 2');
  });
});
