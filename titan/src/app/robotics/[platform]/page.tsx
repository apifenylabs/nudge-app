"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import JsonLd from '@/components/atoms/JsonLd';
import {
  Cpu,
  CircuitBoard,
  Radio,
  Settings,
  ArrowLeft,
  CheckCircle2,
  Server,
  Wifi,
  Terminal,
  BookOpen,
  Zap,
  Cog,
  Brain,
} from 'lucide-react';

// ─── Platform definitions ──────────────────────────────────────────────

interface PlatformGuide {
  id: string;
  name: string;
  shortDesc: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  heroImage: string;
  specs: { label: string; value: string }[];
  requirements: string[];
  steps: { title: string; commands?: string[]; note?: string }[];
  compatibleAgents: { name: string; desc: string }[];
  resources: { label: string; url: string }[];
  longDesc: string;
}
const ALL_PLATFORMS: { id: string; name: string; icon: React.ReactNode; color: string }[] = [
  { id: 'raspberry-pi', name: 'Raspberry Pi 5', icon: <Radio className="w-4 h-4" />, color: '#8B5CF6' },
  { id: 'jetson-nano', name: 'Jetson Nano', icon: <Cpu className="w-4 h-4" />, color: '#14B8A6' },
  { id: 'portenta-h7', name: 'Portenta H7', icon: <CircuitBoard className="w-4 h-4" />, color: '#F59E0B' },
  { id: 'esp32-s3', name: 'ESP32-S3', icon: <CircuitBoard className="w-4 h-4" />, color: '#10B981' },
  { id: 'titan-rover-pro', name: 'Titan Rover Pro', icon: <Cog className="w-4 h-4" />, color: '#6366F1' },
  { id: 'titan-robotic-arm', name: 'Robotic Arm', icon: <Cog className="w-4 h-4" />, color: '#EC4899' },
];

const PLATFORM_GUIDES: Record<string, PlatformGuide> = {
  'raspberry-pi': {
    id: 'raspberry-pi',
    name: 'Raspberry Pi 5',
    shortDesc: 'Deploy Titan agents as systemd services on Raspberry Pi 5',
    icon: <Radio className="w-8 h-8" />,
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    heroImage: '🖥️',
    specs: [
      { label: 'CPU', value: 'Quad Cortex-A76 @ 2.4GHz' },
      { label: 'RAM', value: '4GB / 8GB LPDDR4X' },
      { label: 'Storage', value: 'microSD / NVMe (optional)' },
      { label: 'Connectivity', value: 'WiFi 5, BT 5.0, Gigabit Ethernet' },
      { label: 'GPIO', value: '40-pin header, I²C, SPI, UART' },
      { label: 'Power', value: '5V 3A USB-C (27W PD)' },
      { label: 'OS', value: 'Raspberry Pi OS (Debian-based)' },
    ],
    requirements: [
      'Raspberry Pi 5 board + power supply + microSD card (32GB+ recommended)',
      'Raspberry Pi OS Lite or Desktop (64-bit) freshly installed',
      'Node.js v20+ (ARM64) — installed via nvm or NodeSource',
      'Git — for cloning Titan agent codebase',
      'Network connectivity (WiFi or Ethernet)',
      'SSH access from your development machine',
      'Systemd — for running agent as a service',
      'Optional: Python 3.10+ for ML/vision plugins',
    ],
    steps: [
      {
        title: 'Flash Raspberry Pi OS',
        commands: [
          '# Download Raspberry Pi Imager from raspberrypi.com/software',
          '# Select Raspberry Pi 5 → Raspberry Pi OS Lite (64-bit)',
          '# Configure WiFi, SSH, and hostname before flashing',
          '# Write to microSD card',
        ],
        note: 'Pre-configure SSH keys and WiFi via the Imager advanced menu (Ctrl+Shift+X)',
      },
      {
        title: 'Boot & Connect',
        commands: [
          '# Find your Pi on the network',
          'ping raspberrypi.local',
          '',
          '# SSH into your Pi',
          'ssh pi@raspberrypi.local',
          '# Default password: raspberry',
        ],
        note: "If mDNS doesn't resolve, check your router's DHCP client list for the Pi's IP",
      },
      {
        title: 'Install Node.js v22 (ARM64)',
        commands: [
          '# Using nvm (recommended)',
          'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash',
          'source ~/.bashrc',
          'nvm install 22',
          'nvm use 22',
          'node --version  # confirm v22.x',
          '',
          '# OR using NodeSource (alternative)',
          'curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -',
          'sudo apt-get install -y nodejs',
        ],
      },
      {
        title: 'Clone Titan Agent',
        commands: [
          'cd ~',
          'git clone https://github.com/apifenylabs/titan-agent.git',
          'cd titan-agent',
          'npm install',
          '',
          '# Build the agent',
          'npm run build',
        ],
        note: 'Replace with your actual Titan agent repository URL',
      },
      {
        title: 'Configure Environment',
        commands: [
          '# Copy and edit environment config',
          'cp .env.example .env',
          'nano .env',
          '',
          '# Required:',
          '#   TITAN_AGENT_ID="my-rpi-agent"',
          '#   TITAN_API_KEY="your-api-key"',
          '#   TITAN_MODE="headless"',
          '#   TITAN_AUTO_START="true"',
        ],
      },
      {
        title: 'Create Systemd Service',
        commands: [
          '# Create service file',
          'sudo nano /etc/systemd/system/titan-agent.service',
          '',
          '# Paste the following:',
          '[Unit]',
          'Description=Titan Agent Service',
          'After=network.target',
          '',
          '[Service]',
          'Type=simple',
          'User=pi',
          'WorkingDirectory=/home/pi/titan-agent',
          'ExecStart=/home/pi/.nvm/versions/node/v22/bin/node dist/index.js',
          'Restart=always',
          'RestartSec=10',
          'Environment=NODE_ENV=production',
          '',
          '[Install]',
          'WantedBy=multi-user.target',
        ],
      },
      {
        title: 'Enable & Start Service',
        commands: [
          'sudo systemctl daemon-reload',
          'sudo systemctl enable titan-agent',
          'sudo systemctl start titan-agent',
          'sudo systemctl status titan-agent  # verify green',
        ],
        note: 'Check logs anytime with: journalctl -u titan-agent -f',
      },
      {
        title: 'Verify Deployment',
        commands: [
          '# Check agent heartbeat via API',
          'curl -s http://localhost:3000/api/robotics/status | jq .',
          '',
          '# Or check systemd logs',
          'sudo journalctl -u titan-agent --no-pager | tail -20',
        ],
      },
    ],
    compatibleAgents: [
      { name: 'Surveillance Agent', desc: 'Runs camera-based monitoring with motion detection and alerting via GPIO' },
      { name: 'Sensor Hub Agent', desc: 'Aggregates I2C/SPI sensor data (temperature, humidity, pressure, distance)' },
      { name: 'Automation Agent', desc: 'Controls actuators, relays, and servos via GPIO for home/workshop automation' },
      { name: 'Edge AI Agent', desc: 'Runs lightweight ML models (TensorFlow Lite, ONNX) for on-device inference' },
    ],
    resources: [
      { label: 'Raspberry Pi 5 Tech Specs', url: 'https://www.raspberrypi.com/products/raspberry-pi-5/' },
      { label: 'Raspberry Pi OS Documentation', url: 'https://www.raspberrypi.com/documentation/computers/os.html' },
      { label: 'Node.js ARM64 Install Guide', url: 'https://nodejs.org/en/download/' },
      { label: 'Systemd Service Guide', url: 'https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html' },
    ],
    longDesc:
      'Raspberry Pi 5 is the perfect single-board computer for running Titan agents as always-on services. With its powerful Cortex-A76 quad-core CPU, up to 8GB RAM, and GPIO connectivity, it can run headless agents for surveillance, sensor aggregation, home automation, or edge AI inference — all as a managed systemd service that auto-starts on boot.',
  },

  'jetson-nano': {
    id: 'jetson-nano',
    name: 'NVIDIA Jetson Nano',
    shortDesc: 'Run Titan agents with GPU-accelerated AI on Jetson Nano',
    icon: <Cpu className="w-8 h-8" />,
    color: '#14B8A6',
    gradient: 'from-teal-500 to-cyan-600',
    heroImage: '🧠',
    specs: [
      { label: 'GPU', value: '128-core Maxwell @ 921MHz' },
      { label: 'CPU', value: 'Quad Cortex-A57 @ 1.43GHz' },
      { label: 'RAM', value: '4GB LPDDR4 (64-bit)' },
      { label: 'Storage', value: 'microSD (16GB+) / NVMe SSD' },
      { label: 'AI Performance', value: '472 GFLOPS (FP16)' },
      { label: 'Connectivity', value: 'Gigabit Ethernet, WiFi/BT (via M.2)' },
      { label: 'Power', value: '5V 4A micro-USB (10W) or DC barrel' },
      { label: 'Video', value: 'CSI camera, HDMI 2.0, 4K encode/decode' },
    ],
    requirements: [
      'Jetson Nano Developer Kit (B01 or newer)',
      '5V 4A power supply (barrel jack recommended for stability)',
      'microSD card (64GB+ UHS-1 recommended) + NVMe SSD (optional but recommended)',
      'Jetson Nano Developer Kit SD Card Image (JetPack)',
      'Network connectivity (Ethernet + optional WiFi module via M.2)',
      'Optional: Raspberry Pi Camera v2 or IMX219-compatible CSI camera',
      'Host machine with SSH client',
    ],
    steps: [
      {
        title: 'Flash JetPack / L4T',
        commands: [
          '# Download Jetson Nano SD Card Image from NVIDIA Developer portal',
          '# Use Balena Etcher or dd to flash to microSD',
          'sudo dd if=jetson-nano-sd-card-image.img of=/dev/sdX bs=4M status=progress',
          '',
          '# Insert microSD, power on Jetson Nano',
          '# Complete initial setup (username, password, WiFi)',
        ],
        note: 'Use the barrel jack power supply (5V 4A) rather than micro-USB for stable operation under load',
      },
      {
        title: 'Install CUDA & Dependencies',
        commands: [
          '# JetPack includes CUDA 10.2+ — verify installation',
          'nvcc --version',
          '/usr/local/cuda/bin/nvcc --version',
          '',
          '# Install Python dependencies for AI agents',
          'sudo apt-get update',
          'sudo apt-get install -y python3-pip python3-dev libopenblas-dev',
          '',
          '# Install PyTorch for Jetson (pre-built wheel)',
          'wget https://developer.download.nvidia.com/compute/redist/jp/v51/pytorch/torch-2.0.0-cp38-cp38-linux_aarch64.whl',
          'pip3 install torch-2.0.0-cp38-cp38-linux_aarch64.whl',
        ],
      },
      {
        title: 'Install Node.js v22 (ARM64)',
        commands: [
          '# Use NodeSource for ARM64',
          'curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -',
          'sudo apt-get install -y nodejs',
          'node --version',
        ],
      },
      {
        title: 'Deploy Titan Agent',
        commands: [
          'mkdir -p ~/titan-agent && cd ~/titan-agent',
          'git clone https://github.com/apifenylabs/titan-agent.git .',
          'npm install --production',
          '',
          '# Configure',
          'cp .env.example .env',
          'nano .env',
        ],
      },
      {
        title: 'Create Systemd Service with GPU Support',
        commands: [
          'sudo nano /etc/systemd/system/titan-agent.service',
          '',
          '[Unit]',
          'Description=Titan Agent - Jetson Nano',
          'After=network.target nvargus-daemon.service',
          '',
          '[Service]',
          'Type=simple',
          'User=jetson',
          'WorkingDirectory=/home/jetson/titan-agent',
          'ExecStart=/usr/bin/node dist/index.js',
          'Restart=always',
          'RestartSec=10',
          'Environment=NODE_ENV=production',
          'Environment=CUDA_HOME=/usr/local/cuda',
          '',
          '[Install]',
          'WantedBy=multi-user.target',
        ],
      },
      {
        title: 'Enable & Verify',
        commands: [
          'sudo systemctl daemon-reload',
          'sudo systemctl enable titan-agent',
          'sudo systemctl start titan-agent',
          'sudo systemctl status titan-agent',
          '',
          '# Check GPU availability from agent logs',
          'journalctl -u titan-agent --no-pager | grep -i "cuda\\|gpu\\|tensor"',
        ],
      },
    ],
    compatibleAgents: [
      { name: 'Vision AI Agent', desc: 'Real-time object detection + classification using CSI camera (YOLO / SSD-MobileNet)' },
      { name: 'Autonomous Rover Agent', desc: 'Controls robot chassis via GPIO/PWM with camera-based navigation and obstacle avoidance' },
      { name: 'Drone AI Agent', desc: 'Onboard flight controller companion — processes video feed, runs waypoint navigation' },
      { name: 'Video Analytics Agent', desc: 'Streams processed video to dashboard with bounding boxes, counting, and alerts' },
    ],
    resources: [
      { label: 'Jetson Nano Developer Kit', url: 'https://developer.nvidia.com/embedded/jetson-nano-developer-kit' },
      { label: 'JetPack SDK Documentation', url: 'https://developer.nvidia.com/embedded/jetpack' },
      { label: 'PyTorch for Jetson', url: 'https://forums.developer.nvidia.com/t/pytorch-for-jetson/72048' },
      { label: 'NVIDIA Jetson AI Courses', url: 'https://developer.nvidia.com/embedded/learn/tutorials' },
    ],
    longDesc:
      'NVIDIA Jetson Nano brings GPU-accelerated AI to edge robotics. With 128 CUDA cores capable of 472 GFLOPS, it can run deep learning models for real-time vision, object detection, path planning, and sensor fusion — all within a 10W power envelope. Perfect for autonomous rovers, drones, and vision-heavy Titan agents.',
  },

  'portenta-h7': {
    id: 'portenta-h7',
    name: 'Arduino Portenta H7',
    shortDesc: 'Deploy Titan skill logic on Arduino Portenta H7 for industrial-grade IoT',
    icon: <CircuitBoard className="w-8 h-8" />,
    color: '#F59E0B',
    gradient: 'from-amber-400 to-orange-500',
    heroImage: '🔧',
    specs: [
      { label: 'MCU', value: 'Dual-core Cortex-M7 @ 480MHz + M4 @ 240MHz' },
      { label: 'RAM', value: '2MB SRAM + 8MB SDRAM' },
      { label: 'Flash', value: '16MB QSPI NOR + 2MB NVM' },
      { label: 'Connectivity', value: 'WiFi (Murata 1DX), BT 5.0, Ethernet' },
      { label: 'IO', value: 'GPIO, I2C, SPI, UART, CAN, USB-C' },
      { label: 'Security', value: 'NXP SE050C crypto chip, secure boot' },
      { label: 'Power', value: '5V USB-C or Li-Po battery' },
      { label: 'Operating Range', value: '-20°C to +85°C (industrial)' },
    ],
    requirements: [
      'Arduino Portenta H7 board',
      'USB-C cable for flashing',
      'Arduino IDE 2.x or Arduino CLI',
      'Titan Agent Bridge — for translating agent commands to Arduino firmware',
      'Portenta-compatible sensor/actuator shields (optional)',
      'M7 core: runs real-time control loops',
      'M4 core: runs Titan communication bridge (WiFi/serial bridge)',
    ],
    steps: [
      {
        title: 'Install Arduino IDE & Board Package',
        commands: [
          '# Download Arduino IDE 2.x from arduino.cc',
          '# Open Arduino IDE → Boards Manager → Search "Portenta H7"',
          '# Install "Arduino Mbed OS Portenta Boards"',
          '',
          '# OR via CLI:',
          'arduino-cli core install arduino:mbed_portenta',
        ],
      },
      {
        title: 'Install Titan Agent Bridge Library',
        commands: [
          '# Search "TitanAgentBridge" in Arduino Library Manager',
          '# Or manually clone:',
          'cd ~/Arduino/libraries',
          'git clone https://github.com/apifenylabs/titan-agent-bridge.git',
        ],
        note: 'The Titan Agent Bridge handles JSON message parsing, serial protocol, and M7/M4 inter-core communication',
      },
      {
        title: 'Flash Titan Firmware',
        commands: [
          '# Open Arduino IDE',
          '# File → Examples → TitanAgentBridge → BasicAgent',
          '',
          '# Configure agent ID and WiFi credentials:',
          '#define AGENT_ID "my-portenta-1"',
          '#define WIFI_SSID "YourNetwork"',
          '#define WIFI_PASS "YourPassword"',
          '#define TITAN_API_URL "https://titan.apifenylabs.com"',
          '',
          '# Select board: Portenta H7 (M7 core)',
          '# Upload via USB-C',
        ],
      },
      {
        title: 'Verify Serial Communication',
        commands: [
          '# Open Serial Monitor (115200 baud)',
          '# Expected:',
          '  [TITAN] Agent initialized: my-portenta-1',
          '  [TITAN] WiFi connected (IP: 192.168.1.42)',
          '  [TITAN] Waiting for Titan Cloud commands...',
        ],
      },
      {
        title: 'Deploy as Standalone (Production)',
        commands: [
          '# Power via USB-C supply or Li-Po battery',
          '# Portenta auto-starts firmware on boot',
          '# Check connectivity via Titan Dashboard',
        ],
      },
    ],
    compatibleAgents: [
      { name: 'Industrial Sensor Agent', desc: 'Reads industrial sensors (temperature, pressure, vibration) over I2C/SPI/CAN bus' },
      { name: 'Motor Control Agent', desc: 'Controls stepper motors, servo actuators, and PID-based motion systems' },
      { name: 'Edge Gateway Agent', desc: 'Bridge between cloud Titan agents and local serial/Modbus field devices' },
      { name: 'Safety Monitor Agent', desc: 'Monitors system health, over-current, over-temperature alerts with hardware watchdog' },
    ],
    resources: [
      { label: 'Portenta H7 Product Page', url: 'https://store.arduino.cc/products/portenta-h7' },
      { label: 'Portenta H7 Datasheet', url: 'https://docs.arduino.cc/hardware/portenta-h7' },
      { label: 'Portenta Pinout Reference', url: 'https://docs.arduino.cc/tutorials/portenta-h7/pinout' },
    ],
    longDesc:
      'The Arduino Portenta H7 is a dual-core industrial microcontroller board. Its Cortex-M7 core runs real-time control loops at 480MHz while the Cortex-M4 handles the Titan communication bridge. Ideal for sensor-heavy IoT agents, motor control systems, and safety-critical monitoring.',
  },

  'esp32-s3': {
    id: 'esp32-s3',
    name: 'ESP32-S3',
    shortDesc: 'Flash Titan skill logic to ESP32-S3 — the ultimate wireless microcontroller',
    icon: <CircuitBoard className="w-8 h-8" />,
    color: '#10B981',
    gradient: 'from-emerald-500 to-green-600',
    heroImage: '📡',
    specs: [
      { label: 'CPU', value: 'Dual-core Xtensa LX7 @ 240MHz' },
      { label: 'RAM', value: '512KB SRAM + 8MB PSRAM (optional)' },
      { label: 'Flash', value: '16MB (QSPI)' },
      { label: 'Connectivity', value: 'WiFi 2.4GHz 802.11b/g/n, BT 5.0 LE' },
      { label: 'AI Accelerator', value: 'Vector extensions (SIMD) for ML inference' },
      { label: 'GPIO', value: '45 programmable GPIOs, USB OTG' },
      { label: 'Peripherals', value: 'I2C, SPI, UART, I2S, CAN (TWAI), LCD, Camera' },
      { label: 'Power', value: '3.3V, deep sleep ~5uA' },
    ],
    requirements: [
      'ESP32-S3 dev board (ESP32-S3-DevKitC-1 or similar)',
      'USB-C cable for flashing',
      'PlatformIO IDE or ESP-IDF command line',
      'Titan Agent Lite — lightweight C++ firmware for ESP32',
      'WiFi network with internet access',
    ],
    steps: [
      {
        title: 'Install PlatformIO & Toolchain',
        commands: [
          'python3 -c "$(curl -fsSL https://raw.githubusercontent.com/platformio/platformio/master/scripts/get-platformio.py)"',
          'pio --version',
        ],
      },
      {
        title: 'Clone Titan Agent Lite Firmware',
        commands: [
          'git clone https://github.com/apifenylabs/titan-agent-lite.git',
          'cd titan-agent-lite',
          'pio project init --board esp32-s3-devkitc-1',
        ],
      },
      {
        title: 'Configure WiFi & Agent Settings',
        commands: [
          'nano src/config.h',
          '# Set TITAN_AGENT_ID, WIFI_SSID, WIFI_PASS, TITAN_API_URL',
        ],
      },
      {
        title: 'Compile & Flash',
        commands: [
          'pio run',
          'pio run --target upload',
          'pio device monitor --baud 115200',
        ],
        note: 'Hold BOOT + press RESET on first flash to enter download mode',
      },
      {
        title: 'Verify WebSocket Connection',
        commands: [
          '# Expect:',
          '  [TITAN] WebSocket connected! Agent registered as "esp32-s3-alpha"',
        ],
      },
      {
        title: 'Configure Deep Sleep (Battery Optimization)',
        commands: [
          '#define ENABLE_DEEP_SLEEP true',
          '#define SLEEP_INTERVAL_SEC 300',
          'pio run --target upload',
        ],
        note: 'Deep sleep draws ~5uA — months of battery-powered operation',
      },
    ],
    compatibleAgents: [
      { name: 'Wireless Sensor Node', desc: 'Battery-powered environmental monitoring (temp, humidity, pressure, air quality)' },
      { name: 'BLE Beacon Agent', desc: 'Bluetooth LE advertising for proximity-aware trigger agents' },
      { name: 'IoT Button / Actuator', desc: 'Physical button or relay control via Titan cloud command' },
      { name: 'Smart Display Agent', desc: 'LCD screen agent showing agent status, analytics, or notifications' },
    ],
    resources: [
      { label: 'ESP32-S3 Datasheet', url: 'https://www.espressif.com/sites/default/files/documentation/esp32-s3_datasheet_en.pdf' },
      { label: 'ESP-IDF Programming Guide', url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32s3/' },
      { label: 'PlatformIO ESP32-S3 Docs', url: 'https://docs.platformio.org/en/latest/boards/espressif32/esp32-s3-devkitc-1.html' },
    ],
    longDesc:
      'The ESP32-S3 combines dual-core LX7 processing with WiFi + BLE 5.0 in a low-power package. Titan Agent Lite firmware gives it a WebSocket connection to the Titan cloud, turning it into a wireless agent that can read sensors, control relays, drive displays, and deep-sleep for months on battery.',
  },

  'titan-rover-pro': {
    id: 'titan-rover-pro',
    name: 'Titan Rover Pro',
    shortDesc: 'The official Titan robotics platform — 4WD rover with onboard AI compute',
    icon: <Cog className="w-8 h-8" />,
    color: '#6366F1',
    gradient: 'from-indigo-500 to-blue-600',
    heroImage: '🚙',
    specs: [
      { label: 'Chassis', value: '4WD differential-steer, 4x4 off-road suspension' },
      { label: 'Compute', value: 'Raspberry Pi 5 (8GB) + ESP32-S3 co-processor' },
      { label: 'Camera', value: 'Raspberry Pi Camera Module 3 (12MP, wide angle)' },
      { label: 'Sensors', value: 'LiDAR (TF-Luna), IMU (MPU6050), ultrasonic, encoder odometry' },
      { label: 'Motor Drivers', value: 'Dual TB6612FNG (2x1.2A per channel)' },
      { label: 'Battery', value: '3S Li-Po 2200mAh (11.1V), ~45 min runtime' },
      { label: 'Connectivity', value: 'WiFi 5, BLE 5.0, optional 4G/LTE hat' },
      { label: 'Dimensions', value: '300x250x150mm, 1.8kg (with battery)' },
    ],
    requirements: [
      'Titan Rover Pro kit (chassis, motors, wheels, suspension)',
      'Raspberry Pi 5 (8GB) + microSD (64GB)',
      'Raspberry Pi Camera Module 3',
      'ESP32-S3 breakout board',
      'TF-Luna LiDAR sensor (8m range)',
      'MPU6050 IMU (I2C)',
      '3S Li-Po battery 2200mAh + charger',
      'TB6612FNG dual motor driver or L298N',
    ],
    steps: [
      {
        title: 'Assemble Chassis',
        commands: [
          '# 1. Mount motors to chassis plate (4x M3 screws per motor)',
          '# 2. Attach wheels to motor shafts (grub screw tight)',
          '# 3. Install suspension arms (spring + damper per wheel)',
          '# 4. Mount Raspberry Pi 5 (standoffs, bottom plate)',
          '# 5. Mount ESP32-S3 on the breadboard area',
          '# 6. Route motor wires to driver board',
          '# 7. Wire power distribution:',
          '   Battery -> UBEC (5V 3A) -> RPi 5 (GPIO 5V / GND)',
          '   Battery -> Motor Driver (VMOT)',
          '   RPi 5 5V -> ESP32-S3 (VIN)',
        ],
        note: 'Refer to the Titan Rover Pro assembly manual for torque specs and cable routing diagrams',
      },
      {
        title: 'Flash Co-processor (ESP32-S3)',
        commands: [
          '# The ESP32-S3 handles low-level motor PWM + sensor polling',
          'git clone https://github.com/apifenylabs/titan-rover-firmware.git',
          'cd titan-rover-firmware',
          'pio run --target upload',
          '',
          '# Verify serial output (115200 baud):',
          '  [ROVER] ESP32-S3 Co-processor v1.0',
          '  [ROVER] Motor driver initialized',
          '  [ROVER] IMU calibrated',
          '  [ROVER] LiDAR sensor OK',
        ],
      },
      {
        title: 'Configure RPi 5 as Main Compute',
        commands: [
          '# Follow Raspberry Pi 5 guide first, then:',
          'sudo apt-get install -y python3-opencv python3-picamera2',
          '',
          'git clone https://github.com/apifenylabs/titan-rover-agent.git',
          'cd titan-rover-agent',
          'npm install',
          '',
          '# Configure:',
          '#   TITAN_AGENT_ID="titan-rover-pro-1"',
          '#   ROVER_MODE="autonomous"',
          '#   ESP32_UART_PORT="/dev/ttyAMA0"',
        ],
      },
      {
        title: 'Start Rover Agent',
        commands: [
          'npm run start:rover',
          '',
          '# Expected:',
          '  [TITAN ROVER] ESP32 co-processor connected',
          '  [TITAN ROVER] LiDAR: 8m range OK',
          '  [TITAN ROVER] Camera: 640x480@30fps',
          '  [TITAN ROVER] Ready -- switch to Autonomous mode from Dashboard',
        ],
      },
      {
        title: 'Test Autonomous Navigation',
        commands: [
          '# From Titan Dashboard, send:',
          '{"action":"navigate","waypoints":[',
          '  {"x":1.5,"y":0,"heading":0},',
          '  {"x":1.5,"y":1.5,"heading":90}',
          ']}',
        ],
        note: 'Requires a clear test area of at least 3m x 3m',
      },
    ],
    compatibleAgents: [
      { name: 'Autonomous Patrol Agent', desc: 'Navigates waypoint routes autonomously with obstacle avoidance via LiDAR' },
      { name: 'Search & Rescue Agent', desc: 'Camera-based human detection with GPS waypoint logging and alert relay' },
      { name: 'Delivery Agent', desc: 'Follows path to delivery points, drops payload via servo mechanism' },
      { name: 'Mapping Agent', desc: 'Builds 2D occupancy grid maps using LiDAR + encoder odometry (SLAM)' },
    ],
    resources: [
      { label: 'Titan Rover Pro Assembly Guide', url: 'https://docs.apifenylabs.com/rover-pro/assembly' },
      { label: 'TF-Luna LiDAR Datasheet', url: 'https://www.benewake.com/en/tfluna.html' },
      { label: 'ROS2 Navigation Stack', url: 'https://docs.nav2.org/' },
    ],
    longDesc:
      'Titan Rover Pro is the official Titan robotics platform — a 4WD rover with off-road suspension, LiDAR, IMU, camera, and dual-compute architecture (RPi 5 + ESP32-S3). Runs a complete stack from low-level motor control to high-level autonomous navigation. Perfect for patrol, search and rescue, mapping, and delivery agents.',
  },

  'titan-robotic-arm': {
    id: 'titan-robotic-arm',
    name: 'Titan Robotic Arm',
    shortDesc: 'Precision robotic arm with 6-DOF for pick-and-place, assembly & lab automation',
    icon: <Cog className="w-8 h-8" />,
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    heroImage: '🦾',
    specs: [
      { label: 'Degrees of Freedom', value: '6 (waist, shoulder, elbow, wrist roll, wrist pitch, gripper)' },
      { label: 'Reach', value: '400mm from base center' },
      { label: 'Payload', value: '500g (full reach), 1kg (reduced reach)' },
      { label: 'Motors', value: '6x NEMA-17 stepper + harmonic drive gearing' },
      { label: 'Position Accuracy', value: '±0.5mm at full extension' },
      { label: 'Gripper', value: 'Parallel-jaw with force sensing + interchangeable fingers' },
      { label: 'Controller', value: 'ESP32-S3 (motion planning) + Raspberry Pi 5 (vision + agent logic)' },
      { label: 'Power', value: '12V 5A DC adapter (60W)' },
    ],
    requirements: [
      'Titan Robotic Arm kit (6-DOF arm, base, gripper, controller board)',
      'Raspberry Pi 5 (4GB+) for vision processing and Titan agent logic',
      'ESP32-S3 controller board (included in kit)',
      'Raspberry Pi Camera Module 3 (for vision-guided operations)',
      '12V 5A DC power supply',
      'Calibration target (included) and flat workspace',
      'Optional: conveyor belt accessory for production line simulation',
    ],
    steps: [
      {
        title: 'Assemble Arm Hardware',
        commands: [
          '# 1. Mount base plate to work surface (4x M4 bolts)',
          '# 2. Attach waist joint to base (6x M3 countersunk)',
          '# 3. Assemble shoulder + upper arm section',
          '# 4. Attach elbow joint + forearm',
          '# 5. Assemble wrist (roll + pitch) subassembly',
          '# 6. Mount gripper to wrist pitch',
          '# 7. Route cable chain through each joint',
          '# 8. Connect servo/stepper cables to ESP32 controller board',
        ],
        note: 'Apply thread-locker (Loctite 242) to all M3/M4 fasteners. Do NOT over-tighten harmonic drive set-screws.',
      },
      {
        title: 'Wire Electronics',
        commands: [
          '# ESP32-S3 Controller Board Pinout:',
          '  WAIST    = STEP/STEP1, DIR/DIR1, EN/EN1   (GPIO 1-3)',
          '  SHOULDER = STEP/STEP2, DIR/DIR2, EN/EN2   (GPIO 4-6)',
          '  ELBOW    = STEP/STEP3, DIR/DIR3, EN/EN3   (GPIO 7-9)',
          '  WRIST_R  = STEP/STEP4, DIR/DIR4, EN/EN4   (GPIO 10-12)',
          '  WRIST_P  = STEP/STEP5, DIR/DIR5, EN/EN5   (GPIO 13-15)',
          '  GRIPPER  = SERVO_PWM                       (GPIO 16)',
          '',
          '# Power:',
          '  12V DC -> Motor Driver VMOT',
          '  12V DC -> 5V BEC -> RPi 5 (GPIO 5V/GND)',
          '  RPi 5 UART TX/RX -> ESP32-S3 UART RX/TX',
        ],
      },
      {
        title: 'Flash Arm Controller Firmware (ESP32-S3)',
        commands: [
          'git clone https://github.com/apifenylabs/titan-arm-firmware.git',
          'cd titan-arm-firmware',
          '',
          '# Calibrate joint limits before first use:',
          'pio run -e calibrate --target upload',
          '# Follow serial prompts to set min/max angles for each joint',
          '',
          '# Flash production firmware:',
          'pio run -e production --target upload',
        ],
        note: 'Calibration is critical. The arm uses absolute position mode and will not move without valid joint limits',
      },
      {
        title: 'Install Titan Arm Agent (RPi 5)',
        commands: [
          '# Clone arm agent (includes inverse kinematics + vision pipeline):',
          'git clone https://github.com/apifenylabs/titan-arm-agent.git',
          'cd titan-arm-agent',
          'npm install',
          'pip3 install -r requirements.txt  # OpenCV, MediaPipe',
          '',
          '# Configure:',
          'cp .env.example .env',
          'nano .env',
          '#   TITAN_AGENT_ID="titan-arm-1"',
          '#   ARM_SERIAL_PORT="/dev/ttyAMA0"',
          '#   CAMERA_INDEX=0',
        ],
      },
      {
        title: 'Calibrate Workspace',
        commands: [
          '# Run calibration utility:',
          'npm run calibrate',
          '',
          '# This will:',
          '#  1. Move each joint through its full range (verify limits)',
          '#  2. Home the arm to a known zero position',
          '#  3. Prompt for end-effector offset measurement',
          '#  4. Save calibration to arm_calibration.json',
          '',
          '# Verify with test pose:',
          'npm run test-pose -- --x 150 --y 0 --z 200',
        ],
      },
      {
        title: 'Start Arm Agent & Deploy Skills',
        commands: [
          'npm run start',
          '',
          '# From Titan Dashboard, deploy skill:',
          '# Dashboard -> Robotics -> titan-arm-1 -> Deploy Skill',
          '#   "pick_place" - basic pick-and-place',
          '#   "sort_by_color" - vision-guided sorting',
          '#   "stack_blocks" - precision stacking',
          '',
          '# Or send direct command:',
          '{"action":"pick_and_place",',
          ' "pick": {"x":100,"y":50,"z":0},',
          ' "place": {"x":-100,"y":-50,"z":25}}',
        ],
      },
    ],
    compatibleAgents: [
      { name: 'Pick & Place Agent', desc: 'Detects objects via camera and executes pick-and-place with configurable drop zones' },
      { name: 'Inspection Agent', desc: 'Positions camera over parts for defect detection and measurement verification' },
      { name: 'Assembly Agent', desc: 'Precision assembly sequences — insert, press, rotate, and join components' },
      { name: 'Lab Automation Agent', desc: 'Automated pipetting, vial capping, plate sealing for lab workflows' },
    ],
    resources: [
      { label: 'Titan Robotic Arm Assembly Guide', url: 'https://docs.apifenylabs.com/robotic-arm/assembly' },
      { label: 'Inverse Kinematics Reference (D-H params)', url: 'https://docs.apifenylabs.com/robotic-arm/kinematics' },
      { label: 'Computer Vision for Robotics (MediaPipe)', url: 'https://developers.google.com/mediapipe' },
    ],
    longDesc:
      'The Titan Robotic Arm is a 6-degree-of-freedom precision manipulator designed for pick-and-place, assembly, inspection, and lab automation. Controlled by an ESP32-S3 motion controller with a Raspberry Pi 5 for vision inference and Titan agent logic. Achieves ±0.5mm position accuracy with harmonic drive gearing and features a force-sensing parallel-jaw gripper for delicate object handling.',
  },
};

// ─── All platform guides ───────────────────────────────────────────
const COMPLETE_GUIDES = PLATFORM_GUIDES;

// ─── UI Components ─────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 24 } as const,
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

function CodeBlock({ commands }: { commands: string[] }) {
  return (
    <div className="relative group mt-2 mb-4">
      <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/80">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/30">
          <Terminal className="w-3.5 h-3.5 text-slate-500" />
          <button
            onClick={() => {
              navigator.clipboard.writeText(commands.filter(l => !l.startsWith('#')).join('\n'));
            }}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Copy
          </button>
        </div>
        <pre className="p-4 text-xs leading-relaxed font-mono text-slate-300 overflow-x-auto">
          {commands.map((line, i) => (
            <div key={i} className={line.startsWith('#') ? 'text-slate-500 italic' : ''}>
              {line || '\u00A0'}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function SpecTable({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {specs.map((s) => (
        <div
          key={s.label}
          className="flex justify-between items-center px-4 py-2.5 rounded-lg"
          style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(51, 65, 85, 0.5)' }}
        >
          <span className="text-xs font-medium text-slate-400">{s.label}</span>
          <span className="text-xs font-semibold text-slate-200 text-right">{s.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────

export default function PlatformGuidePage() {
  const params = useParams();
  const router = useRouter();
  const platformId = params?.platform as string;
  const guide = COMPLETE_GUIDES[platformId];

  // Redirect to landing if platform not found
  React.useEffect(() => {
    if (!guide) {
      router.replace('/robotics');
    }
  }, [guide, router]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://titan.apifeny.com' },
      { '@type': 'ListItem', position: 2, name: 'Robotics', item: 'https://titan.apifeny.com/robotics' },
      { '@type': 'ListItem', position: 3, name: guide.name, item: `https://titan.apifeny.com/robotics/${guide.id}` },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Platform Nav Bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3 h-14 overflow-x-auto scrollbar-none">
            <Link
              href="/robotics"
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>

            <div className="w-px h-6 bg-slate-700/50 shrink-0" />

            <div className="flex gap-1 overflow-x-auto">
              {ALL_PLATFORMS.map((p) => {
                const isActive = p.id === platformId;
                return (
                  <Link
                    key={p.id}
                    href={`/robotics/${p.id}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-slate-700/60 text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                    style={isActive ? { borderColor: p.color, borderWidth: 1 } : {}}
                  >
                    <span style={{ color: p.color }}>{p.icon}</span>
                    {p.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-12 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="flex flex-col md:flex-row md:items-center gap-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${guide.color}25, transparent)`,
                    color: guide.color,
                  }}
                >
                  {guide.icon}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    {guide.name}
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">{guide.shortDesc}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                {guide.longDesc}
              </p>
            </div>

            <div className="shrink-0">
              <div className="text-7xl text-center">{guide.heroImage}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Specs ──────────────────────────────────────────────── */}
      <section className="pb-12 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-lg font-bold mb-4 flex items-center gap-2"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeIn}
          >
            <Server className="w-4 h-4 text-slate-500" />
            Hardware Specifications
          </motion.h2>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeIn}
          >
            <SpecTable specs={guide.specs} />
          </motion.div>
        </div>
      </section>

      {/* ── Requirements ───────────────────────────────────────── */}
      <section className="pb-12 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-lg font-bold mb-4 flex items-center gap-2"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeIn}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Requirements
          </motion.h2>
          <motion.div
            className="grid sm:grid-cols-2 gap-2"
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeIn}
          >
            {guide.requirements.map((req, i) => (
              <div
                key={i}
                className="flex items-start gap-2 px-4 py-2.5 rounded-lg"
                style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(51, 65, 85, 0.5)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: guide.color }} />
                <span className="text-xs text-slate-300 leading-relaxed">{req}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Step-by-Step Guide ─────────────────────────────────── */}
      <section className="pb-12 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-lg font-bold mb-6 flex items-center gap-2"
            initial="hidden"
            animate="visible"
            custom={5}
            variants={fadeIn}
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            Step-by-Step Deployment Guide
          </motion.h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-[11px] top-3 bottom-3 w-0.5 opacity-20"
              style={{ background: guide.color }}
            />

            <div className="space-y-6">
              {guide.steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative pl-10"
                  initial="hidden"
                  animate="visible"
                  custom={6 + i}
                  variants={fadeIn}
                >
                  {/* Step circle */}
                  <div
                    className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold border"
                    style={{
                      background: `linear-gradient(135deg, ${guide.color}30, transparent)`,
                      borderColor: `${guide.color}50`,
                      color: guide.color,
                    }}
                  >
                    {i + 1}
                  </div>

                  <div
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(51, 65, 85, 0.4)' }}
                  >
                    <h3 className="text-sm font-bold mb-2">{step.title}</h3>

                    {step.commands && step.commands.length > 0 && (
                      <CodeBlock commands={step.commands} />
                    )}

                    {step.note && (
                      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-900/20 border border-amber-700/30">
                        <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                        <p className="text-xs text-amber-300 leading-relaxed">{step.note}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Compatible Agents ──────────────────────────────────── */}
      <section className="pb-12 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-lg font-bold mb-4 flex items-center gap-2"
            initial="hidden"
            animate="visible"
            custom={50}
            variants={fadeIn}
          >
            <Brain className="w-4 h-4 text-purple-400" />
            Compatible Agent Types
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {guide.compatibleAgents.map((agent, i) => (
              <motion.div
                key={i}
                className="rounded-xl p-4 transition-all hover:brightness-110"
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(51, 65, 85, 0.5)',
                }}
                initial="hidden"
                animate="visible"
                custom={51 + i}
                variants={fadeIn}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: guide.color }}
                  />
                  <h3 className="text-sm font-bold">{agent.name}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed ml-4">{agent.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources ─────────────────────────────────────────── */}
      <section className="pb-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-lg font-bold mb-4 flex items-center gap-2"
            initial="hidden"
            animate="visible"
            custom={60}
            variants={fadeIn}
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            Resources & Links
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-2">
            {guide.resources.map((r, i) => (
              <motion.a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all group"
                style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  border: '1px solid rgba(51, 65, 85, 0.4)',
                }}
                initial="hidden"
                animate="visible"
                custom={61 + i}
                variants={fadeIn}
              >
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {r.label}
                </span>
                <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
