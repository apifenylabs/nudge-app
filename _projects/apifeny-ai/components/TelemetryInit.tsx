'use client';

import { useEffect } from 'react';

/**
 * Initializes the ecosystem telemetry system on the client side.
 * Must be mounted inside a client boundary (NOT in the server layout directly).
 */
export default function TelemetryInit() {
 useEffect(() => {
 // Dynamically load telemetry only if user has consented
 const initTelemetry = () => {
 if (typeof window === 'undefined') return;
 
 // Check consent — only initialize tracking if opted in
 try {
 const consent = localStorage.getItem('ecosystem_telemetry_consent');
 if (consent !== 'true') return;
 } catch {
 return;
 }

 // Dynamic import to keep initial bundle small
 import('@/lib/telemetry').then(({ EcosystemTelemetry }) => {
 const telemetry = EcosystemTelemetry.getInstance();
 telemetry.init('/api/telemetry');

 // Track page view once
 const path = window.location.pathname + window.location.search;
 telemetry.track('page_view', { path });

 // Track navigation (SPA transitions)
 const originalPushState = history.pushState;
 const originalReplaceState = history.replaceState;

 history.pushState = function (...args) {
 originalPushState.apply(this, args);
 setTimeout(() => {
 const newPath = window.location.pathname + window.location.search;
 telemetry.track('page_view', { path: newPath });
 }, 0);
 };

 history.replaceState = function (...args) {
 originalReplaceState.apply(this, args);
 setTimeout(() => {
 const newPath = window.location.pathname + window.location.search;
 telemetry.track('page_view', { path: newPath });
 }, 0);
 };

 // Listen for popstate (browser back/forward)
 window.addEventListener('popstate', () => {
 const newPath = window.location.pathname + window.location.search;
 telemetry.track('page_view', { path: newPath });
 });
 }).catch((err) => {
 console.warn('[Telemetry] Failed to load:', err);
 });
 };

 // Small delay to let page render first
 const timer = setTimeout(initTelemetry, 1000);
 return () => clearTimeout(timer);
 }, []);

 return null;
}
