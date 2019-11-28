import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersMenusComponent } from './providers-menus.component';

describe('ProvidersMenusComponent', () => {
  let component: ProvidersMenusComponent;
  let fixture: ComponentFixture<ProvidersMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
