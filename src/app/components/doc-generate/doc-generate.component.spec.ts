import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocGenerateComponent } from './doc-generate.component';

describe('DocGenerateComponent', () => {
  let component: DocGenerateComponent;
  let fixture: ComponentFixture<DocGenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocGenerateComponent]
    });
    fixture = TestBed.createComponent(DocGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
