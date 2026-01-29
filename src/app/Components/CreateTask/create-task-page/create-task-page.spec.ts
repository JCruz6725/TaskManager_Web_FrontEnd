import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskPage } from './create-task-page';

describe('CreateTaskPage', () => {
  let component: CreateTaskPage;
  let fixture: ComponentFixture<CreateTaskPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
