import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureUserImageComponent } from './capture-user-image.component';

describe('CaptureUserImageComponent', () => {
  let component: CaptureUserImageComponent;
  let fixture: ComponentFixture<CaptureUserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureUserImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
