import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiesmentComponent } from './advertiesment.component';

describe('AdvertiesmentComponent', () => {
  let component: AdvertiesmentComponent;
  let fixture: ComponentFixture<AdvertiesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiesmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertiesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
