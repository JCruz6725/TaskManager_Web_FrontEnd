import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotes } from './view-notes';

describe('ViewNotes', () => {
  let component: ViewNotes;
  let fixture: ComponentFixture<ViewNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
