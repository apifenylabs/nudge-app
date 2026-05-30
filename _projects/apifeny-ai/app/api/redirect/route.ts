// ══════════════════════════════════════════════════════════
// /api/redirect — affiliate & referral link server-side proxy
// ══════════════════════════════════════════════════════════
// Routes tool clicks through a server-side redirect that:
// 1. Checks NEXT_PUBLIC env vars for affiliate/referral IDs
// 2. Builds the correct affiliate URL if IDs are available
// 3. Falls back to the default tool URL otherwise
// 4. Logs the click (future: analytics integration)
// ══════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { allAffiliateLinks } from '@/lib/affiliate-links';

type RedirectConfig = {
 /** The base/default URL for the tool */
 baseUrl: string;
 /** How to construct the affiliate URL (if env var is set) */
 urlPattern: 'query-param' | 'subdomain' | 'path-segment' | 'append-slash' | 'direct-env';
 /** The query param name (for query-param pattern) */
 paramName?: string;
 /** The env var to check */
 envVar: string;
 /** If direct-env, the full URL is stored in the env var */
};

// Tools that have known affiliate/referral programs and how to build their URLs
const redirectConfigs: Record<string, RedirectConfig> = {
 'notion-ai': {
 baseUrl: 'https://affiliate.notion.so/6m1l49i1a0ct',
 urlPattern: 'direct-env',
 envVar: 'NEXT_PUBLIC_AFFILIATE_NOTION',
 },
 'jasper': {
 baseUrl: 'https://jasper.ai/free-trial?source=apifeny',
 urlPattern: 'query-param',
 paramName: 'fpr',
 envVar: 'NEXT_PUBLIC_AFFILIATE_JASPER',
 },
 'copy-ai': {
 baseUrl: 'https://www.copy.ai?via=apifeny',
 urlPattern: 'query-param',
 paramName: 'via',
 envVar: 'NEXT_PUBLIC_AFFILIATE_COPYAI',
 },
 'writesonic': {
 baseUrl: 'https://writesonic.com?via=apifeny',
 urlPattern: 'query-param',
 paramName: 'via',
 envVar: 'NEXT_PUBLIC_AFFILIATE_WRITESONIC',
 },
 'canva-ai': {
 baseUrl: 'https://www.canva.com/join/apifeny',
 urlPattern: 'query-param',
 paramName: 'ir',
 envVar: 'NEXT_PUBLIC_AFFILIATE_CANVA',
 },
 'canva-magic-studio': {
 baseUrl: 'https://www.canva.com/magic-studio/',
 urlPattern: 'query-param',
 paramName: 'ir',
 envVar: 'NEXT_PUBLIC_AFFILIATE_CANVA',
 },
 'synthesia': {
 baseUrl: 'https://www.synthesia.io/?via=apifeny',
 urlPattern: 'query-param',
 paramName: 'via',
 envVar: 'NEXT_PUBLIC_AFFILIATE_SYNTHESIA',
 },
 'heygen': {
 baseUrl: 'https://heygen.com/?sid=apifeny',
 urlPattern: 'query-param',
 paramName: 'sid',
 envVar: 'NEXT_PUBLIC_AFFILIATE_HEYGEN',
 },
 'runway': {
 baseUrl: 'https://runwayml.com/?via=apifeny',
 urlPattern: 'query-param',
 paramName: 'via',
 envVar: 'NEXT_PUBLIC_AFFILIATE_RUNWAY',
 },
 'descript': {
 baseUrl: 'https://www.descript.com/?lmref=apifeny',
 urlPattern: 'query-param',
 paramName: 'lmref',
 envVar: 'NEXT_PUBLIC_AFFILIATE_DESCRIPT',
 },
 'elevenlabs': {
 baseUrl: 'https://elevenlabs.io/?from=apifeny',
 urlPattern: 'query-param',
 paramName: 'from',
 envVar: 'NEXT_PUBLIC_AFFILIATE_ELEVENLABS',
 },
 'elevenlabs-studio': {
 baseUrl: 'https://elevenlabs.io/?from=apifeny',
 urlPattern: 'query-param',
 paramName: 'from',
 envVar: 'NEXT_PUBLIC_AFFILIATE_ELEVENLABS',
 },
 'murf-ai': {
 baseUrl: 'https://murf.ai/?via=apifeny',
 urlPattern: 'query-param',
 paramName: 'via',
 envVar: 'NEXT_PUBLIC_AFFILIATE_MURF',
 },
 'make': {
 baseUrl: 'https://www.make.com/en/register?pc=apifeny',
 urlPattern: 'query-param',
 paramName: 'pc',
 envVar: 'NEXT_PUBLIC_AFFILIATE_MAKE',
 },
 'surferseo': {
 baseUrl: 'https://surferseo.com/?ref=apifeny',
 urlPattern: 'query-param',
 paramName: 'ref',
 envVar: 'NEXT_PUBLIC_AFFILIATE_SURFERSEO',
 },
 'semrush': {
 baseUrl: 'https://www.semrush.com/sem/?ref=apifeny',
 urlPattern: 'query-param',
 paramName: 'ref',
 envVar: 'NEXT_PUBLIC_AFFILIATE_SEMRUSH',
 },
 'zapier-central': {
 baseUrl: 'https://zapier.com/?ref=apifeny',
 urlPattern: 'query-param',
 paramName: 'ref',
 envVar: 'NEXT_PUBLIC_AFFILIATE_ZAPIER',
 },
 'intercom-ai': {
 baseUrl: 'https://www.intercom.com/?ref=apifeny',
 urlPattern: 'query-param',
 paramName: 'ref',
 envVar: 'NEXT_PUBLIC_AFFILIATE_INTERCOM',
 },
 'intercom-fin': {
 baseUrl: 'https://www.intercom.com/fin?ref=apifeny',
 urlPattern: 'query-param',
 paramName: 'ref',
 envVar: 'NEXT_PUBLIC_AFFILIATE_INTERCOM',
 },
 // --- referral / friend-invite links (token/credit bonuses) ---
 'bolt-new': {
 baseUrl: 'https://bolt.new',
 urlPattern: 'query-param',
 paramName: 'from',
 envVar: 'NEXT_PUBLIC_REFERRAL_BOLT',
 },
 'windsurf': {
 baseUrl: 'https://windsurf.com',
 urlPattern: 'query-param',
 paramName: 'referral',
 envVar: 'NEXT_PUBLIC_REFERRAL_WINDSURF',
 },
 'replit-agent': {
 baseUrl: 'https://replit.com',
 urlPattern: 'query-param',
 paramName: 'ref',
 envVar: 'NEXT_PUBLIC_REFERRAL_REPLIT',
 },
};

export async function GET(request: NextRequest) {
 const { searchParams } = new URL(request.url);
 const toolSlug = searchParams.get('tool');

 if (!toolSlug) {
 return NextResponse.redirect('https://apifeny-ai.vercel.app/tools');
 }

 // Look up the tool in the redirect configs
 const config = redirectConfigs[toolSlug];

 if (!config) {
 // No config — fall back to the affiliate-links registry default URL
 const affiliate = allAffiliateLinks.find((a) => a.slug === toolSlug);
 const fallbackUrl = affiliate?.referral_url || 'https://apifeny-ai.vercel.app/tools';
 return NextResponse.redirect(fallbackUrl);
 }

 // Check if the env var is set with an affiliate/referral ID
 const affiliateId = process.env[config.envVar];

 if (!affiliateId) {
 // No env var set — redirect to the base URL as-is
 return NextResponse.redirect(config.baseUrl);
 }

 // Build the affiliate URL
 let affiliateUrl: string;

 switch (config.urlPattern) {
 case 'query-param':
 affiliateUrl = `${config.baseUrl}${config.baseUrl.includes('?') ? '&' : '?'}${config.paramName}=${encodeURIComponent(affiliateId)}`;
 break;
 case 'direct-env':
 // For "direct-env", the env var contains the full affiliate URL
 affiliateUrl = affiliateId;
 break;
 case 'subdomain':
 affiliateUrl = `https://${affiliateId}.${config.baseUrl.replace(/^https?:\/\//, '')}`;
 break;
 case 'path-segment':
 affiliateUrl = `${config.baseUrl.replace(/\/$/, '')}/${encodeURIComponent(affiliateId)}`;
 break;
 case 'append-slash':
 affiliateUrl = `${config.baseUrl.replace(/\/$/, '')}/${encodeURIComponent(affiliateId)}`;
 break;
 default:
 affiliateUrl = config.baseUrl;
 }

 return NextResponse.redirect(affiliateUrl);
}
