'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Puzzle, Rocket, Zap } from 'lucide-react';

const steps = [
  {
    icon: Bot,
    title: 'Describe Your Agent',
    description: 'Tell Titan what you want to build — a customer support bot, a content writer, a data analyst, or anything else. No coding required.',
  },
  {
    icon: Puzzle,
    title: 'Customize Behavior',
    description: 'Add knowledge sources, set tone and personality, connect APIs, and configure tools. Titan handles the orchestration.',
  },
  {
    icon: Zap,
    title: 'Test & Iterate',
    description: 'Run your agent in the sandbox, tweak responses in real-time, and watch it improve with every iteration.',
  },
  {
    icon: Rocket,
    title: 'Deploy Anywhere',
    description: 'One click to deploy your agent as an API endpoint, embeddable widget, or standalone web app. Share with the world.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function QuickStartSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center">
            <motion.h2
              variants={itemVariants}
              className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
              Get Started in Minutes
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            >
              From idea to live AI agent in four simple steps. No technical skills needed.
            </motion.p>
          </div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="group relative"
              >
                {/* Step number badge */}
                <div className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
                  {index + 1}
                </div>

                <div className="flex h-full flex-col items-center space-y-4 rounded-xl border bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>

                  {/* Connector arrow (desktop) */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-4 top-1/3 hidden text-muted-foreground/30 md:block">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <Button size="lg" onClick={() => window.location.href = '/login'}>
                Build Your First Agent
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
