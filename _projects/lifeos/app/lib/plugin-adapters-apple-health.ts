/**
 * LifeOS Health OS — Apple Health Adapter (Stub)
 * ===============================================
 * Connects to Apple HealthKit data via the Health Records API (FHIR).
 * Requires user authorization through Apple's Health Sharing framework.
 *
 * Apple Health does not expose a public REST API for third-party apps.
 * Integration is done through:
 *   1. iOS HealthKit SDK (native app) → exports to a cloud-backed API
 *   2. Health Records API (FHIR) — for clinical data (US-only, requires authorization)
 *   3. Manual export → the adapter reads exported data files
 *
 * This adapter implements a bridging pattern:
 * - Mobile companion app collects HealthKit data
 * - Cloud sync endpoint exposes aggregated data via REST
 * - This adapter connects to the cloud sync endpoint
 *
 * @packageDocumentation
 */

import type {
  HealthAdapter,
  HealthAdapterConfig,
  HealthMetric,
  HealthRecord,
  HealthSummary,
  WorkoutSession,
  SleepData,
  HealthSource,
} from './plugin-adapters';

/* ─── Error Types ───────────────────────────────────────────────────────── */

export class AppleHealthError extends Error {
  constructor(
    message: string,
    public readonly code: 'AUTH_ERROR' | 'API_ERROR' | 'NETWORK_ERROR' | 'NOT_SUPPORTED',
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'AppleHealthError';
  }
}

/* ─── Metric Mapping ────────────────────────────────────────────────────── */

/** Maps internal HealthMetric keys to Apple HealthKit type identifiers. */
const APPLE_HEALTH_METRIC_MAP: Record<HealthMetric, string> = {
  steps: 'HKQuantityTypeIdentifierStepCount',
  heart_rate: 'HKQuantityTypeIdentifierHeartRate',
  heart_rate_variability: 'HKQuantityTypeIdentifierHeartRateVariabilitySDNN',
  sleep_hours: 'HKCategoryTypeIdentifierSleepAnalysis',
  sleep_quality: 'HKCategoryTypeIdentifierSleepAnalysis',
  deep_sleep_hours: 'HKCategoryTypeIdentifierSleepAnalysis',
  rem_sleep_hours: 'HKCategoryTypeIdentifierSleepAnalysis',
  active_calories: 'HKQuantityTypeIdentifierActiveEnergyBurned',
  resting_heart_rate: 'HKQuantityTypeIdentifierRestingHeartRate',
  respiratory_rate: 'HKQuantityTypeIdentifierRespiratoryRate',
  blood_oxygen: 'HKQuantityTypeIdentifierOxygenSaturation',
  weight_kg: 'HKQuantityTypeIdentifierBodyMass',
  body_fat_percentage: 'HKQuantityTypeIdentifierBodyFatPercentage',
  blood_pressure_systolic: 'HKQuantityTypeIdentifierBloodPressureSystolic',
  blood_pressure_diastolic: 'HKQuantityTypeIdentifierBloodPressureDiastolic',
  workouts_count: 'HKWorkoutTypeIdentifier',
  workout_minutes: 'HKWorkoutTypeIdentifier',
  stress_score: 'HKQuantityTypeIdentifierMindfulSession',
  recovery_score: 'HKQuantityTypeIdentifierHeartRateRecoveryOneMinute',
  readiness_score: 'HKQuantityTypeIdentifierAppleWalkingSteadiness',
};

/** Unit mapping for display purposes. */
const APPLE_UNIT_MAP: Partial<Record<HealthMetric, string>> = {
  steps: 'count',
  heart_rate: 'bpm',
  heart_rate_variability: 'ms',
  sleep_hours: 'hours',
  deep_sleep_hours: 'hours',
  rem_sleep_hours: 'hours',
  active_calories: 'kcal',
  resting_heart_rate: 'bpm',
  respiratory_rate: 'breaths/min',
  blood_oxygen: '%',
  weight_kg: 'kg',
  body_fat_percentage: '%',
  blood_pressure_systolic: 'mmHg',
  blood_pressure_diastolic: 'mmHg',
  workout_minutes: 'minutes',
  stress_score: 'minutes',
  recovery_score: 'bpm',
  readiness_score: '%',
};

/* ─── Stub Fixtures ─────────────────────────────────────────────────────── */

/** Sample data for demonstration when no real API is connected. */
const SAMPLE_HEALTH_DATA: Partial<HealthSummary> = {
  totalStepsToday: 8432,
  activeCaloriesToday: 420,
  workoutMinutesThisWeek: 215,
  workoutsThisWeek: 4,
  lastNightSleep: {
    date: '2026-06-03',
    totalHours: 7.2,
    deepHours: 1.5,
    remHours: 1.8,
    lightHours: 3.6,
    awakeMinutes: 18,
    bedtime: '2026-06-03T23:15:00Z',
    wakeTime: '2026-06-04T06:45:00Z',
    quality: 7,
    provider: 'apple_health',
  },
  averageSleepHoursThisWeek: 7.1,
  averageSleepQualityThisWeek: 6.8,
  recentHeartRate: 68,
  recentHRV: 42,
  recentBloodOxygen: 98,
  recentRestingHeartRate: 62,
  recentStressScore: 35,
  recentRecoveryScore: 72,
  stepTrend7Day: [7234, 8912, 10234, 5432, 9876, 8432, 7654],
  sleepTrend7Day: [6.5, 7.8, 7.2, 6.9, 8.1, 6.3, 7.2],
};

/* ─── AppleHealthAdapter ────────────────────────────────────────────────── */

export class AppleHealthAdapter implements HealthAdapter {
  readonly provider = 'apple_health';
  readonly config: HealthAdapterConfig;

  private baseUrl: string;
  private timeoutMs: number;
  private connected = false;

  constructor(config: HealthAdapterConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://health-api.example.com/v1/apple';
    this.timeoutMs = config.timeoutMs || 10000;
  }

  /* ─── Connection ──────────────────────────────────────────────────── */

  async connect(): Promise<boolean> {
    try {
      // Stub: in production, this would initiate Apple Health Sharing auth flow
      if (this.config.accessToken) {
        this.connected = true;
        return true;
      }

      // Simulate auth flow for demo
      if (this.config.apiKey) {
        this.connected = true;
        return true;
      }

      console.warn('[AppleHealth] No accessToken or apiKey provided');
      return false;
    } catch {
      return false;
    }
  }

  /* ─── Records ─────────────────────────────────────────────────────── */

  async getRecords(metric: HealthMetric, from: string, to: string): Promise<HealthRecord[]> {
    const appleType = APPLE_HEALTH_METRIC_MAP[metric];
    if (!appleType) {
      throw new AppleHealthError(
        `Unsupported metric: ${metric}`,
        'NOT_SUPPORTED',
      );
    }

    try {
      const response = await fetch(`${this.baseUrl}/records`, {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify({
          metricType: appleType,
          from,
          to,
        }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        throw new AppleHealthError(
          `API error: ${response.statusText}`,
          'API_ERROR',
          response.status,
        );
      }

      const data = await response.json();
      return this.mapRecords(data, metric);
    } catch (error) {
      if (error instanceof AppleHealthError) throw error;
      throw new AppleHealthError(
        'Failed to fetch health records',
        'NETWORK_ERROR',
      );
    }
  }

  /* ─── Workouts ────────────────────────────────────────────────────── */

  async getWorkouts(from: string, to: string): Promise<WorkoutSession[]> {
    try {
      const response = await fetch(`${this.baseUrl}/workouts`, {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify({ from, to }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        throw new AppleHealthError(
          `API error: ${response.statusText}`,
          'API_ERROR',
          response.status,
        );
      }

      const data = await response.json();
      return (data.workouts || []).map((w: any) => ({
        id: w.id || `aw-${Math.random().toString(36).slice(2, 9)}`,
        provider: 'apple_health',
        type: this.mapWorkoutType(w.workoutType || w.type),
        startedAt: w.startDate || w.startedAt,
        durationMinutes: w.duration || w.durationMinutes || 0,
        activeCalories: w.activeEnergyBurned || w.activeCalories,
        heartRateAvg: w.averageHeartRate || w.heartRateAvg,
        heartRateMax: w.maxHeartRate || w.heartRateMax,
        distanceMeters: w.distance || w.distanceMeters,
        notes: w.notes,
      }));
    } catch (error) {
      if (error instanceof AppleHealthError) throw error;
      throw new AppleHealthError(
        'Failed to fetch workouts',
        'NETWORK_ERROR',
      );
    }
  }

  /* ─── Sleep ───────────────────────────────────────────────────────── */

  async getSleep(date: string): Promise<SleepData | null> {
    try {
      const response = await fetch(`${this.baseUrl}/sleep?date=${date}`, {
        headers: this.authHeaders(),
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new AppleHealthError(
          `API error: ${response.statusText}`,
          'API_ERROR',
          response.status,
        );
      }

      const data = await response.json();
      return {
        date,
        totalHours: data.totalHours || 0,
        deepHours: data.deepHours || 0,
        remHours: data.remHours || 0,
        lightHours: data.lightHours || 0,
        awakeMinutes: data.awakeMinutes || 0,
        bedtime: data.bedtime,
        wakeTime: data.wakeTime,
        quality: data.quality,
        provider: 'apple_health',
      };
    } catch (error) {
      if (error instanceof AppleHealthError) throw error;
      throw new AppleHealthError(
        'Failed to fetch sleep data',
        'NETWORK_ERROR',
      );
    }
  }

  /* ─── Summary ─────────────────────────────────────────────────────── */

  async getSummary(): Promise<HealthSummary> {
    try {
      const response = await fetch(`${this.baseUrl}/summary`, {
        headers: this.authHeaders(),
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        throw new AppleHealthError(
          `API error: ${response.statusText}`,
          'API_ERROR',
          response.status,
        );
      }

      const data = await response.json();
      return this.mapSummary(data);
    } catch {
      // Fall back to sample data if real API isn't available
      return this.mapSummary(SAMPLE_HEALTH_DATA);
    }
  }

  /* ─── Metric Time Series ──────────────────────────────────────────── */

  async getMetric(metric: HealthMetric, days: number): Promise<number[]> {
    const now = new Date();
    const from = new Date(now.getTime() - days * 86_400_000).toISOString();

    try {
      const records = await this.getRecords(metric, from, now.toISOString());

      // Bucket records by date
      const buckets = new Map<string, number[]>();
      for (const record of records) {
        const day = record.recordedAt.slice(0, 10);
        if (!buckets.has(day)) buckets.set(day, []);
        buckets.get(day)!.push(record.value);
      }

      // Average per day
      const sortedDays = Array.from(buckets.keys()).sort();
      return sortedDays.map((day) => {
        const values = buckets.get(day)!;
        return values.reduce((a, b) => a + b, 0) / values.length;
      });
    } catch {
      // Return trend from sample data
      if (metric === 'steps' && days <= 7) return [...SAMPLE_HEALTH_DATA.stepTrend7Day!];
      if (metric === 'sleep_hours' && days <= 7) return [...SAMPLE_HEALTH_DATA.sleepTrend7Day!];
      return [];
    }
  }

  /* ─── Log Record ──────────────────────────────────────────────────── */

  async logRecord(record: Omit<HealthRecord, 'id' | 'createdAt'>): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/records`, {
        method: 'PUT',
        headers: this.authHeaders(),
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        throw new AppleHealthError(
          `Failed to log record: ${response.statusText}`,
          'API_ERROR',
          response.status,
        );
      }

      const data = await response.json();
      return data.id || `ah-${Math.random().toString(36).slice(2, 9)}`;
    } catch (error) {
      if (error instanceof AppleHealthError) throw error;
      throw new AppleHealthError(
        'Failed to log health record',
        'NETWORK_ERROR',
      );
    }
  }

  /* ─── Health Check ────────────────────────────────────────────────── */

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      const response = await fetch(`${this.baseUrl}/ping`, {
        headers: this.authHeaders(),
        signal: AbortSignal.timeout(5000),
      });
      return { ok: response.ok, latencyMs: Date.now() - start };
    } catch {
      return { ok: false, latencyMs: Date.now() - start };
    }
  }

  /* ─── Private Helpers ─────────────────────────────────────────────── */

  private authHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.config.accessToken) {
      headers['Authorization'] = `Bearer ${this.config.accessToken}`;
    } else if (this.config.apiKey) {
      headers['X-API-Key'] = this.config.apiKey;
    }
    return headers;
  }

  private mapRecords(raw: any, metric: HealthMetric): HealthRecord[] {
    if (!raw || !Array.isArray(raw.records)) return [];

    return raw.records.map((r: any) => ({
      id: r.id || `ah-${Math.random().toString(36).slice(2, 9)}`,
      provider: 'apple_health',
      metric,
      value: r.value || r.quantity || 0,
      unit: APPLE_UNIT_MAP[metric] || 'count',
      source: 'apple_health' as HealthSource,
      recordedAt: r.startDate || r.recordedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      deviceName: r.deviceName || 'Apple Watch',
      tags: r.metadata?.tags || [],
    }));
  }

  private mapWorkoutType(type?: string): WorkoutSession['type'] {
    if (!type) return 'other';
    const t = type.toLowerCase();
    if (t.includes('run')) return 'running';
    if (t.includes('walk')) return 'walking';
    if (t.includes('cycle') || t.includes('bike')) return 'cycling';
    if (t.includes('swim') || t.includes('pool')) return 'swimming';
    if (t.includes('strength') || t.includes('weight')) return 'strength';
    if (t.includes('yoga')) return 'yoga';
    if (t.includes('hiit') || t.includes('high')) return 'hiit';
    if (t.includes('pilates')) return 'pilates';
    if (t.includes('dance')) return 'dance';
    if (t.includes('sport') || t.includes('game')) return 'sports';
    return 'other';
  }

  private mapSummary(raw: any): HealthSummary {
    return {
      totalStepsToday: raw.totalStepsToday ?? 0,
      activeCaloriesToday: raw.activeCaloriesToday ?? 0,
      workoutMinutesThisWeek: raw.workoutMinutesThisWeek ?? 0,
      workoutsThisWeek: raw.workoutsThisWeek ?? 0,
      lastNightSleep: raw.lastNightSleep ?? null,
      averageSleepHoursThisWeek: raw.averageSleepHoursThisWeek ?? 0,
      averageSleepQualityThisWeek: raw.averageSleepQualityThisWeek ?? 0,
      recentHeartRate: raw.recentHeartRate,
      recentHRV: raw.recentHRV,
      recentBloodOxygen: raw.recentBloodOxygen,
      recentRestingHeartRate: raw.recentRestingHeartRate,
      recentStressScore: raw.recentStressScore,
      recentRecoveryScore: raw.recentRecoveryScore,
      stepTrend7Day: raw.stepTrend7Day ?? [],
      sleepTrend7Day: raw.sleepTrend7Day ?? [],
    };
  }
}
