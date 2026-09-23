import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroSolicitudesComponent } from './filtro-solicitudes.component';

describe('FiltroSolicitudesComponent', () => {
  let component: FiltroSolicitudesComponent;
  let fixture: ComponentFixture<FiltroSolicitudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroSolicitudesComponent]
    });
    fixture = TestBed.createComponent(FiltroSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
