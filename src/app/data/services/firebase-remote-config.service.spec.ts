import {TestBed} from '@angular/core/testing';
import {FirebaseRemoteConfigService} from './firebase-remote-config.service';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseRemoteConfigService]
    });
    service = TestBed.inject(FirebaseRemoteConfigService);
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
});
