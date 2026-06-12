'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Beaker, Play, Code, Terminal, Sparkles, ArrowRight } from 'lucide-react';
import JsonLd from '@/components/atoms/JsonLd';

const templates = {
  webSearch: `from titan.agent import Agent
from titan.tools import WebSearch, WebScrape

agent = Agent("WebSearcher")
agent.add_tools([WebSearch(), WebScrape()])

result = agent.run("Find the latest AI research papers")
print(f"Found {len(result.sources)} sources")
for s in result.sources:
    print(f"  - {s.title}: {s.url}")`,
  dataAnalyzer: `import pandas as pd
from titan.agent import Agent

def analyze_data(csv_path: str) -> dict:
    df = pd.read_csv(csv_path)
    return {
        "rows": len(df),
        "columns": list(df.columns),
        "summary": df.describe().to_dict(),
        "insights": [
            f"{col}: mean={df[col].mean():.2f}, std={df[col].std():.2f}"
            for col in df.select_dtypes(include="number").columns
        ]
    }

agent = Agent("DataAnalyzer")
agent.bind_tool("analyze", analyze_data)
print(agent.run("analyze sales_data.csv"))`,
  robotController: `from titan.robotics import RobotBridge
from titan.agent import Agent

bridge = RobotBridge(protocol="ros2")

@bridge.on_command
def handle_command(cmd: str, params: dict):
    if cmd == "move":
        bridge.set_velocity(params["x"], params["y"], params["theta"])
    elif cmd == "gripper":
        bridge.set_gripper(params.get("position", 0.0))
    return {"status": "ok", "position": bridge.pose}

agent = Agent("RobotController")
agent.attach_bridge(bridge)
agent.run("Pick up the object at coordinates (0.5, 0.3)")`,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://titan.apifeny.com' },
    { '@type': 'ListItem', position: 2, name: 'Sandbox', item: 'https://titan.apifeny.com/sandbox' },
  ],
};

function simulateRun(code: string): string {
  const defaultOutput = '⚠️ Simulated mode — connect a real agent runtime for live execution.\n\n> Agent initialized\n> Loading skill definitions...\n> Runtime ready\n---\nTo run this code for real, deploy to a Titan Workspace or connect a local runtime via the CLI.';
  return defaultOutput;
}

export default function SandboxPage() {
  const [code, setCode] = useState('# Write agent logic here\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Titan Agent"))');
  const [output, setOutput] = useState('Hello, Titan Agent!');

  const handleRun = () => {
    setOutput(simulateRun(code));
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        {/* Nav */}
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold">Titan</span>
          </Link>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 pt-16 pb-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30 text-amber-300 text-sm font-medium mb-6">
              <Beaker className="w-3.5 h-3.5" />
              Live Sandbox
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Agent Skill Sandbox
            </h1>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              Prototype and test agent skills in real-time. Write logic, preview outputs, and iterate before deploying to production.
            </p>
          </div>
        </section>

        {/* Editor */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Code Input */}
            <div className="rounded-xl bg-gray-900 border border-gray-700 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-gray-300">Agent Script</span>
                <div className="ml-auto flex gap-2">
                  <button onClick={handleRun} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-medium transition-colors">
                    <Play className="w-3 h-3" />
                    Run
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-medium transition-colors">
                    <Sparkles className="w-3 h-3" />
                    Auto
                  </button>
                </div>
              </div>
              <textarea
                className="w-full h-80 bg-gray-950 text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
            </div>

            {/* Output Preview */}
            <div className="rounded-xl bg-gray-900 border border-gray-700 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                <Code className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-gray-300">Output</span>
              </div>
              <div className="h-80 bg-gray-950 p-4 font-mono text-sm text-emerald-400 overflow-auto whitespace-pre-wrap">
                {output}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Templates */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold mb-6">Quick Templates</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button onClick={() => setCode(templates.webSearch)} className="text-left p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-amber-700/40 hover:bg-gray-800/50 transition-all">
                <div className="text-2xl mb-2">🔍</div>
                <h3 className="font-semibold text-sm">Web Search Agent</h3>
                <p className="text-xs text-gray-500 mt-1">Agent with web search and scrape capabilities</p>
              </button>
              <button onClick={() => setCode(templates.dataAnalyzer)} className="text-left p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-amber-700/40 hover:bg-gray-800/50 transition-all">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-sm">Data Analyzer</h3>
                <p className="text-xs text-gray-500 mt-1">Agent that processes CSV and returns insights</p>
              </button>
              <button onClick={() => setCode(templates.robotController)} className="text-left p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-amber-700/40 hover:bg-gray-800/50 transition-all">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="font-semibold text-sm">Robot Controller</h3>
                <p className="text-xs text-gray-500 mt-1">Agent that sends commands to ROS2 hardware</p>
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
            <Beaker className="w-10 h-10 mx-auto mb-4 text-purple-400" />
            <h2 className="text-2xl font-bold mb-2">Ready to Build Real Agents?</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              The sandbox is just the beginning. Create certified agents with visual skill trees and deploy them anywhere.
            </p>
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-semibold hover:from-amber-400 hover:to-purple-500 transition-all shadow-lg shadow-amber-500/20"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
