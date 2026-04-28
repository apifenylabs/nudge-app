/**
 * publish-twitter.js
 * Publish content items to Twitter/X via API v2.
 * Uses OAuth 1.0a user context (v2 endpoints with OAuth 1.0a).
 * Falls back to mock when credentials are placeholders or missing.
 */

const lib = require('./lib');

// Twitter API v2 base URL
const TWITTER_API_BASE = 'https://api.twitter.com/2';

// Rate limit: 300 tweets per 3 hours (17 per minute)
// We'll do simple tracking with a 3-hour sliding window
let tweetTimestamps = [];

/**
 * Check rate limit — allow max 300 tweets in rolling 3-hour window
 */
function rateLimitOk() {
  const now = Date.now();
  const windowMs = 3 * 60 * 60 * 1000;
  // Prune old entries
  tweetTimestamps = tweetTimestamps.filter(t => now - t < windowMs);
  return tweetTimestamps.length < 300;
}

/**
 * Record a successful tweet timestamp
 */
function recordTweet() {
  const now = Date.now();
  tweetTimestamps.push(now);
  // Keep array manageable
  if (tweetTimestamps.length > 350) {
    tweetTimestamps = tweetTimestamps.slice(-300);
  }
}

/**
 * Check if credentials are real (non-placeholder)
 */
function hasValidCreds(creds) {
  if (!creds) return false;
  const keys = ['apiKey', 'apiKeySecret', 'accessToken', 'accessTokenSecret'];
  for (const k of keys) {
    if (!creds[k] || creds[k] === 'PLACEHOLDER' || creds[k] === '') return false;
  }
  return true;
}

/**
 * Build OAuth 1.0a header for Twitter API v2 request.
 * Uses HMAC-SHA1 signing per Twitter's OAuth 1.0a spec.
 */
function buildOAuthHeader(method, url, params, creds) {
  const oauthParams = {
    oauth_consumer_key: creds.apiKey,
    oauth_token: creds.accessToken,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_nonce: lib.uuid().replace(/-/g, '').substring(0, 32),
    oauth_version: '1.0',
  };

  // Merge all parameters for signature base string
  const allParams = { ...params, ...oauthParams };
  const paramString = Object.keys(allParams)
    .sort()
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(allParams[k])}`)
    .join('&');

  const signatureBase = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(paramString),
  ].join('&');

  const signingKey = `${encodeURIComponent(creds.apiKeySecret)}&${encodeURIComponent(creds.accessTokenSecret)}`;
  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(signatureBase)
    .digest('base64');

  oauthParams.oauth_signature = signature;

  const authHeader = 'OAuth ' + Object.keys(oauthParams)
    .sort()
    .map(k => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`)
    .join(', ');

  return authHeader;
}

/**
 * Make an authenticated request to Twitter API v2
 */
async function twitterRequest(method, path, body, creds) {
  const url = `${TWITTER_API_BASE}${path}`;

  // For POST with JSON body, only OAuth params go to signature base
  const params = {};
  const authHeader = buildOAuthHeader(method, url, params, creds);

  const opts = {
    method,
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
  };

  if (body && method === 'POST') {
    opts.body = JSON.stringify(body);
  }

  try {
    const fetch = globalThis.fetch || (await import('node-fetch'));
    const response = await fetch(url, opts);
    const data = await response.json();

    if (!response.ok) {
      console.error(`[publish-twitter] API error ${response.status}:`, JSON.stringify(data));
      return null;
    }

    return data;
  } catch (err) {
    console.error(`[publish-twitter] Request failed:`, err.message);
    return null;
  }
}

/**
 * Post a single tweet
 */
async function postTweet(text, creds) {
  if (!rateLimitOk()) {
    console.error('[publish-twitter] Rate limit exceeded (300/3h). Skipping.');
    return null;
  }

  const result = await twitterRequest('POST', '/tweets', { text }, creds);
  if (result && result.data && result.data.id) {
    recordTweet();
    return result.data;
  }
  return null;
}

/**
 * Post a reply tweet (thread continuation)
 */
async function postReply(text, replyToTweetId, creds) {
  if (!rateLimitOk()) {
    console.error('[publish-twitter] Rate limit exceeded (300/3h). Skipping.');
    return null;
  }

  const result = await twitterRequest('POST', '/tweets', {
    text,
    reply: { in_reply_to_tweet_id: replyToTweetId },
  }, creds);
  if (result && result.data && result.data.id) {
    recordTweet();
    return result.data;
  }
  return null;
}

/**
 * Post a thread (multiple connected tweets)
 * @param {string[]} tweets - Array of tweet texts
 * @param {object} creds - Twitter credentials
 * @returns {Array} - Array of { id, text } for each posted tweet
 */
async function postThread(tweets, creds) {
  const posted = [];
  let parentId = null;

  for (let i = 0; i < tweets.length; i++) {
    const text = tweets[i];
    let result;
    if (i === 0) {
      result = await postTweet(text, creds);
    } else {
      result = await postReply(text, parentId, creds);
    }
    if (result && result.id) {
      posted.push({ id: result.id, text: tweets[i] });
      parentId = result.id;
    } else {
      // Failed — stop thread
      console.error(`[publish-twitter] Thread tweet ${i + 1}/${tweets.length} failed.`);
      break;
    }
    // Small delay between thread tweets
    await new Promise(r => setTimeout(r, 500));
  }

  return posted;
}

/**
 * @param {object} item - ContentItem to publish
 * @param {object} credentials - Twitter API credentials (optional, uses mock if not provided)
 * @returns {object|null} PublishLogEntry
 */
async function publish(item, credentials = {}) {
  if (!item || !item.content) {
    throw new Error('[publish-twitter] Invalid item: content required');
  }
  if (!item.platforms || !item.platforms.includes('twitter')) {
    console.log('[publish-twitter] Skipped: twitter not in item.platforms');
    return null;
  }

  const realCreds = hasValidCreds(credentials);

  if (realCreds) {
    console.log(`[publish-twitter] Publishing to Twitter/X API v2...`);
    console.log(`  Content: ${lib.truncate(item.content, 80)}`);

    try {
      let result;

      if (item.thread && item.thread.length > 0) {
        // Post as thread
        console.log(`  Posting thread of ${item.thread.length} tweets...`);
        const posted = await postThread(item.thread, credentials);
        result = posted.length > 0 ? posted[0] : null;
        if (result) {
          console.log(`  Thread: ${posted.length}/${item.thread.length} tweets posted`);
        }
      } else {
        // Single tweet
        result = await postTweet(item.content, credentials);
      }

      if (!result) {
        console.error('[publish-twitter] API returned no result. Falling back to mock...');
        const mockResult = await mockPublish(item);
        mockResult.status = 'failed';
        mockResult.error = 'API call returned null. Check credentials and rate limits.';
        return mockResult;
      }

      // Build the full thread URL if applicable
      const tweetId = result.id;
      const url = `https://twitter.com/user/status/${tweetId}`;

      const entry = {
        id: lib.uuid(),
        contentId: item.id,
        platform: 'twitter',
        format: item.format,
        sourceId: item.sourceId,
        sourceProject: item.sourceProject,
        publishedAt: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        url,
        status: 'success',
      };

      console.log(`[publish-twitter] ✅ Published: ${entry.url}`);
      return entry;
    } catch (err) {
      console.error(`[publish-twitter] Error: ${err.message}`);
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
  console.log(`[publish-twitter] MOCK: Publishing to Twitter...`);
  console.log(`  Content: ${lib.truncate(item.content, 80)}`);

  if (item.thread && item.thread.length > 0) {
    console.log(`  Thread: ${item.thread.length} tweets`);
    item.thread.forEach((t, i) => {
      console.log(`    Tweet ${i + 1}/${item.thread.length}: ${lib.truncate(t, 60)}`);
    });
  }

  // Simulate API delay
  await new Promise(r => setTimeout(r, 100));

  const entry = {
    id: lib.uuid(),
    contentId: item.id,
    platform: 'twitter',
    format: item.format,
    sourceId: item.sourceId,
    sourceProject: item.sourceProject,
    publishedAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    url: `https://twitter.com/user/status/${Math.random().toString(36).substring(2, 10)}`,
    status: 'success',
  };

  console.log(`[publish-twitter] ✅ Published (mock): ${entry.url}`);
  return entry;
}

module.exports = { publish };
