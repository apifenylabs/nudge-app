import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Agent Sandbox — Titan',
  description: 'Test and experiment with AI agent behaviors, skills, and personality configurations in a live sandbox environment.',
};

export default function SandboxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
