import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaCollectionComponent } from './nasa-collection.component';

describe('NasaCollectionComponent', () => {
  let component: NasaCollectionComponent;
  let fixture: ComponentFixture<NasaCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasaCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasaCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
