import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgGeneratorComponent } from './img-generator.component';

describe('ImgGeneratorComponent', () => {
  let component: ImgGeneratorComponent;
  let fixture: ComponentFixture<ImgGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
