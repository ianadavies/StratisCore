import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEditorComponent } from './contract-editor.component';

describe('ContractEditorComponent', () => {
  let component: ContractEditorComponent;
  let fixture: ComponentFixture<ContractEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
