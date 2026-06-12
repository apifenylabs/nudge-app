'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight, MessageSquare, Sliders, Play, Rocket } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Describe Your Agent',
    desc: 'Tell Titan what you want — "a customer support bot for my Shopify store" — and the AI generates a tailored agent blueprint.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: <Sliders className="w-6 h-6" />,
    title: 'Customize Skills',
    desc: 'Drag, drop, and configure tools, knowledge sources, triggers, and behaviors. No coding required — visual editor with real-time preview.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: 'Test & Certify',
    desc: 'Run your agent through the sandbox. Challenge it, refine it, then certify its capabilities with verifiable skill badges.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Deploy & Scale',
    desc: 'Deploy to cloud, API, or robotics hardware. Agents run autonomously — handling tasks, monitoring systems, and adapting over time.',
    color: 'from-sky-500 to-blue-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function QuickStartSection() {
  return (
    <section className="px-6 py-24 bg-gradient-to-b from-gray-900/80 to-gray-950/80 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Started in{' '}
            <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              4 Steps
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From concept to deployed agent in minutes. Titan handles the infrastructure so you can focus on creating.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-4 gap-6 relative"
        >
          {/* Connector line */}
          <div className="hidden md:block absolute top-1/2 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-amber-500/40 via-purple-500/40 to-sky-500/40 -translate-y-1/2 pointer-events-none" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center p-6 rounded-xl bg-gray-800/40 border border-gray-700/40 hover:border-amber-500/20 transition-all group"
            >
              {/* Step number badge */}
              <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-sm font-bold shadow-lg`}>
                {i + 1}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {step.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>

              {/* Arrow connector (shown after all except last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-amber-400/60" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/sandbox"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-semibold hover:from-amber-400 hover:to-purple-500 transition-all shadow-lg shadow-amber-500/20"
          >
            <Play className="w-5 h-5" />
            Build Your First Agent
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
