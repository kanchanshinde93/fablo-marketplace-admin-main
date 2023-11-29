import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchanhtDetailsComponent } from './merchanht-details.component';

describe('MerchanhtDetailsComponent', () => {
  let component: MerchanhtDetailsComponent;
  let fixture: ComponentFixture<MerchanhtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchanhtDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchanhtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
