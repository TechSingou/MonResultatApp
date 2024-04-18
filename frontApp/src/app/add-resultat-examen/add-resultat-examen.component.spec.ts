import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultatExamenComponent } from './add-resultat-examen.component';

describe('AddResultatExamenComponent', () => {
  let component: AddResultatExamenComponent;
  let fixture: ComponentFixture<AddResultatExamenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddResultatExamenComponent]
    });
    fixture = TestBed.createComponent(AddResultatExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
