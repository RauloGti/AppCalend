import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnotatorPage } from './annotator.page';

describe('AnnotatorPage', () => {
  let component: AnnotatorPage;
  let fixture: ComponentFixture<AnnotatorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnnotatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
