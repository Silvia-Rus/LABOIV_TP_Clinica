/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SacarTurnoComponent } from './sacar-turno.component';

describe('SacarTurnoComponent', () => {
  let component: SacarTurnoComponent;
  let fixture: ComponentFixture<SacarTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacarTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
