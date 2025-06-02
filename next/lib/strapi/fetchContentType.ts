import { draftMode } from "next/headers";
import qs from "qs";
/**
 * Fetches data for a specified Strapi content type.
 *
 * @param {string} contentType - The type of content to fetch from Strapi.
 * @param {string} params - Query parameters to append to the API request.
 * @return {Promise<object>} The fetched data.
 */

interface StrapiData {
  id: number;
  [key: string]: any; // Allow for any additional fields
}

interface StrapiResponse {
  data: StrapiData | StrapiData[];
}

export function spreadStrapiData(data: StrapiResponse): StrapiData | null {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null
}

const FETCH_TIMEOUT = 15000; // 15 seconds
const MAX_RETRIES = 2;

async function fetchWithTimeout(url: string, options: RequestInit, timeout: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export default async function fetchContentType(
  contentType: string,
  params: Record<string, unknown> = {},
  spreadData?: boolean,
): Promise<any> {
  const { isEnabled } = await draftMode();

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const queryParams = { ...params };

      if (isEnabled) {
        queryParams.status = "draft";
      }

      // Construct the full URL for the API request
      const url = new URL(`api/${contentType}`, process.env.NEXT_PUBLIC_API_URL);
      const fullUrl = `${url.href}?${qs.stringify(queryParams)}`;

      // Perform the fetch request with timeout
      const response = await fetchWithTimeout(fullUrl, {
        method: 'GET',
        cache: isEnabled ? 'no-store' : 'force-cache',
        next: { revalidate: isEnabled ? 0 : 300 }, // 5 minutes cache for published content
      }, FETCH_TIMEOUT);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const jsonData: StrapiResponse = await response.json();
      return spreadData ? spreadStrapiData(jsonData) : jsonData;
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt < MAX_RETRIES) {
        console.warn(`Attempt ${attempt + 1} failed for ${contentType}, retrying...`, lastError.message);
        // Exponential backoff: wait 1s, then 2s
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
    }
  }

  // If all retries failed, log error and return null
  console.error(`FetchContentTypeError for ${contentType} after ${MAX_RETRIES + 1} attempts:`, lastError);
  return null;
}
