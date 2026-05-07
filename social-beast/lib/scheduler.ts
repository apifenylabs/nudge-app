import type { Post, Schedule } from "./types";
import { getScheduledPosts as getScheduledFromStore, updatePost } from "./posts";

const SCHEDULE_KEY = "social-beast-schedules";

// ───── Schedule Storage ────────────────────────────────────────────────────

function getSchedulesFromStorage(): Schedule[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SCHEDULE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSchedules(schedules: Schedule[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedules));
}

// ───── Schedule CRUD ───────────────────────────────────────────────────────

export async function createSchedule(
  postId: string,
  platform: string,
  scheduledAt: string
): Promise<Schedule> {
  const schedule: Schedule = {
    id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    postId,
    platform: platform as any,
    scheduledAt,
    status: "pending",
  };
  const schedules = getSchedulesFromStorage();
  schedules.push(schedule);
  saveSchedules(schedules);
  return schedule;
}

export async function getSchedules(): Promise<Schedule[]> {
  return getSchedulesFromStorage();
}

export async function getScheduledPosts(): Promise<Post[]> {
  return getScheduledFromStore();
}

export async function cancelSchedule(scheduleId: string): Promise<boolean> {
  const schedules = getSchedulesFromStorage();
  const filtered = schedules.filter((s) => s.id !== scheduleId);
  if (filtered.length === schedules.length) return false;
  saveSchedules(filtered);
  return true;
}

export async function processScheduledPosts(): Promise<void> {
  const schedules = getSchedulesFromStorage();
  const now = new Date();

  for (const schedule of schedules) {
    if (schedule.status !== "pending") continue;
    if (new Date(schedule.scheduledAt) <= now) {
      // Mark as published (actual posting done by publish.ts)
      schedule.status = "published";
      await updatePost(schedule.postId, { status: "posted" });
    }
  }

  saveSchedules(schedules);
}
