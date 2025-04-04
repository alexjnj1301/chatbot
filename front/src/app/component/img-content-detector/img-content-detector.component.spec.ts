import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgContentDetectorComponent } from './img-content-detector.component';

describe('ImgContentDetectorComponent', () => {
  let component: ImgContentDetectorComponent;
  let fixture: ComponentFixture<ImgContentDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgContentDetectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgContentDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
