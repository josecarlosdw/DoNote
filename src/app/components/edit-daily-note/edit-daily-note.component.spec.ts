import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDailyNoteComponent } from './edit-daily-note.component';

describe('EditDailyNoteComponent', () => {
  let component: EditDailyNoteComponent;
  let fixture: ComponentFixture<EditDailyNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDailyNoteComponent]
    });
    fixture = TestBed.createComponent(EditDailyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
