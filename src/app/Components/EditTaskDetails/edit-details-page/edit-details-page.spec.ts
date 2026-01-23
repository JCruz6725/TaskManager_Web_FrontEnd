import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailsPage } from './edit-details-page';

describe('EditDetailsPage', () => {
  let component: EditDetailsPage;
  let fixture: ComponentFixture<EditDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
