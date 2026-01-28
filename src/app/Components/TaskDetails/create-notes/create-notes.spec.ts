import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotes } from './create-notes';

describe('CreateNotes', () => {
  let component: CreateNotes;
  let fixture: ComponentFixture<CreateNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
