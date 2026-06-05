/**
 * LifeOS Health OS — Fitbit Web API Adapter (Stub)
 * =================================================
 * Connects to the Fitbit Web API for activity, sleep, heart rate, and
 * body data. Uses OAuth 2.0 for authentication.
 *
 * API Docs: https://dev.fitbit.com/build/reference/web-api/
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

export class FitbitError extends Error {
  constructor(
    message: string,
    public readonly code: 'AUTH_ERROR' | 'API_ERROR' | 'NETWORK_ERROR' | 'RATE_LIMITED',
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'FitbitError';
  }
}

/* ─── Metric Mapping ────────────────────────────────────────────────────── */

const FITBIT_API_ENDPOINTS: Partial<Record<HealthMetric, string>> = {
  steps: 'activities/steps',
  heart_rate: 'activities/heart',
  heart_rate_variability: 'activities/heart',
  sleep_hours: 'sleep',
  deep_sleep_hours: 'sleep',
  rem_sleep_hours: 'sleep',
  active_calories: 'activities/calories',
  resting_heart_rate: '/activities/heart',
  weight_kg: 'body/weight',
  body_fat_percentage: 'body/fat',
  workout_minutes: 'activities/activeZoneMinutes',
  blood_oxygen: 'spo2',
};

/* ─── Stub Fixtures ─────────────────────────────────────────────────────── */

const SAMPLE_DATA: Partial<HealthSummary> = {
  totalStepsToday: 10452,
  activeCaloriesToday: 580,
  workoutMinutesThisWeek: 185,
  workoutsThisWeek: 3,
  lastNightSleep: {
    date: '2026-06-03',
    totalHours: 6.8,
    deepHours: 1.2,
    remHours: 1.5,
    lightHours: 3.8,
    awakeMinutes: 18,
    bedtime: '2026-06-03T23:30:00Z',
    wakeTime: '2026-06-04T07:00:00Z',
    quality: 6,
    provider: 'fitbit',
  },
  averageSleepHoursThisWeek: 6.9,
  averageSleepQualityThisWeek: 6.5,
  recentHeartRate: 72,
  recentHRV: 38,
  recentBloodOxygen: 97,
  recentRestingHeartRate: 65,
  recentStressScore: 40,
  recentRecoveryScore: 68,
  stepTrend7Day: [6789, 10452, 8765, 5432, 10234, 9123, 7890],
  sleepTrend7Day: [6.2, 6.8, 7.0, 6.5, 7.5, 6.0, 6.8],
};

/* ─── FitbitAdapter ─────────────────────────────────────────────────────── */

export class FitbitAdapter implements HealthAdapter {
  readonly provider = 'fitbit';
  readonly config: HealthAdapterConfig;

  private baseUrl = 'https://api.fitbit.com/1/user/-';
  private timeoutMs: number;
  private accessToken: string | null = null;

  constructor(config: HealthAdapterConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.fitbit.com/1/user/-';
    this.timeoutMs = config.timeoutMs || 10000;
    this.accessToken = config.accessToken || null;
  }

  /* ─── Connection ──────────────────────────────────────────────────── */

  async connect(): Promise<boolean> {
    try {
      if (this.accessToken) {
        const response = await fetch(`${this.baseUrl}/profile.json`, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
          signal: AbortSignal.timeout(5000),
        });
        this.accessToken = response.ok ? this.accessToken : null;
        return response.ok;
      }
      return false;
    } catch {
      return false;
    }
  }

  /* ─── Records ─────────────────────────────────────────────────────── */

  async getRecords(metric: HealthMetric, from: string, to: string): Promise<HealthRecord[]> {
    const endpoint = FITBIT_API_ENDPOINTS[metric];
    if (!endpoint) {
      throw new FitbitError(`Unsupported metric: ${metric}`, 'API_ERROR');
    }

    try {
      const dateStr = from.slice(0, 10);
      const url = `${this.baseUrl}/${endpoint}/date/${dateStr}/today.json`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (response.status === 429) {
        throw new FitbitError('Rate limited', 'RATE_LIMITED', 429);
      }
      if (!response.ok) {
        throw new FitbitError(`API error: ${response.statusText}`, 'API_ERROR', response.status);
      }

      const data = await response.json();
      return this.mapRecords(data, metric);
    } catch (error) {
      if (error instanceof FitbitError) throw error;
      throw new FitbitError('Failed to fetch records', 'NETWORK_ERROR');
    }
  }

  /* ─── Workouts ────────────────────────────────────────────────────── */

  async getWorkouts(from: string, to: string): Promise<WorkoutSession[]> {
    try {
      const url = `${this.baseUrl}/activities/list.json?afterDate=${from.slice(0, 10)}&sort=asc&offset=0&limit=50`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        throw new FitbitError(`API error: ${response.statusText}`, 'API_ERROR', response.status);
      }

      const data = await response.json();
      return (data.activities || []).map((a: any) => ({
        id: a.logId ? String(a.logId) : `fb-${Math.random().toString(36).slice(2, 9)}`,
        provider: 'fitbit',
        type: this.mapActivityType(a.activityName || a.name),
        startedAt: a.startTime || a.startedAt,
        durationMinutes: a.duration / 60000 || a.durationMinutes || 0,
        activeCalories: a.calories || a.activeCalories,
        heartRateAvg: a.averageHeartRate || a.heartRateAvg,
        heartRateMax: a.maxHeartRate,
        distanceMeters: a.distance ? Math.round(a.distance * 1609.34) : undefined,
        notes: a.description,
      }));
    } catch (error) {
      if (error instanceof FitbitError) throw error;
      throw new FitbitError('Failed to fetch workouts', 'NETWORK_ERROR');
    }
  }

  /* ─── Sleep ───────────────────────────────────────────────────────── */

  async getSleep(date: string): Promise<SleepData | null> {
    try {
      const url = `${this.baseUrl}/sleep/date/${date.slice(0, 10)}.json`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new FitbitError(`API error: ${response.statusText}`, 'API_ERROR', response.status);
      }

      const data = await response.json();
      const sleep = data.sleep?.[0];
      if (!sleep) return null;

      const levels = sleep.levels?.summary || {};
      const deepMinutes = levels.deep?.minutes || 0;
      const remMinutes = levels.rem?.minutes || 0;
      const lightMinutes = levels.light?.minutes || 0;
      const awakeMinutes = levels.wake?.minutes || 0;
      const totalMinutes = sleep.minutesAsleep || sleep.duration / 60000 || 0;

      return {
        date: date.slice(0, 10),
        totalHours: totalMinutes / 60,
        deepHours: deepMinutes / 60,
        remHours: remMinutes / 60,
        lightHours: lightMinutes / 60,
        awakeMinutes,
        bedtime: sleep.startTime,
        wakeTime: sleep.endTime,
        quality: Math.round((deepMinutes + remMinutes) / totalMinutes * 10) || 5,
        provider: 'fitbit',
      };
    } catch (error) {
      if (error instanceof FitbitError) throw error;
      throw new FitbitError('Failed to fetch sleep data', 'NETWORK_ERROR');
    }
  }

  /* ─── Summary ─────────────────────────────────────────────────────── */

  async getSummary(): Promise<HealthSummary> {
    try {
      const today = new Date().toISOString().slice(0, 10);

      const [stepsData, heartData, sleepData, caloriesData] = await Promise.allSettled([
        this.getRecords('steps', today, today),
        this.getRecords('heart_rate', today, today),
        this.getSleep(today),
        this.getRecords('active_calories', today, today),
      ]);

      const steps = stepsData.status === 'fulfilled' ? stepsData.value : [];
      const heart = heartData.status === 'fulfilled' ? heartData.value : [];
      const sleep = sleepData.status === 'fulfilled' ? sleepData.value : null;
      const calories = caloriesData.status === 'fulfilled' ? caloriesData.value : [];

      return {
        totalStepsToday: steps.reduce((s, r) => s + r.value, 0),
        activeCaloriesToday: calories.reduce((s, r) => s + r.value, 0),
        workoutMinutesThisWeek: SAMPLE_DATA.workoutMinutesThisWeek ?? 0,
        workoutsThisWeek: SAMPLE_DATA.workoutsThisWeek ?? 0,
        lastNightSleep: sleep,
        averageSleepHoursThisWeek: SAMPLE_DATA.averageSleepHoursThisWeek ?? 0,
        averageSleepQualityThisWeek: SAMPLE_DATA.averageSleepQualityThisWeek ?? 0,
        recentHeartRate: heart.length > 0 ? heart[heart.length - 1].value : SAMPLE_DATA.recentHeartRate,
        recentHRV: SAMPLE_DATA.recentHRV,
        recentBloodOxygen: SAMPLE_DATA.recentBloodOxygen,
        recentRestingHeartRate: SAMPLE_DATA.recentRestingHeartRate,
        recentStressScore: SAMPLE_DATA.recentStressScore,
        recentRecoveryScore: SAMPLE_DATA.recentRecoveryScore,
        stepTrend7Day: [...(SAMPLE_DATA.stepTrend7Day ?? [])],
        sleepTrend7Day: [...(SAMPLE_DATA.sleepTrend7Day ?? [])],
      };
    } catch {
      return this.mapSummary(SAMPLE_DATA);
    }
  }

  /* ─── Metric Time Series ──────────────────────────────────────────── */

  async getMetric(metric: HealthMetric, days: number): Promise<number[]> {
    const now = new Date();
    const from = new Date(now.getTime() - days * 86_400_000);
    const result: number[] = [];

    for (let d = new Date(from); d <= now; d.setDate(d.getDate() + 1)) {
      try {
        const records = await this.getRecords(metric, d.toISOString(), d.toISOString());
        const values = records.map(r => r.value);
        result.push(values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0);
      } catch {
        result.push(0);
      }
    }

    // If all zeros, fall back to sample data
    if (result.every(v => v === 0)) {
      if (metric === 'steps' && days <= 7) return [...(SAMPLE_DATA.stepTrend7Day ?? [])];
      if (metric === 'sleep_hours' && days <= 7) return [...(SAMPLE_DATA.sleepTrend7Day ?? [])];
    }

    return result;
  }

  /* ─── Log Record ──────────────────────────────────────────────────── */

  async logRecord(record: Omit<HealthRecord, 'id' | 'createdAt'>): Promise<string> {
    try {
      // Fitbit uses different endpoints per metric type
      const url = `${this.baseUrl}/activities.json`;
      const body: any = {
        activityName: record.metric,
        startTime: record.recordedAt,
        durationMillis: 60000,
        manualCalories: record.metric === 'active_calories' ? Math.round(record.value) : undefined,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        throw new FitbitError(`Failed to log: ${response.statusText}`, 'API_ERROR', response.status);
      }

      const data = await response.json();
      return String(data.activityLog?.logId || `fb-${Math.random().toString(36).slice(2, 9)}`);
    } catch (error) {
      if (error instanceof FitbitError) throw error;
      throw new FitbitError('Failed to log record', 'NETWORK_ERROR');
    }
  }

  /* ─── Health Check ────────────────────────────────────────────────── */

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      const response = await fetch(`${this.baseUrl}/profile.json`, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        signal: AbortSignal.timeout(5000),
      });
      return { ok: response.ok, latencyMs: Date.now() - start };
    } catch {
      return { ok: false, latencyMs: Date.now() - start };
    }
  }

  /* ─── Private Helpers ─────────────────────────────────────────────── */

  private mapRecords(raw: any, metric: HealthMetric): HealthRecord[] {
    if (!raw) return [];
    const unit = metric === 'steps' ? 'count' : metric === 'active_calories' ? 'kcal' : 'count';

    // Fitbit returns different structures per endpoint
    const dataset = raw['activities-steps'] || raw['activities-heart'] || raw['activities-calories'] || raw['body-weight'] || raw['body-fat'] || [];

    if (Array.isArray(dataset)) {
      return dataset.map((d: any) => ({
        id: `fb-${metric}-${d.dateTime || d.date}`,
        provider: 'fitbit',
        metric,
        value: typeof d.value === 'string' ? parseFloat(d.value) || 0 : d.value ?? 0,
        unit,
        source: 'wearable' as HealthSource,
        recordedAt: d.dateTime || d.date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        deviceName: 'Fitbit Device',
      }));
    }

    return [];
  }

  private mapActivityType(name?: string): WorkoutSession['type'] {
    if (!name) return 'other';
    const n = name.toLowerCase();
    if (n.includes('run') || n.includes('jog')) return 'running';
    if (n.includes('walk')) return 'walking';
    if (n.includes('bike') || n.includes('cycle')) return 'cycling';
    if (n.includes('swim')) return 'swimming';
    if (n.includes('weight') || n.includes('strength')) return 'strength';
    if (n.includes('yoga')) return 'yoga';
    if (n.includes('hiit')) return 'hiit';
    if (n.includes('pilates')) return 'pilates';
    if (n.includes('dance')) return 'dance';
    if (n.includes('sport')) return 'sports';
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
