import { ShieldCheck, Server, Lock, Zap } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "OWASP Compliant", desc: "Security audited" },
  { icon: Server, label: "Supabase Backend", desc: "Postgres-powered" },
  { icon: Lock, label: "End-to-End Encrypted", desc: "Your data, your keys" },
  { icon: Zap, label: "Vercel Edge", desc: "Global low-latency" },
];

export default function TrustBadges() {
  return (
    <section className="border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">
            Security &amp; Infrastructure
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{b.label}</p>
                  <p className="text-xs text-gray-500">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
