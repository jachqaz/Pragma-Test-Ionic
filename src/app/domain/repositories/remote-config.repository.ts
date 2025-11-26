export abstract class RemoteConfigRepository {
  abstract getFeatureFlagSync(key: string): boolean;
}
