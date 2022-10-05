import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedGroupComponent } from './nested-group.component';

describe('NestedGroupComponent', () => {
  let component: NestedGroupComponent;
  let fixture: ComponentFixture<NestedGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestedGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
