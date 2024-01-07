import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenIframeComponent } from './full-screen-iframe.component';

describe('FullScreenIframeComponent', () => {
  let component: FullScreenIframeComponent;
  let fixture: ComponentFixture<FullScreenIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullScreenIframeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullScreenIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
