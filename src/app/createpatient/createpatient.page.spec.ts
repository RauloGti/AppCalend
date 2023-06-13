import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatepatientPage } from './createpatient.page';

describe('CreatepatientPage', () => {
  let component: CreatepatientPage;
  let fixture: ComponentFixture<CreatepatientPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatepatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
