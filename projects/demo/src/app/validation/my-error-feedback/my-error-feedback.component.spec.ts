import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyErrorFeedbackComponent } from './my-error-feedback.component';

describe('MyErrorFeedbackComponent', () => {
  let component: MyErrorFeedbackComponent;
  let fixture: ComponentFixture<MyErrorFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyErrorFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyErrorFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
