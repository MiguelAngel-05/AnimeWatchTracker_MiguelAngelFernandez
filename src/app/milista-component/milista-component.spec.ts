import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilistaComponent } from './milista-component';

describe('MilistaComponent', () => {
  let component: MilistaComponent;
  let fixture: ComponentFixture<MilistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
