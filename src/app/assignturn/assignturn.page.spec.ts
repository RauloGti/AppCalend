import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignturnPage } from './assignturn.page';

describe('AssignturnPage', () => {
  let component: AssignturnPage;
  let fixture: ComponentFixture<AssignturnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssignturnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
