import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesDetailComponent } from './pages-detail.component';

describe('PagesDetailComponent', () => {
  let component: PagesDetailComponent;
  let fixture: ComponentFixture<PagesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesDetailComponent]
    });
    fixture = TestBed.createComponent(PagesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
