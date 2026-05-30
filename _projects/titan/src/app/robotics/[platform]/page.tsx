"use client";

import { useState, use } from "react";

/* ─────────────────────────────────────────────────────────────
   Types & Platform Data
   ───────────────────────────────────────────────────────────── */

type PlatformKey =
  | "raspberry-pi"
  | "jetson-nano"
  | "arduino"
  | "esp32"
  | "rover-pro"
  | "titan-arm";

interface PlatformSpec {
  name: string;
  icon: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  deploySteps: { step: number; title: string; cmd?: string; detail: string }[];
  requirements: string[];
  supportedAgentTypes: string[];
  links: { label: string; url: string }[];
}

const PLATFORMS: Record<PlatformKey, PlatformSpec> = {
  "raspberry-pi": {
    name: "Raspberry Pi 5",
    icon: "🍓",
    tagline: "The all-purpose edge brain",
    description:
      "Deploy Titan agents to any Raspberry Pi 4B+ or Pi 5. Runs lightweight inference, sensor fusion, and swarm coordination over MQTT or WebSocket.",
    image: "raspberry-pi",
    specs: [
      { label: "CPU", value: "Quad Cortex-A76 (2.4 GHz)" },
      { label: "RAM", value: "8 GB LPDDR4X" },
      { label: "Storage", value: "microSD / NVMe (via HAT)" },
      { label: "Connectivity", value: "Wi-Fi 5, BT 5.0, GPIO 40-pin" },
    ],
    deploySteps: [
      { step: 1, title: "Flash Raspberry Pi OS Lite", cmd: "sudo apt update && sudo apt upgrade -y", detail: "Use Raspberry Pi Imager to write 64-bit Lite to microSD." },
      { step: 2, title: "Install Node.js & Python", cmd: "curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash - && sudo apt install -y nodejs python3 python3-pip", detail: "Target Node 22+ for Titan agent runtime." },
      { step: 3, title: "Install Titan CLI Agent", cmd: "npm install -g @apifeny/titan-edge", detail: "Global install gives you the `titan-edge` binary for agent lifecycle." },
      { step: 4, title: "Authenticate with Titan Cloud", cmd: "titan-edge login --api-key YOUR_API_KEY", detail: "Generate an API key from the Titan Dashboard → Settings." },
      { step: 5, title: "Deploy Your Agent", cmd: "titan-edge deploy --agent your-agent-id", detail: "The agent binary downloads, validates, and starts automatically. Use `titan-edge status` to confirm." },
    ],
    requirements: ["Raspberry Pi 4B+ or Pi 5 (4 GB+ RAM recommended)", "microSD card (32 GB+), power supply (5V 3A USB-C)", "Stable Wi-Fi or Ethernet", "Raspberry Pi OS Lite (64-bit) or Raspberry Pi OS Desktop"],
    supportedAgentTypes: ["Sensors & IoT", "Edge NLP", "Vision (Pi Camera Module 3)", "MQTT Broker Bridge"],
    links: [
      { label: "Raspberry Pi Official Docs", url: "https://www.raspberrypi.com/documentation/" },
      { label: "Titan Edge SDK Reference", url: "#" },
    ],
  },
  "jetson-nano": {
    name: "NVIDIA Jetson Nano",
    icon: "🧠",
    tagline: "AI inference at the edge",
    description:
      "Run GPU-accelerated Titan agents on Jetson Nano for real-time object detection, pose estimation, and autonomous navigation using TensorRT & CUDA.",
    image: "jetson-nano",
    specs: [
      { label: "GPU", value: "128-core Maxwell" },
      { label: "CPU", value: "Quad Cortex-A57 (1.43 GHz)" },
      { label: "RAM", value: "4 GB LPDDR4" },
      { label: "AI Performance", value: "472 GFLOPS (FP16)" },
    ],
    deploySteps: [
      { step: 1, title: "Flash JetPack SDK", detail: "Download JetPack 6.x from NVIDIA Developer Zone and flash to microSD via SDK Manager." },
      { step: 2, title: "Install Docker & NVIDIA Container Toolkit", cmd: "sudo apt install -y docker.io nvidia-container-toolkit && sudo systemctl enable docker", detail: "Use the pre-built Titan container for Jetson." },
      { step: 3, title: "Pull & Run Titan Agent Container", cmd: "docker run -d --runtime nvidia --network host ghcr.io/apifeny/titan-jetson:latest --agent-id your-agent-id", detail: "The container auto-connects to Titan Cloud via WebSocket." },
      { step: 4, title: "Verify GPU Acceleration", cmd: "docker logs <container-id> | grep 'GPU: OK'", detail: "Check the agent logs to confirm CUDA/TensorRT are active." },
    ],
    requirements: ["NVIDIA Jetson Nano (4 GB variant minimum)", "microSD (64 GB+) or NVMe SSD via expansion header", "5V 4A barrel-jack power supply (not USB!)", "Active cooling fan"],
    supportedAgentTypes: ["Object Detection (YOLO-NAS)", "Pose Estimation", "Autonomous Navigation", "Video Analytics Pipeline"],
    links: [
      { label: "NVIDIA Jetson Nano Developer Kit", url: "https://developer.nvidia.com/embedded/jetson-nano-developer-kit" },
      { label: "JetPack SDK Docs", url: "https://docs.nvidia.com/jetson/jetpack/" },
    ],
  },
  arduino: {
    name: "Arduino Portenta H7",
    icon: "🔌",
    tagline: "Real-time control, minimal power",
    description:
      "Deploy lightweight Titan control agents to Arduino Portenta H7 for high-speed GPIO, motor control, and sensor acquisition with deterministic real-time behavior.",
    image: "arduino",
    specs: [
      { label: "MCU", value: "Cortex-M7 (480 MHz) + M4 (240 MHz)" },
      { label: "SRAM", value: "8 MB SDRAM" },
      { label: "Flash", value: "16 MB" },
      { label: "Connectivity", value: "Wi-Fi, BLE 5.0, USB-C" },
    ],
    deploySteps: [
      { step: 1, title: "Install Arduino IDE + Portenta Core", cmd: "arduino-cli core update-index && arduino-cli core install arduino:mbed_portenta", detail: "Or use Arduino CLI for headless installs." },
      { step: 2, title: "Install Titan Firmware Package", detail: "In Arduino Library Manager, search 'TitanPortenta' and install v2.x." },
      { step: 3, title: "Configure Wi-Fi & Cloud Endpoint", detail: "Set `TITAN_CLOUD_URL` and `TITAN_AGENT_ID` in the firmware config header." },
      { step: 4, title: "Compile & Upload", cmd: "arduino-cli compile --fqbn arduino:mbed_portenta:h7 && arduino-cli upload --fqbn arduino:mbed_portenta:h7 -p /dev/ttyACM0", detail: "The agent connects to Titan Cloud on boot and starts reporting telemetry." },
    ],
    requirements: ["Arduino Portenta H7 board", "USB-C data cable", "Arduino CLI 1.x or Arduino IDE 2.x", "Wi-Fi network with internet access"],
    supportedAgentTypes: ["Motor Control Loops", "Sensor Data Acquisition", "GPIO Supervisor", "BLE Beacon Gateway"],
    links: [
      { label: "Arduino Portenta H7 Docs", url: "https://docs.arduino.cc/hardware/portenta-h7/" },
      { label: "Titan Firmware API Reference", url: "#" },
    ],
  },
  "esp32": {
    name: "ESP32-S3",
    icon: "📡",
    tagline: "Tiny, wireless, everywhere",
    description:
      "The ESP32-S3 is the lowest-cost Titan agent platform. Deploy telemetry collectors, presence detectors, and environmental monitors that talk back to the cloud over Wi-Fi.",
    image: "esp32",
    specs: [
      { label: "MCU", value: "Cortex-M7 (480 MHz) + M4 (240 MHz)" },
      { label: "SRAM", value: "8 MB SDRAM" },
      { label: "Flash", value: "16 MB" },
      { label: "Connectivity", value: "Wi-Fi, BLE 5.0, USB-C" },
    ],
    deploySteps: [
      { step: 1, title: "Set Up ESP-IDF Environment", cmd: "pip install esptool && git clone --recursive https://github.com/espressif/esp-idf.git", detail: "ESP-IDF v5.3+ required for the Titan ESP agent component." },
      { step: 2, title: "Add Titan Edge Component", detail: "Copy `components/titan_edge/` from the Titan SDK into your project's `components/` directory." },
      { step: 3, title: "Configure WiFi Credentials", cmd: "idf.py menuconfig", detail: "Navigate to 'Titan Agent Configuration' and enter your Wi-Fi SSID/password and Cloud API endpoint." },
      { step: 4, title: "Build & Flash", cmd: "idf.py build && idf.py -p /dev/ttyUSB0 flash monitor", detail: "The agent boots, connects to Wi-Fi, and registers with Titan Cloud automatically." },
    ],
    requirements: ["ESP32-S3 DevKit (ESP32-S3-DevKitC-1 recommended)", "USB-C data cable", "ESP-IDF v5.3+ and esptool", "2.4 GHz Wi-Fi network"],
    supportedAgentTypes: ["Temperature/Humidity Monitor", "Presence Detection (Radar)", "BLE Scanner", "Energy Monitor"],
    links: [
      { label: "ESP32-S3 Datasheet", url: "https://www.espressif.com/en/products/socs/esp32-s3" },
      { label: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/" },
    ],
  },
  "rover-pro": {
    name: "Titan Rover Pro",
    icon: "🛞",
    tagline: "Autonomous mobile robotics platform",
    description:
      "Our flagship 4WD rover with LiDAR, depth camera, GPS, and arm mount. Comes pre-loaded with Titan Cloud agents for autonomous navigation, mapping, and pickup/delivery tasks.",
    image: "rover-pro",
    specs: [
      { label: "Chassis", value: "Aluminum 4WD, 500 mm x 400 mm" },
      { label: "Sensors", value: "RPLiDAR A1, Intel RealSense D435, IMU, GPS" },
      { label: "Compute", value: "Jetson Orin NX 16 GB (pre-installed)" },
      { label: "Battery", value: "12 V 20 Ah LiFePO4 (4-6 hrs runtime)" },
    ],
    deploySteps: [
      { step: 1, title: "Unbox & Power On", detail: "Charge the battery fully (6 hrs first charge). Turn on via the rocker switch on the rear panel." },
      { step: 2, title: "Connect to Rover Wi-Fi", detail: "The Rover Pro broadcasts 'Titan-Rover-XXXX' Wi-Fi. Connect and open http://10.42.0.1:3000 in your browser." },
      { step: 3, title: "Run Calibration Wizard", detail: "Navigate to Setup → Calibration. The wizard calibrates LiDAR, IMU, and camera extrinsics (~5 min)." },
      { step: 4, title: "Link to Titan Cloud", detail: "In the Rover web UI, enter your Titan Cloud API key. The rover registers as a deployment and appears on your dashboard." },
      { step: 5, title: "Create Your First Mission", detail: "From the Titan Dashboard → Robotics, select your rover and click 'New Mission'. Choose 'Patrol' or 'Waypoint Delivery'." },
    ],
    requirements: ["Titan Rover Pro hardware unit (shipped assembled)", "LiFePO4 battery (charged)", "Titan Cloud account (free tier works)", "Indoor space for initial setup"],
    supportedAgentTypes: ["Autonomous Patrol", "Package Delivery", "Warehouse Inventory Scan", "Area Mapping"],
    links: [
      { label: "Rover Pro Quickstart Guide (PDF)", url: "#" },
      { label: "Titan Cloud Robotics API", url: "#" },
    ],
  },
  "titan-arm": {
    name: "Titan Robotic Arm",
    icon: "🦾",
    tagline: "Precision manipulation for labs & production",
    description:
      "A 6-DOF collaborative robotic arm with force feedback, capable of pick-and-place, assembly, and tool operation through Titan agents with real-time trajectory planning.",
    image: "titan-arm",
    specs: [
      { label: "DOF", value: "6 + gripper" },
      { label: "Payload", value: "2 kg" },
      { label: "Reach", value: "600 mm" },
      { label: "Repeatability", value: "± 0.1 mm" },
    ],
    deploySteps: [
      { step: 1, title: "Mount & Power", detail: "Bolt the arm to a rigid surface using M8 bolts. Connect 48 V DC power supply. Wait for the status LED to turn solid blue." },
      { step: 2, title: "Install Titan Arm Driver", cmd: "pip install titan-arm-sdk", detail: "The Python SDK includes kinematics, trajectory planning, and force control wrappers." },
      { step: 3, title: "Run Initialization Script", cmd: "python -m titan_arm.init --connect /dev/ttyUSB0", detail: "The script homes the arm, tests each joint, and registers it with Titan Cloud." },
      { step: 4, title: "Deploy a Manipulation Agent", detail: "From the Titan Dashboard → Robotics → Arm, select 'Pick-and-Place Template'. The agent takes over trajectory planning and vision-guided grasping." },
    ],
    requirements: ["Titan 6-DOF Robotic Arm unit", "48 V 10 A DC power supply", "Rigid mounting surface (workbench)", "USB-C connection to a Titan-capable computer"],
    supportedAgentTypes: ["Pick-and-Place", "Screw Driving", "PCB Assembly", "Lab Liquid Handler"],
    links: [
      { label: "Titan Arm SDK on GitHub", url: "#" },
      { label: "Kinematics Deep Dive", url: "#" },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   Components
   ───────────────────────────────────────────────────────────── */

function PlatformHeader({ platform }: { platform: PlatformSpec }) {
  const steps = platform.deploySteps.length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#0c0c1d] via-[#0f0f2a] to-[#0a0a18] p-6 sm:p-8 mb-8">
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{platform.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{platform.name}</h1>
              <p className="text-cyan-400 text-sm font-medium">{platform.tagline}</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            {platform.description}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 bg-cyan-500/10 px-3 py-2 rounded-lg border border-cyan-500/10">
          <span className="text-xs text-cyan-300">{steps} steps</span>
        </div>
      </div>
    </div>
  );
}

function SpecsGrid({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="glass rounded-xl p-5 mb-6">
      <h3 className="text-sm font-semibold text-white mb-4">Hardware Specs</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {specs.map((spec) => (
          <div key={spec.label} className="space-y-1">
            <p className="text-xs text-slate-500">{spec.label}</p>
            <p className="text-sm font-medium text-slate-200">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequirementsCard({ reqs }: { reqs: string[] }) {
  return (
    <div className="glass rounded-xl p-5 mb-6">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <span>📋</span> Requirements
      </h3>
      <ul className="space-y-1.5">
        {reqs.map((req, i) => (
          <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeploySteps({ steps }: { steps: PlatformSpec["deploySteps"] }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  return (
    <div className="glass rounded-xl p-5 mb-6">
      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <span>🚀</span> Deployment Steps
      </h3>
      <div className="space-y-2">
        {steps.map((s) => (
          <div key={s.step} className="border border-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedStep(expandedStep === s.step ? null : s.step)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">
                {s.step}
              </span>
              <span className="text-sm font-medium text-white flex-1">{s.title}</span>
              <span className={`text-slate-500 text-xs transition-transform ${expandedStep === s.step ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {expandedStep === s.step && (
              <div className="px-4 pb-4 pt-0 space-y-3 border-t border-slate-700/30">
                <p className="text-sm text-slate-400 mt-3">{s.detail}</p>
                {s.cmd && (
                  <div className="bg-[#0a0a15] rounded-lg p-3 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800">
                    $ {s.cmd}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentTypesCard({ types }: { types: string[] }) {
  return (
    <div className="glass rounded-xl p-5 mb-6">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <span>🤖</span> Compatible Agent Types
      </h3>
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <span key={t} className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function LinksCard({ links }: { links: { label: string; url: string }[] }) {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <span>🔗</span> Resources
      </h3>
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span className="text-xs">→</span>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Platform Navigation Bar
   ───────────────────────────────────────────────────────────── */

function PlatformNav({
  current,
  platforms,
}: {
  current: PlatformKey;
  platforms: [PlatformKey, PlatformSpec][];
}) {
  return (
    <div className="glass rounded-xl p-3 mb-8 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {platforms.map(([key, plat]) => (
          <a
            key={key}
            href={`/robotics/${key}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              current === key
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/20"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
            }`}
          >
            <span>{plat.icon}</span>
            {plat.name}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────────────────────── */

export default function PlatformSetupPage({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const { platform } = use(params);
  const platformKey = (Object.keys(PLATFORMS).includes(platform)
    ? platform
    : "raspberry-pi") as PlatformKey;

  const plat = PLATFORMS[platformKey];
  const entries = Object.entries(PLATFORMS) as [PlatformKey, PlatformSpec][];

  const [mounted, setMounted] = useState(false);
  useState(() => setMounted(true));

  return (
    <main className="min-h-screen bg-[#08080f]">
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://titan.vercel.app/" },
              { "@type": "ListItem", "position": 2, "name": "Robotics", "item": "https://titan.vercel.app/robotics" },
              { "@type": "ListItem", "position": 3, "name": plat.name, "item": `https://titan.vercel.app/robotics/${platform}` },
            ],
          }),
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#1e293b]/50 bg-[#08080fe0] backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">🦾</span>
            <h1 className="text-lg font-bold text-white">
              <span className="text-cyan-400">Ti</span>
              <span className="text-purple-400">tan</span>
              <span className="text-sm text-slate-500 ml-2 font-normal">
                Robotics Setup Guide
              </span>
            </h1>
          </div>
          <a
            href="/dashboard"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Dashboard
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <PlatformNav current={platformKey} platforms={entries} />
        <PlatformHeader platform={plat} />
        <SpecsGrid specs={plat.specs} />
        <RequirementsCard reqs={plat.requirements} />
        <DeploySteps steps={plat.deploySteps} />
        <AgentTypesCard types={plat.supportedAgentTypes} />

        <div className="grid sm:grid-cols-2 gap-6">
          <LinksCard links={plat.links} />
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <span>💡</span> Need Help?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              First time deploying a Titan agent to {plat.name}? Start with the
              Quickstart guide or ask the community.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs text-slate-400">
                📖 Quickstart PDF
              </span>
              <span className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs text-slate-400">
                💬 Discord
              </span>
            </div>
          </div>
        </div>

        <footer className="mt-10 border-t border-slate-800/50 py-4 text-center text-xs text-slate-600">
          Titan Robotics Setup Guide — v1.0 • {new Date().toLocaleDateString()}
        </footer>
      </div>
    </main>
  );
}
