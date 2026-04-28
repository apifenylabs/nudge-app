/**
 * publish-linkedin.js
 * Publish content items to LinkedIn via REST API.
 * Uses POST /rest/posts with author URN.
 * Falls back to mock when credentials are placeholders or missing.
 */

const lib = require('./lib');

// LinkedIn REST API base URL
const LINKEDIN_API_BASE = 'https://api.linkedin.com';

/**
 * Check if credentials are real (non-placeholder)
 */
function hasValidCreds(creds) {
  if (!creds) return false;
  const keys = ['clientId', 'clientSecret', 'accessToken', 'personUrn'];
  for (const k of keys) {
    if (!creds[k] || creds[k] === 'PLACEHOLDER' || creds[k] === '') return false;
  }
  return true;
}

/**
 * Make an authenticated request to LinkedIn REST API
 */
async function linkedinRequest(method, path, body, accessToken) {
  const url = `${LINKEDIN_API_BASE}${path}`;

  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': '202402',
    },
  };

  if (body && method === 'POST') {
    opts.body = JSON.stringify(body);
  }

  try {
    const fetch = globalThis.fetch || (await import('node-fetch'));
    const response = await fetch(url, opts);
    const text = await response.text();

    // LinkedIn API returns 201 with no body on success for post creation
    if (response.status === 201) {
      return { success: true, location: response.headers.get('location') || '' };
    }

    // Parse error responses
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text.substring(0, 500) };
    }

    if (!response.ok) {
      console.error(`[publish-linkedin] API error ${response.status}:`, JSON.stringify(data));
      return null;
    }

    return data;
  } catch (err) {
    console.error(`[publish-linkedin] Request failed:`, err.message);
    return null;
  }
}

/**
 * Create a LinkedIn text post
 * See: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
 */
async function createPost(text, personUrn, accessToken) {
  const urn = personUrn.startsWith('urn:li:person:') ? personUrn : `urn:li:person:${personUrn}`;

  const body = {
    author: urn,
    lifecycleState: 'PUBLISHED',
    visibility: 'PUBLIC',
    commentary: text,
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
  };

  return linkedinRequest('POST', '/rest/posts', body, accessToken);
}

/**
 * @param {object} item - ContentItem to publish
 * @param {object} credentials - LinkedIn API credentials (optional, uses mock if not provided)
 * @returns {object|null} PublishLogEntry
 */
async function publish(item, credentials = {}) {
  if (!item || !item.content) {
    throw new Error('[publish-linkedin] Invalid item: content required');
  }
  if (!item.platforms || !item.platforms.includes('linkedin')) {
    console.log('[publish-linkedin] Skipped: linkedin not in item.platforms');
    return null;
  }

  const realCreds = hasValidCreds(credentials);

  if (realCreds) {
    console.log(`[publish-linkedin] Publishing to LinkedIn REST API...`);
    console.log(`  Content: ${lib.truncate(item.content, 80)}`);

    try {
      const result = await createPost(
        item.content,
        credentials.personUrn,
        credentials.accessToken
      );

      if (!result) {
        console.error('[publish-linkedin] API returned no result. Falling back to mock...');
        const mockResult = await mockPublish(item);
        mockResult.status = 'failed';
        mockResult.error = 'API call returned null. Check credentials and authorization.';
        return mockResult;
      }

      // Extract activity URN from location header or use fallback
      let activityUrn = '';
      if (result.location) {
        // Location header: /rest/posts/urn:li:activity:12345
        const parts = result.location.split('/');
        activityUrn = parts[parts.length - 1];
      }

      const entry = {
        id: lib.uuid(),
        contentId: item.id,
        platform: 'linkedin',
        format: item.format,
        sourceId: item.sourceId,
        sourceProject: item.sourceProject,
        publishedAt: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        url: activityUrn
          ? `https://www.linkedin.com/feed/update/${activityUrn}`
          : `https://www.linkedin.com/feed/`,
        status: 'success',
      };

      console.log(`[publish-linkedin] ✅ Published: ${entry.url}`);
      return entry;
    } catch (err) {
      console.error(`[publish-linkedin] Error: ${err.message}`);
      // Fall back to mock on unexpected error
      const mockResult = await mockPublish(item);
      mockResult.status = 'failed';
      mockResult.error = err.message;
      return mockResult;
    }
  }

  // No valid credentials — use mock
  return mockPublish(item);
}

async function mockPublish(item) {
  console.log(`[publish-linkedin] MOCK: Publishing to LinkedIn...`);
  console.log(`  Content: ${lib.truncate(item.content, 80)}`);

  // Simulate API delay
  await new Promise(r => setTimeout(r, 100));

  const entry = {
    id: lib.uuid(),
    contentId: item.id,
    platform: 'linkedin',
    format: item.format,
    sourceId: item.sourceId,
    sourceProject: item.sourceProject,
    publishedAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    url: `https://www.linkedin.com/feed/update/urn:li:activity:${Math.random().toString(36).substring(2, 15)}`,
    status: 'success',
  };

  console.log(`[publish-linkedin] ✅ Published (mock): ${entry.url}`);
  return entry;
}

module.exports = { publish };
