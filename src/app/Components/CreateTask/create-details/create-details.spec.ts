import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDetails } from './create-details';

describe('CreateDetails', () => {
  let component: CreateDetails;
  let fixture: ComponentFixture<CreateDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
