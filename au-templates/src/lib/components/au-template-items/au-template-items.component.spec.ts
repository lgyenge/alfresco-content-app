import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuTemplateItemsComponent } from './au-template-items.component';

describe('AuTemplateItemsComponent', () => {
  let component: AuTemplateItemsComponent;
  let fixture: ComponentFixture<AuTemplateItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuTemplateItemsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuTemplateItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
