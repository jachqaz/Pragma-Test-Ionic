import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';

import {RouterModule} from '@angular/router';
import {Platform} from '@ionic/angular';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let platformSpy: jasmine.SpyObj<Platform>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Platform', ['ready', 'is', 'width'], {
      resize: {subscribe: jasmine.createSpy()}
    });
    spy.ready.and.returnValue(Promise.resolve());
    spy.is.and.returnValue(false);
    spy.width.and.returnValue(1024);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterModule.forRoot([])],
      providers: [
        {provide: Platform, useValue: spy}
      ]
    }).compileComponents();

    platformSpy = TestBed.inject(Platform) as jasmine.SpyObj<Platform>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  xit('should have menu labels', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].textContent).toContain('Inbox');
    expect(menuItems[1].textContent).toContain('Outbox');
  });

  it('should have urls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].getAttribute('href')).toEqual('/folder/inbox');
    expect(menuItems[1].getAttribute('href')).toEqual('/folder/outbox');
  });

  it('should initialize platform on ngOnInit', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    await app.ngOnInit();

    expect(platformSpy.ready).toHaveBeenCalled();
    expect(platformSpy.width).toHaveBeenCalled();
  });

  it('should detect desktop view for wide screens', () => {
    platformSpy.width.and.returnValue(1200);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    expect(app.currentView()).toBe('desktop');
    expect(app.screenWidth()).toBe(1200);
  });

  it('should detect mobile view for narrow screens', () => {
    platformSpy.width.and.returnValue(500);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    expect(app.currentView()).toBe('mobile');
    expect(app.screenWidth()).toBe(500);
  });

  it('should detect tablet view for medium screens', () => {
    platformSpy.width.and.returnValue(800);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    expect(app.currentView()).toBe('tablet');
    expect(app.screenWidth()).toBe(800);
  });

  it('should log when running on Cordova platform', async () => {
    platformSpy.is.and.returnValue(true);
    spyOn(console, 'log');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    await app.ngOnInit();

    expect(platformSpy.is).toHaveBeenCalledWith('cordova');
    expect(console.log).toHaveBeenCalledWith('Running on Cordova platform');
  });

});
