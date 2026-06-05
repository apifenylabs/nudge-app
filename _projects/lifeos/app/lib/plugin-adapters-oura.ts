/**
 * LifeOS Health OS — Oura Ring Cloud API Adapter (Stub)
 * ======================================================
 * Connects to the Oura Cloud API v2 for sleep, readiness, activity,
 * heart rate, and resilience data.
 *
 * Oura is the gold standard for sleep and recovery tracking, making it
 * the ideal backend for LifeOS Health OS recovery & readiness insights.
 *
 * API Docs: https://cloud.ouraring.com/docs
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

export class OuraError extends Error {
  constructor(
    message: string,
    public readonly code: 'AUTH_ERROR' | 'API_ERROR' | 'NETWORK_ERROR' | 'RATE_LIMITED',
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'OuraError';
  }
}

/* ─── Stub Fixtures ─────────────────────────────────────────────────────── */

const SAMPLE_DATA: Partial<HealthSummary> = {
  totalStepsToday: 8912,
  activeCaloriesToday: 495,
  workoutMinutesThisWeek: 160,
  workoutsThisWeek: 3,
  lastNightSleep: {
    date: '2026-06-03',
    totalHours: 7.5,
    deepHours: 1.8,
    remHours: 2.0,
    lightHours: 3.2,
    awakeMinutes: 12,
    bedtime: '2026-06-03T22:45:00Z',
    wakeTime: '2026-06-04T06:30:00Z',
    quality: 8,
    provider: 'oura',
  },
  averageSleepHoursThisWeek: 7.4,
  averageSleepQualityThisWeek: 7.8,
  recentHeartRate: 65,
  recentHRV: 52,
  recentBloodOxygen: 97,
  recentRestingHeartRate: 58,
  recentStressScore: 28,
  recentRecoveryScore: 85,
  stepTrend7Day: [7234, 8912, 9678, 6543, 10345, 8765, 7890],
  sleepTrend7Day: [7.2, 7.5, 7.8, 7.0, 8.0, 6.8, 7.5],
};

/* ─── OuraAdapter ───────────────────────────────────────────────────────── */

export class OuraAdapter implements HealthAdapter {
  readonly provider = 'oura';
  readonly config: HealthAdapterConfig;

  private baseUrl = 'https://api.ouraring.com/v2';
  private timeoutMs: number;
  private personalAccessToken: string | null = null;

  constructor(config: HealthAdapterConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.ouraring.com/v2';
    this.timeoutMs = config.timeoutMs || 10000;
    this.personalAccessToken = config.accessToken || config.apiKey || null;
  }

  /* ─── Connection ──────────────────────────────────────────────────── */

  async connect(): Promise<boolean> {
    try {
      if (!this.personalAccessToken) return false;

      const response = await fetch(`${this.baseUrl}/usercollection/personal_info`, {
        headers: { Authorization: `Bearer ${this.personalAccessToken}` },
        signal: AbortSignal.timeout(5000),
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  /* ─── Records ─────────────────────────────────────────────────────── */

  async getRecords(metric: HealthMetric, from: string, to: string): Promise<HealthRecord[]> {
    try {
      const endpoint = this.metricToEndpoint(metric);
      const url = `${this.baseUrl}/usercollection/${endpoint}?start_date=${from.slice(0, 10)}&end_date=${to.slice(0, 10)}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.personalAccessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (response.status === 429) {
        throw new OuraError('Rate limited', 'RATE_LIMITED', 429);
      }
      if (!response.ok) {
        throw new OuraError(`API error: ${response.statusText}`, 'API_ERROR', response.status);
      }

      const data = await response.json();
      return this.mapRecords(data, metric, endpoint);
    } catch (error) {
      if (error instanceof OuraError) throw error;
      throw new OuraError('Failed to fetch records', 'NETWORK_ERROR');
    }
  }

  /* ─── Workouts ────────────────────────────────────────────────────── */

  async getWorkouts(from: string, to: string): Promise<WorkoutSession[]> {
    try {
      const url = `${this.baseUrl}/usercollection/session?start_date=${from.slice(0, 10)}&end_date=${to.slice(0, 10)}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.personalAccessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        throw new OuraError(`API error: ${response.statusText}`, 'API_ERROR', response.status);
      }

      const data = await response.json();
      return (data.data || []).map((s: any) => ({
        id: s.id || `oura-${Math.random().toString(36).slice(2, 9)}`,
        provider: 'oura',
        type: this.mapSessionType(s.type || s.movement_type),
        startedAt: s.start_datetime || s.day || new Date().toISOString(),
        durationMinutes: (s.end_datetime && s.start_datetime)
          ? Math.round((new Date(s.end_datetime).getTime() - new Date(s.start_datetime).getTime()) / 60000)
          : 30,
        activeCalories: s.calories?.total || s.calories,
        heartRateAvg: s.average_heart_rate,
        heartRateMax: s.max_heart_rate,
        notes: s.label || s.notes,
      }));
    } catch (error) {
      if (error instanceof OuraError) throw error;
      throw new OuraError('Failed to fetch workouts', 'NETWORK_ERROR');
    }
  }

  /* ─── Sleep ───────────────────────────────────────────────────────── */

  async getSleep(date: string): Promise<SleepData | null> {
    try {
      const dateStr = date.slice(0, 10);
      const url = `${this.baseUrl}/usercollection/daily_sleep?start_date=${dateStr}&end_date=${dateStr}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.personalAccessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new OuraError(`API error: ${response.statusText}`, 'API_ERROR', response.status);
      }

      const data = await response.json();
      const sleepDoc = data.data?.[0];
      if (!sleepDoc) return null;

      const contributors = sleepDoc.contributors || {};
      const deepMinutes = sleepDoc.deep_sleep_duration ? sleepDoc.deep_sleep_duration / 60 : 0;
      const remMinutes = sleepDoc.rem_sleep_duration ? sleepDoc.rem_sleep_duration / 60 : 0;
      const lightMinutes = sleepDoc.light_sleep_duration ? sleepDoc.light_sleep_duration / 60 : 0;
      const awakeMinutes = sleepDoc.awake_time ? sleepDoc.awake_time / 60 : 0;
      const totalSeconds = sleepDoc.total_sleep_duration || 0;

      return {
        date: dateStr,
        totalHours: totalSeconds / 3600,
        deepHours: deepMinutes / 60,
        remHours: remMinutes / 60,
        lightHours: lightMinutes / 60,
        awakeMinutes: Math.round(awakeMinutes),
        bedtime: sleepDoc.bedtime_start,
        wakeTime: sleepDoc.bedtime_end,
        quality: (sleepDoc.score ?? 0) || Math.round((contributors.deep_sleep + contributors.rem_sleep) / 2) || 7,
        provider: 'oura',
      };
    } catch (error) {
      if (error instanceof OuraError) throw error;
      throw new OuraError('Failed to fetch sleep data', 'NETWORK_ERROR');
    }
  }

  /* ─── Summary ─────────────────────────────────────────────────────── */

  async getSummary(): Promise<HealthSummary> {
    try {
      const today = new Date().toISOString().slice(0, 10);

      // Oura has dedicated daily readiness, sleep, and activity endpoints
      const [activityData, sleepData, readinessData] = await Promise.allSettled([
        fetch(`${this.baseUrl}/usercollection/daily_activity?start_date=${today}&end_date=${today}`, {
          headers: { Authorization: `Bearer ${this.personalAccessToken}` },
        }).then(r => r.ok ? r.json() : Promise.reject()),
        this.getSleep(today),
        fetch(`${this.baseUrl}/usercollection/daily_readiness?start_date=${today}&end_date=${today}`, {
          headers: { Authorization: `Bearer ${this.personalAccessToken}` },
        }).then(r => r.ok ? r.json() : Promise.reject()),
      ]);

      const activity = activityData.status === 'fulfilled' ? activityData.value?.data?.[0] : null;
      const sleep = sleepData.status === 'fulfilled' ? sleepData.value : null;
      const readiness = readinessData.status === 'fulfilled' ? readinessData.value?.data?.[0] : null;

      // If all three API calls failed (e.g. no network), fall through to sample data
      if (!activity && !sleep && !readiness) {
        return this.mapSummary(SAMPLE_DATA);
      }

      return {
        totalStepsToday: activity?.steps ?? SAMPLE_DATA.totalStepsToday ?? 0,
        activeCaloriesToday: activity?.active_calories ?? activity?.calories_active ?? SAMPLE_DATA.activeCaloriesToday ?? 0,
        workoutMinutesThisWeek: activity?.daily_movement_duration ? Math.round(activity.daily_movement_duration / 60) : SAMPLE_DATA.workoutMinutesThisWeek ?? 0,
        workoutsThisWeek: SAMPLE_DATA.workoutsThisWeek ?? 0,
        lastNightSleep: sleep ?? SAMPLE_DATA.lastNightSleep ?? null,
        averageSleepHoursThisWeek: SAMPLE_DATA.averageSleepHoursThisWeek ?? 0,
        averageSleepQualityThisWeek: SAMPLE_DATA.averageSleepQualityThisWeek ?? 0,
        recentHeartRate: activity?.average_heart_rate ?? SAMPLE_DATA.recentHeartRate,
        recentHRV: readiness?.contributors?.hrv_balance ?? SAMPLE_DATA.recentHRV,
        recentBloodOxygen: SAMPLE_DATA.recentBloodOxygen,
        recentRestingHeartRate: activity?.lowest_heart_rate ?? SAMPLE_DATA.recentRestingHeartRate,
        recentStressScore: 100 - (readiness?.score ?? SAMPLE_DATA.recentRecoveryScore ?? 85),
        recentRecoveryScore: readiness?.score ?? SAMPLE_DATA.recentRecoveryScore,
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
    const endpoint = this.metricToEndpoint(metric);

    try {
      const url = `${this.baseUrl}/usercollection/${endpoint}?start_date=${from.toISOString().slice(0, 10)}&end_date=${now.toISOString().slice(0, 10)}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.personalAccessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) return this.fallbackMetric(metric, days);

      const data = await response.json();
      const items = data.data || [];

      for (const item of items) {
        const val = this.extractMetricValue(item, metric);
        result.push(val);
      }

      return result;
    } catch {
      return this.fallbackMetric(metric, days);
    }
  }

  /* ─── Log Record ──────────────────────────────────────────────────── */

  async logRecord(record: Omit<HealthRecord, 'id' | 'createdAt'>): Promise<string> {
    // Oura does not support writing arbitrary records via the public API.
    // Tag-session endpoint exists for logged activities.
    throw new OuraError(
      'Oura API does not support writing health records directly',
      'API_ERROR',
      501,
    );
  }

  /* ─── Health Check ────────────────────────────────────────────────── */

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      const response = await fetch(`${this.baseUrl}/usercollection/personal_info`, {
        headers: { Authorization: `Bearer ${this.personalAccessToken}` },
        signal: AbortSignal.timeout(5000),
      });
      return { ok: response.ok, latencyMs: Date.now() - start };
    } catch {
      return { ok: false, latencyMs: Date.now() - start };
    }
  }

  /* ─── Private Helpers ─────────────────────────────────────────────── */

  private metricToEndpoint(metric: HealthMetric): string {
    const map: Partial<Record<HealthMetric, string>> = {
      steps: 'daily_activity',
      heart_rate: 'daily_activity',
      heart_rate_variability: 'daily_readiness',
      sleep_hours: 'daily_sleep',
      deep_sleep_hours: 'daily_sleep',
      rem_sleep_hours: 'daily_sleep',
      active_calories: 'daily_activity',
      resting_heart_rate: 'daily_activity',
      blood_oxygen: 'daily_spo2',
      weight_kg: 'daily_activity',
      workout_minutes: 'daily_activity',
      recovery_score: 'daily_readiness',
      readiness_score: 'daily_readiness',
      stress_score: 'daily_readiness',
    };
    return map[metric] || 'daily_activity';
  }

  private extractMetricValue(item: any, metric: HealthMetric): number {
    switch (metric) {
      case 'steps': return item.steps ?? 0;
      case 'heart_rate': return item.average_heart_rate ?? 0;
      case 'heart_rate_variability': return item.contributors?.hrv_balance ?? item.hrv_balance ?? 0;
      case 'sleep_hours':
      case 'deep_sleep_hours': return item.deep_sleep_duration ? item.deep_sleep_duration / 3600 : 0;
      case 'rem_sleep_hours': return item.rem_sleep_duration ? item.rem_sleep_duration / 3600 : 0;
      case 'active_calories': return item.active_calories ?? item.calories_active ?? 0;
      case 'resting_heart_rate': return item.lowest_heart_rate ?? 0;
      case 'workout_minutes': return item.daily_movement_duration ? Math.round(item.daily_movement_duration / 60) : 0;
      case 'recovery_score':
      case 'readiness_score': return item.score ?? 0;
      case 'stress_score': return 100 - (item.score ?? 85);
      default: return 0;
    }
  }

  private fallbackMetric(metric: HealthMetric, days: number): number[] {
    if (metric === 'steps' && days <= 7) return [...(SAMPLE_DATA.stepTrend7Day ?? [])];
    if (metric === 'sleep_hours' && days <= 7) return [...(SAMPLE_DATA.sleepTrend7Day ?? [])];
    return [];
  }

  private mapRecords(raw: any, metric: HealthMetric, endpoint: string): HealthRecord[] {
    if (!raw?.data) return [];
    return raw.data.map((d: any) => ({
      id: d.id || `oura-${metric}-${d.day || d.date}`,
      provider: 'oura',
      metric,
      value: this.extractMetricValue(d, metric),
      unit: this.unitForMetric(metric),
      source: 'wearable' as HealthSource,
      recordedAt: d.day || d.date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      deviceName: 'Oura Ring',
    }));
  }

  private unitForMetric(metric: HealthMetric): string {
    const units: Partial<Record<HealthMetric, string>> = {
      steps: 'count',
      heart_rate: 'bpm',
      heart_rate_variability: 'ms',
      sleep_hours: 'hours',
      deep_sleep_hours: 'hours',
      rem_sleep_hours: 'hours',
      active_calories: 'kcal',
      resting_heart_rate: 'bpm',
      blood_oxygen: '%',
      weight_kg: 'kg',
      workout_minutes: 'minutes',
      recovery_score: '%',
      readiness_score: '%',
      stress_score: '%',
    };
    return units[metric] || 'count';
  }

  private mapSessionType(type?: string): WorkoutSession['type'] {
    if (!type) return 'other';
    const t = type.toLowerCase();
    if (t.includes('run')) return 'running';
    if (t.includes('walk')) return 'walking';
    if (t.includes('cycle') || t.includes('bike')) return 'cycling';
    if (t.includes('swim')) return 'swimming';
    if (t.includes('strength') || t.includes('weight')) return 'strength';
    if (t.includes('yoga')) return 'yoga';
    if (t.includes('hiit')) return 'hiit';
    if (t.includes('pilates')) return 'pilates';
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
