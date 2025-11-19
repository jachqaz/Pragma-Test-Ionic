export abstract class RemoteConfigRepository {
  abstract initializeRemoteConfig(): Promise<void>;

  abstract getFeatureFlag(key: string): Promise<boolean>;

  abstract getFeatureFlagSync(key: string): boolean;
}
