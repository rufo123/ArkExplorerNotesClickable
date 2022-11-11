import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerNotesComponent } from './explorer-notes.component';

describe('ExplorerNotesComponent', () => {
  let component: ExplorerNotesComponent;
  let fixture: ComponentFixture<ExplorerNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
