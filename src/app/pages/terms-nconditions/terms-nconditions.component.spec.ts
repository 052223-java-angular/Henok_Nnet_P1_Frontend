import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsNconditionsComponent } from './terms-nconditions.component';

describe('TermsNconditionsComponent', () => {
  let component: TermsNconditionsComponent;
  let fixture: ComponentFixture<TermsNconditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsNconditionsComponent]
    });
    fixture = TestBed.createComponent(TermsNconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
