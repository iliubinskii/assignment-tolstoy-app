export interface ErrorResponse {
  readonly details?:
    | {
        readonly fieldErrors: Record<string, readonly string[]>;
        readonly formErrors: readonly string[];
      }
    | undefined;
  readonly errorCode: string;
  readonly errorMessage: string;
}

export interface FetchMetadataError {
  readonly errorCode: string;
  readonly errorMessage: string;
  readonly url: string;
}

export type FetchMetadataResponse = Metadata | FetchMetadataError;

export interface Metadata {
  readonly description?: string | undefined;
  readonly imageUrl?: string | undefined;
  readonly title?: string | undefined;
  readonly url: string;
}
