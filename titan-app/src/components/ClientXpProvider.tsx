'use client';

import { XpNotificationProvider } from '@/components/organisms/XpNotificationProvider';

export default function ClientXpProvider({ children }: { children: React.ReactNode }) {
  return <XpNotificationProvider>{children}</XpNotificationProvider>;
}
