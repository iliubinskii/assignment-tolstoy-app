import type { ErrorResponse, FetchMetadataResponse } from "../schema";
import { API_URL } from "../config";
import { ERROR } from "../consts";
import { logger } from "../services";
import zod from "zod";

/**
 * Fetches metadata from the API.
 * @param urls - The URLs to fetch metadata for.
 * @returns The metadata for the URLs.
 */
export async function fetchMetadata(
  urls: readonly string[]
): Promise<readonly FetchMetadataResponse[] | ErrorResponse | undefined> {
  try {
    const response = await fetch(`${API_URL}/fetch-metadata`, {
      body: JSON.stringify(urls),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    const json: unknown = await response.json();

    return FetchMetadataResponseValidationSchema.parse(json);
  } catch (err) {
    logger.error(ERROR.MetadataFetchingError, err);

    return undefined;
  }
}

const FetchMetadataResponseValidationSchema = zod
  .array(
    zod
      .object({
        description: zod.string().optional(),
        imageUrl: zod.string().optional(),
        title: zod.string().optional(),
        url: zod.string()
      })
      .or(
        zod.object({
          errorCode: zod.string(),
          errorMessage: zod.string(),
          url: zod.string()
        })
      )
  )
  .or(
    zod.object({
      details: zod
        .object({
          fieldErrors: zod.record(zod.array(zod.string())),
          formErrors: zod.array(zod.string())
        })
        .optional(),
      errorCode: zod.string(),
      errorMessage: zod.string()
    })
  );
