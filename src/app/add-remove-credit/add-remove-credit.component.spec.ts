import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveCreditComponent } from './add-remove-credit.component';

describe('AddRemoveCreditComponent', () => {
  let component: AddRemoveCreditComponent;
  let fixture: ComponentFixture<AddRemoveCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
