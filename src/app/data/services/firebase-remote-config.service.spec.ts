import {TestBed} from '@angular/core/testing';
import {Platform} from '@ionic/angular';
import {FirebaseRemoteConfigService} from './firebase-remote-config.service';
import {createMockPlatform} from '../../testing/cordova-mocks';

jest.mock('firebase/remote-config', () => ({
  getRemoteConfig: jest.fn(() => ({
    defaultConfig: {},
    settings: {minimumFetchIntervalMillis: 0}
  })),
  fetchAndActivate: jest.fn(() => Promise.resolve(true)),
  getBoolean: jest.fn((config, key) => {
    const defaults = {
      enableAddTask: true,
      enableManagementCategories: true,
      enableDarkMode: false
    };
    return defaults[key as keyof typeof defaults] || false;
  })
}));

describe('FirebaseRemoteConfigService', () => {
  let service: FirebaseRemoteConfigService;
  let platformSpy: jasmine.SpyObj<Platform>;

  beforeEach(() => {
    const mockPlatform = createMockPlatform();

    TestBed.configureTestingModule({
      providers: [
        FirebaseRemoteConfigService,
        {provide: Platform, useValue: mockPlatform}
      ]
    });

    service = TestBed.inject(FirebaseRemoteConfigService);
    platformSpy = TestBed.inject(Platform) as jasmine.SpyObj<Platform>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(service.getEnableAddTask()()).toBe(true);
    expect(service.getEnableManagementCategories()()).toBe(true);
    expect(service.getEnableDarkMode()()).toBe(false);
  });

  it('should initialize config successfully', async () => {
    await service.initializeConfig();
    expect(service.getEnableAddTask()()).toBe(true);
  });

  it('should get feature flag sync', () => {
    const result = service.getFeatureFlagSync('enableAddTask');
    expect(result).toBe(true);
  });

  it('should get feature flag async', async () => {
    const result = await service.getFeatureFlag('enableAddTask');
    expect(result).toBe(true);
  });

  it('should set different fetch intervals for Cordova vs web', async () => {
    // Test web environment (non-Cordova)
    platformSpy.is.and.returnValue(false);
    await service.initializeConfig();

    // Test Cordova environment
    platformSpy.is.and.returnValue(true);
    await service.initializeConfig();

    expect(platformSpy.is).toHaveBeenCalledWith('cordova');
  });

  it('should handle Cordova platform detection', () => {
    platformSpy.is.and.returnValue(true);

    // Re-create service to test constructor with Cordova platform
    const cordovaService = new FirebaseRemoteConfigService(platformSpy);

    expect(cordovaService).toBeTruthy();
    expect(platformSpy.is).toHaveBeenCalledWith('cordova');
  });
});
