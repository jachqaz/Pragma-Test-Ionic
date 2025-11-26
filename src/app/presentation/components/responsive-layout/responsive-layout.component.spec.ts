import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ResponsiveLayoutComponent} from './responsive-layout.component';
import {Platform} from '@ionic/angular';
import {createMockPlatform} from '../../../testing/cordova-mocks';

describe('ResponsiveLayoutComponent', () => {
  let component: ResponsiveLayoutComponent;
  let fixture: ComponentFixture<ResponsiveLayoutComponent>;
  let platformSpy: jasmine.SpyObj<Platform>;

  beforeEach(async () => {
    const spy = createMockPlatform();

    await TestBed.configureTestingModule({
      imports: [ResponsiveLayoutComponent],
      providers: [
        {provide: Platform, useValue: spy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiveLayoutComponent);
    component = fixture.componentInstance;
    platformSpy = TestBed.inject(Platform) as jasmine.SpyObj<Platform>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return mobile layout for small screens', () => {
    platformSpy.width.and.returnValue(500);
    component['updateScreenWidth']();
    expect(component.layoutClass()).toBe('mobile-layout');
  });

  it('should return tablet layout for medium screens', () => {
    platformSpy.width.and.returnValue(800);
    component['updateScreenWidth']();
    expect(component.layoutClass()).toBe('tablet-layout');
  });

  it('should return desktop layout for large screens', () => {
    platformSpy.width.and.returnValue(1200);
    component['updateScreenWidth']();
    expect(component.layoutClass()).toBe('desktop-layout');
  });
});
