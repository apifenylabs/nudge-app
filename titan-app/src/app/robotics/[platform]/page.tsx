'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Cpu, CircuitBoard, Radio, Monitor, Rocket, ChevronLeft, ChevronRight,
  CheckCircle2, Terminal, Wifi, Bot, HardDrive, ArrowLeft, Copy,
  Zap, Play, BookOpen, Clock, Activity, Signal,
} from 'lucide-react';

// ─-- Types --─────────────────────────────────────────────────────────────

interface PlatformDetail {
  id: string;
  name: string;
  icon: typeof Cpu;
  color: string;
  badge: string;
  description: string;
  longDescription: string;
  status: 'online' | 'beta' | 'maintenance';
  hardware: { item: string; optional?: boolean }[];
  setupSteps: { title: string; detail: string }[];
  codeSnippet: { title: string; language: string; code: string };
  capabilities?: string[];
}

// ─-- Platform Details Dictionary --──────────────────────────────────────

const PLATFORM_DETAILS: Record<string, PlatformDetail> = {
  'raspberry-pi': {
    id: 'raspberry-pi',
    name: 'Weather Station RPi',
    icon: Monitor,
    color: '#F59E0B',
    badge: 'Single-Board',
    description: 'Run your Titan agent as a persistent systemd service on a Raspberry Pi.',
    longDescription:
      'Deploy Titan as a fully managed systemd service on any Raspberry Pi 3B+, 4, or 5. Your agent gains access to CSI camera, GPIO pins via PiGPIO, I²C sensors, and Wi-Fi/BT mesh networking. The agent pings Titan Cloud with health metrics every 30s and auto-restarts on failure.',
    status: 'online',
    hardware: [
      { item: 'Raspberry Pi 4 or 5 (4 GB+ RAM recommended)' },
      { item: 'MicroSD card (32 GB+, Class A2)' },
      { item: '5V 3A USB-C power supply' },
      { item: 'DHT22 temperature/humidity sensor' },
      { item: 'BMP280 barometric pressure sensor' },
      { item: 'Optional: Raspberry Pi Camera Module 3' },
      { item: 'Optional: 7" touch display or small OLED (SSD1306)' },
      { item: 'Jumper wires + breadboard' },
    ],
    setupSteps: [
      {
        title: 'Flash Raspberry Pi OS',
        detail:
          'Use Raspberry Pi Imager to flash the 64-bit Lite OS to your SD card. Enable SSH and configure Wi-Fi during flashing. Insert the card and boot.',
      },
      {
        title: 'Install Titan Agent',
        detail:
          'SSH into your Pi and run: curl -fsSL https://titan.dev/install | sudo bash. This installs the Titan agent as a systemd service with auto-start enabled.',
      },
      {
        title: 'Wire Up Sensors',
        detail:
          'Connect DHT22 (data → GPIO4, VCC → 3.3V, GND → GND) and BMP280 (SDA → GPIO2, SCL → GPIO3, VCC → 3.3V, GND → GND) on the breadboard.',
      },
      {
        title: 'Configure Weather Station Skill',
        detail:
          'Run titan skill add weather-station to download the Weather Station skill pack. Edit config.yaml to set your sensor pins and upload interval.',
      },
      {
        title: 'Start & Verify',
        detail:
          'Restart the service with sudo systemctl restart titan-agent. Check logs with journalctl -u titan-agent -f. You should see sensor readings streaming every 5 seconds.',
      },
    ],
    codeSnippet: {
      title: 'Sensor Reading Loop (Python)',
      language: 'python',
      code: `import board
import adafruit_dht
import adafruit_bmp280
from titan_agent import TitanAgent

dht = adafruit_dht.DHT22(board.D4)
bmp = adafruit_bmp280.Adafruit_BMP280_I2C(board.I2C())
agent = TitanAgent()

while True:
    temp = dht.temperature
    humidity = dht.humidity
    pressure = bmp.pressure

    agent.publish("sensors/weather", {
        "temperature": round(temp, 1),
        "humidity": round(humidity, 1),
        "pressure": round(pressure, 1),
        "timestamp": agent.now()
    })

    agent.sleep(5)  # seconds`,
    },
    capabilities: ['systemd service', 'CSI camera', 'GPIO + HATs', 'WiFi/BT mesh'],
  },

  'arduino': {
    id: 'arduino',
    name: 'Servo Arm Controller',
    icon: Cpu,
    color: '#10B981',
    badge: 'Microcontroller',
    description: 'Flash agent logic directly to Arduino or ESP32 for real-time control.',
    longDescription:
      'Compile your Titan skills to optimized C++ sketches for Arduino and ESP32 platforms. Drive servo motors, read analog sensors, and control relays with deterministic timing. Supports I²C, SPI, and UART for expansion. Ideal for robotic arms, CNC, and closed-loop actuator control.',
    status: 'online',
    hardware: [
      { item: 'Arduino Uno R3, Mega 2560, or ESP32 DevKit' },
      { item: 'USB cable (USB-A to USB-B or USB-C)' },
      { item: 'SG90 or MG996R servo motors (up to 6)' },
      { item: '10kΩ potentiometer (for manual angle control)' },
      { item: '5V 2A power supply (for servos)' },
      { item: 'Optional: PCA9685 servo driver (for >6 servos)' },
      { item: 'Jumper wires + breadboard' },
    ],
    setupSteps: [
      {
        title: 'Install Arduino IDE & Titan SDK',
        detail:
          'Download the Arduino IDE and install the Titan SDK via Library Manager (Search: "Titan Agent"). Select your board under Tools → Board → Arduino AVR Boards.',
      },
      {
        title: 'Wire the Servo Arm',
        detail:
          'Connect servo signal wires to PWM pins (D9–D11). Power servos from the 5V rail — do not draw from the Arduino 5V pin if running more than 2 servos. Use an external 5V supply.',
      },
      {
        title: 'Write the Control Sketch',
        detail:
          'Open the Titan Servo example: File → Examples → TitanAgent → ServoArm. This sets up a serial command parser that accepts angle commands over USB or Bluetooth (ESP32).',
      },
      {
        title: 'Configure Skill Parameters',
        detail:
          'Set SERVO_COUNT to match your arm joints, MIN_ANGLE / MAX_ANGLE for each servo, and SERIAL_BAUD to 115200. Save and upload to the board.',
      },
      {
        title: 'Test & Calibrate',
        detail:
          'Open the Serial Monitor (Ctrl+Shift+M). Send "MOVE 0 90" to move servo 0 to 90°. Send "GRIP 50" to set gripper width. The arm responds with joint angles in real-time.',
      },
    ],
    codeSnippet: {
      title: 'Servo Control (Arduino C++)',
      language: 'cpp',
      code: `#include <TitanAgent.h>
#include <Servo.h>

#define SERVO_COUNT 4
Servo servos[SERVO_COUNT];
int angles[SERVO_COUNT];
TitanAgent agent(Serial);

void setup() {
    Serial.begin(115200);
    int pins[SERVO_COUNT] = {9, 10, 11, 6};
    for (int i = 0; i < SERVO_COUNT; i++) {
        servos[i].attach(pins[i]);
        angles[i] = 90;
        servos[i].write(angles[i]);
    }
    agent.onCommand(handleCommand);
}

void handleCommand(String cmd) {
    // Parse: "MOVE <servo_idx> <angle>"
    if (cmd.startsWith("MOVE")) {
        int idx = cmd.substring(5, 6).toInt();
        int angle = cmd.substring(7).toInt();
        if (idx >= 0 && idx < SERVO_COUNT) {
            angles[idx] = constrain(angle, 0, 180);
            servos[idx].write(angles[idx]);
            agent.telemetry("servo/angle", idx, angles[idx]);
        }
    }
}

void loop() {
    agent.update();
    delay(20);  // 50 Hz control loop
}`,
    },
    capabilities: ['GPIO control', 'I²C/SPI/UART', 'Sensor fusion', 'Low-power mode'],
  },

  'ros2': {
    id: 'ros2',
    name: 'Warehouse Rover',
    icon: CircuitBoard,
    color: '#14B8A6',
    badge: 'Robot OS',
    description: 'Deploy as distributed ROS2 nodes with full topic/pub-sub integration.',
    longDescription:
      'Integrate your Titan agent into any ROS2 ecosystem (Humble or Iron). Your agent subscribes to camera, lidar, and odometry topics, runs real-time inference on the edge, and publishes control commands through ROS2 action servers. Supports node lifecycle management, TF transforms, and multi-robot coordination.',
    status: 'online',
    hardware: [
      { item: 'Robot chassis with differential drive (e.g., ROSbot, TurtleBot 4)' },
      { item: 'RPLiDAR A1 or A2 360° laser scanner' },
      { item: 'Intel RealSense D435 or OAK-D depth camera' },
      { item: 'Onboard computer: Jetson Orin Nano or Raspberry Pi 5' },
      { item: 'IMU (MPU6050 or BNO055) placed at robot center' },
      { item: 'Lithium-ion battery pack (12V, 5000 mAh+)' },
      { item: 'Wi-Fi 6 USB adapter (for high-bandwidth telemetry)' },
    ],
    setupSteps: [
      {
        title: 'Install ROS2 Humble & Dependencies',
        detail:
          'Follow the ROS2 Humble installation guide. Install Nav2, rplidar_ros, realsense2_camera, and tf2. Create a workspace at ~/titan_ws/src.',
      },
      {
        title: 'Install Titan ROS2 Bridge',
        detail:
          'Run pip install titan-ros2-bridge. This installs a ROS2 node that connects Titan agent topics to your ROS2 graph. Launch with ros2 run titan_bridge titan_node.',
      },
      {
        title: 'Configure Sensor Topics',
        detail:
          'Edit titan_config.yaml to map your sensor topics: /camera/color/image_raw, /scan (lidar), /odom. Set the inference model to "warehouse_obstacle_v2" with confidence threshold 0.65.',
      },
      {
        title: 'Set Up Navigation Stack',
        detail:
          'Launch Nav2 with your robot URDF. The Titan node provides an AI-driven global planner that replaces Nav2\'s default. Use ros2 launch titan_bridge navigation.launch.py.',
      },
      {
        title: 'Run Multi-Robot Demo',
        detail:
          'Launch the Titan coordination node: ros2 run titan_bridge fleet_manager. This discovers other robots on the network via DDS and coordinates lane assignments. Agents communicate via /fleet/status and /fleet/commands.',
      },
    ],
    codeSnippet: {
      title: 'ROS2 Subscriber / Publisher (Python)',
      language: 'python',
      code: `import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan, Image
from geometry_msgs.msg import Twist
from titan_ros2 import TitanInferenceNode

class WarehouseRover(Node):
    def __init__(self):
        super().__init__('titan_warehouse_rover')
        self.sub_scan = self.create_subscription(
            LaserScan, '/scan', self.scan_callback, 10)
        self.sub_cam = self.create_subscription(
            Image, '/camera/color/image_raw', self.cam_callback, 10)
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.titan = TitanInferenceNode(self)

    def scan_callback(self, msg: LaserScan):
        obstacles = [r for r in msg.ranges if r < 0.5]
        if obstacles:
            cmd = Twist()
            cmd.angular.z = 0.5  # turn
            self.pub_cmd.publish(cmd)

    def cam_callback(self, msg: Image):
        detections = self.titan.infer(msg, model='warehouse_v2')
        for d in detections:
            self.get_logger().info(f'Detected: {d.label} ({d.confidence:.2f})')

def main(args=None):
    rclpy.init(args=args)
    node = WarehouseRover()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()`,
    },
    capabilities: ['Topic pub-sub', 'Node lifecycle', 'TF transforms', 'Action servers'],
  },

  'esp32': {
    id: 'esp32',
    name: 'Factory Bridge',
    icon: Radio,
    color: '#7C3AED',
    badge: 'IoT Gateway',
    description: 'Connect industrial sensors and relays to your Titan cloud via ESP32.',
    longDescription:
      'Use the ESP32 as a factory-floor IoT bridge. Read Modbus RTU sensors, control solid-state relays, and stream telemetry over Wi-Fi or Ethernet. Titan skills run on-device for low-latency decisions and relay to the cloud for analytics. Supports OTA firmware updates and watchdog recovery.',
    status: 'online',
    hardware: [
      { item: 'ESP32 DevKit (ESP32-WROOM-32 or ESP32-S3)' },
      { item: 'RS485 to TTL converter module (MAX485)' },
      { item: 'Modbus temperature / humidity sensor (industrial grade)' },
      { item: '2-channel solid-state relay module (5V trigger)' },
      { item: '24V DC power supply (for sensors)' },
      { item: 'Push button (for manual override)' },
      { item: 'Optional: ENC28J60 Ethernet module' },
    ],
    setupSteps: [
      {
        title: 'Install ESP32 Toolchain',
        detail:
          'Install PlatformIO (recommended) or ESP-IDF. Create a new project, add the TitanAgent library via platformio.ini: lib_deps = titan/TitanAgent',
      },
      {
        title: 'Wire the Modbus Sensor Network',
        detail:
          'Connect the MAX485 to ESP32: RO→GPIO16, DI→GPIO17, DE/RE→GPIO4. Wire the 24V Modbus sensor to the RS485 A/B lines with proper termination (120Ω resistor).',
      },
      {
        title: 'Write the Bridge Firmware',
        detail:
          'Use the Titan Modbus example to scan slaves, read holding registers, and publish to MQTT. Configure the Modbus slave ID (default: 1) and register map for your sensor.',
      },
      {
        title: 'Configure Cloud Relay',
        detail:
          'Connect to the Titan cloud via WebSocket. Set the relay rules — e.g., "if temp > 85°C, energize relay 1 (cooling fan)". These rules execute locally on the ESP32 even if the cloud is unreachable.',
      },
      {
        title: 'Deploy via OTA & Monitor',
        detail:
          'Upload the firmware over-the-air by running titan ota push esp32-factory-bridge. Use the Titan dashboard to view real-time sensor graphs and relay states.',
      },
    ],
    codeSnippet: {
      title: 'Modbus to MQTT Bridge (C++)',
      language: 'cpp',
      code: `#include <TitanAgent.h>
#include <ModbusMaster.h>

#define RS485_DE_RE 4
#define MODBUS_SLAVE_ID 1

ModbusMaster sensor;
TitanAgent agent("factory-bridge-01");

void setup() {
    Serial.begin(115200);
    Serial2.begin(9600, SERIAL_8N1, 16, 17);
    sensor.begin(MODBUS_SLAVE_ID, Serial2);
    pinMode(RS485_DE_RE, OUTPUT);
    digitalWrite(RS485_DE_RE, HIGH);

    agent.connect("ssl://cloud.titan.dev:8883");
    agent.onActuator("relay/1", [](bool state) {
        digitalWrite(32, state ? HIGH : LOW);
    });
}

void loop() {
    uint8_t result;
    uint16_t registers[6];

    digitalWrite(RS485_DE_RE, HIGH);  // transmit
    result = sensor.readHoldingRegisters(0, 6);
    digitalWrite(RS485_DE_RE, LOW);   // receive

    if (result == sensor.ku8MBSuccess) {
        float temp = registers[0] / 10.0f;
        float hum  = registers[2] / 10.0f;

        agent.publish("factory/temperature", temp);
        agent.publish("factory/humidity", hum);

        if (temp > 85.0f) agent.actuate("relay/1", true);
    }

    agent.loop();
    delay(1000);
}`,
    },
    capabilities: ['Modbus RTU', 'MQTT bridge', 'OTA updates', 'Watchdog recovery'],
  },

  'drone': {
    id: 'drone',
    name: 'Drone Swarm Lead',
    icon: Rocket,
    color: '#EF4444',
    badge: 'Swarm Lead',
    description: 'Command a swarm of drones from a single Titan agent instance.',
    longDescription:
      'Position your Titan agent as the swarm leader for MAVLink-compatible drones. Send formation commands, geofence boundaries, and collision-avoidance waypoints. The agent aggregates telemetry from all swarm members and executes coordinated flight patterns. Supports PX4 and ArduPilot autopilots over telemetry radios.',
    status: 'online',
    hardware: [
      { item: 'Swarm lead: Raspberry Pi 5 + Holybro Pixhawk 6C' },
      { item: '3–5 follower drones with PX4 or ArduPilot flight controllers' },
      { item: 'SiK Telemetry Radios 915 MHz (one per drone)' },
      { item: 'Holybro GPS + compass module (u-blox M9N)' },
      { item: 'Radiomaster TX16S controller (safety override)' },
      { item: '5" Cinewhoop or 7" long-range frames' },
      { item: '4S LiPo 1300–2200 mAh batteries' },
    ],
    setupSteps: [
      {
        title: 'Configure Autopilots',
        detail:
          'Flash PX4 Autopilot v1.15+ to all flight controllers using QGroundControl. Set SYSID_THISMAV to a unique ID per drone (1 = leader, 2–5 = followers). Configure the telemetry radios at 57600 baud.',
      },
      {
        title: 'Install Titan MAVLink Bridge',
        detail:
          'On the lead Raspberry Pi, run: pip install titan-mavlink. This wraps MAVSDK with Titan agent bindings. Test telemetry with: titan mavlink status',
      },
      {
        title: 'Define Swarm Formation',
        detail:
          'Create a swarm config JSON. Define a diamond formation with 3m spacing. Each drone gets a relative position offset. The leader broadcasts formation waypoints via MAVLink COMMAND_LONG messages.',
      },
      {
        title: 'Set Up Geofence & Safety',
        detail:
          'Configure geofence with a 300m radius and 80m ceiling. Enable "return-to-launch" on radio loss (10s timeout). The Titan agent monitors battery levels and commands landing below 15% charge.',
      },
      {
        title: 'Arm & Fly Swarm Mission',
        detail:
          'Place all drones on a level surface with GPS lock (≥10 satellites). Run: titan swarm launch --formation diamond --alt 30. The leader executes the flight plan; followers track their relative positions.',
      },
    ],
    codeSnippet: {
      title: 'Swarm Formation Control (Python)',
      language: 'python',
      code: `from titan_mavlink import SwarmLeader
from titan_agent import TitanAgent

agent = TitanAgent()
leader = SwarmLeader(connection="serial:///dev/ttyAMA0:57600")

# Diamond formation relative offsets (NED)
FORMATION = {
    1: ( 0,  0, 0),   # leader
    2: ( 3,  0, 0),   # right wing
    3: (-3,  0, 0),   # left wing
    4: ( 0,  3, 0),   # rear center
    5: ( 1, -3, 0),   # vanguard
}

async def run_mission():
    await leader.connect()
    await leader.arm_all()

    await leader.goto_waypoint(
        37.4219, -122.0849, 30.0,
        formation=FORMATION
    )

    while True:
        telemetry = leader.get_swarm_telemetry()
        agent.publish("swarm/positions", telemetry)

        if any(t["distance_to_leader"] < 1.5 for t in telemetry):
            await leader.spread_formation(5.0)

        await asyncio.sleep(0.5)`,
    },
    capabilities: ['MAVLink', 'Formation flight', 'Geofence', 'Collision avoidance'],
  },
};

// ─-- Particle Field --───────────────────────────────────────────────────

function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3.5,
      duration: 140 + Math.random() * 100,
      delay: Math.random() * 60,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(20, 184, 166, 0.3)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(20, 184, 166, 0.2)`,
            filter: 'blur(1px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            y: [0, -4, 2, -8, -2, -10, 0, -6, -2, -8, 0],
            x: [0, 3, -2, 5, -3, 4, -4, 2, -2, 3, 0],
            scale: [1, 1.05, 0.85, 1.1, 0.9, 1.05, 0.8, 1.02, 0.88, 1.0, 1],
            opacity: [0.15, 0.5, 0.3, 0.7, 0.2, 0.6, 0.1, 0.5, 0.25, 0.4, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─-- Code Block Component --─────────────────────────────────────────────

function CodeBlock({ title, language, code }: { title: string; language: string; code: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-titan-border/30 bg-titan-bg/80">
      <div className="flex items-center justify-between px-4 py-2.5 bg-titan-surface/50 border-b border-titan-border/20">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-titan-teal/70" />
          <span className="text-xs font-mono text-titan-muted/80">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="text-[9px] h-4 px-1.5 font-mono border-0 bg-titan-teal/10 text-titan-teal/70">
            {language}
          </Badge>
          <button
            className="text-titan-muted/50 hover:text-titan-teal/70 transition-colors"
            onClick={() => navigator.clipboard.writeText(code)}
            title="Copy code"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <pre className="p-4 text-[11px] sm:text-xs leading-relaxed font-mono text-titan-text/80 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─-- Helper: format ID for display --────────────────────────────────────

function formatPlatformName(id: string): string {
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ─-- Main Detail Page --─────────────────────────────────────────────────

export default function PlatformDetailPage() {
  const params = useParams();
  const router = useRouter();
  const platformId = params?.platform as string;
  const platform = PLATFORM_DETAILS[platformId];

  // ─-- Fallback: unknown platform --─────────────────────────────────────
  if (!platform) {
    return (
      <div className="min-h-screen titan-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 titan-radial-glow-warm" />
        <div className="absolute inset-0 pointer-events-none z-0 titan-grid-bg" />
        <ParticleField />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-titan-card/40 border border-titan-border/30 flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-titan-muted/50" />
            </div>
            <h1 className="text-xl font-bold titan-text-gradient mb-2">Platform Not Found</h1>
            <p className="text-sm text-titan-muted font-mono mb-6">
              &quot;{formatPlatformName(platformId)}&quot; is not a recognized platform.
            </p>
            <button
              onClick={() => router.push('/robotics')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono border border-titan-border/40 text-titan-muted/70 hover:bg-titan-card/40 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Robotics Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const Icon = platform.icon;
  const statusColors: Record<string, string> = {
    online: 'bg-emerald-500',
    beta: 'bg-amber-500',
    maintenance: 'bg-red-500',
  };

  return (
    <div className="min-h-screen titan-gradient relative overflow-hidden">
      {/* -- Background layers -- */}
      <div className="absolute inset-0 pointer-events-none z-0 titan-radial-glow-warm" />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at 70% 20%, ${platform.color}10 0%, transparent 60%)`,
          mixBlendMode: 'screen',
        }}
      />
      <div className="absolute inset-0 pointer-events-none z-0 titan-grid-bg" />
      <ParticleField />

      <div className="relative z-10">
        {/* -- Navigation -- */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-2">
          <motion.div
            className="flex items-center gap-1.5 text-[10px] font-mono text-titan-muted/50 mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => router.push('/robotics')}
              className="hover:text-titan-teal/80 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="h-2.5 w-2.5" />
              Robotics
            </button>
            <ChevronRight className="h-2.5 w-2.5" />
            <span className="text-titan-teal/80">{platform.name}</span>
          </motion.div>
        </div>

        {/* -- Hero Section -- */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon */}
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: `${platform.color}15`,
                border: `1px solid ${platform.color}30`,
                boxShadow: `0 0 30px ${platform.color}15`,
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Icon className="h-7 w-7 sm:h-9 sm:w-9" style={{ color: platform.color }} />
            </motion.div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-1.5">
                <h1 className="text-xl sm:text-2xl font-bold text-titan-text tracking-tight">
                  {platform.name}
                </h1>
                <Badge
                  className="text-[9px] h-4 px-1.5 font-mono border-0"
                  style={{
                    background: `${platform.color}20`,
                    color: platform.color,
                  }}
                >
                  {platform.badge}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-titan-muted leading-relaxed mb-3 max-w-xl">
                {platform.description}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                {/* Status badge */}
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${statusColors[platform.status] || 'bg-gray-500'}`} />
                  <span className="text-[10px] font-mono text-titan-muted/60 uppercase tracking-wider">
                    {platform.status}
                  </span>
                </div>

                {/* Divider */}
                <span className="text-titan-border/40 text-[10px]">|</span>

                {/* Activity indicator */}
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-titan-emerald/60" />
                  <span className="text-[10px] font-mono text-titan-muted/60">
                    Last ping: 12s ago
                  </span>
                </div>

                {/* Signal */}
                <span className="text-titan-border/40 text-[10px]">|</span>

                <div className="flex items-center gap-1.5">
                  <Signal className="h-3 w-3 text-titan-teal/60" />
                  <span className="text-[10px] font-mono text-titan-muted/60">
                    Latency: 24 ms
                  </span>
                </div>
              </div>
            </div>

            {/* Back button */}
            <motion.button
              onClick={() => router.push('/robotics')}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] sm:text-xs font-mono border border-titan-border/40 text-titan-muted/70 hover:bg-titan-card/40 hover:text-titan-teal/80 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeft className="h-3 w-3" />
              Dashboard
            </motion.button>
          </motion.div>

          {/* Long description */}
          <motion.p
            className="text-xs sm:text-sm text-titan-muted/70 leading-relaxed mt-4 pl-0 sm:pl-[88px] max-w-2xl font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {platform.longDescription}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 space-y-8 sm:space-y-10">
          {/* ─-- Section 1: Hardware Requirements --────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <HardDrive className="h-4 w-4 text-titan-teal" />
              <h2 className="text-sm sm:text-base font-bold tracking-tight">
                <span className="titan-text-gradient">Hardware Requirements</span>
              </h2>
            </div>

            <Card className="p-4 sm:p-6 bg-titan-card/30 border-titan-border/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {platform.hardware.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-titan-bg/40 border border-titan-border/20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 mt-0.5 ${
                        item.optional ? 'text-titan-muted/40' : 'text-titan-emerald'
                      }`}
                    />
                    <span
                      className={`text-[11px] sm:text-xs font-mono leading-relaxed ${
                        item.optional ? 'text-titan-muted/50' : 'text-titan-text/80'
                      }`}
                    >
                      {item.item}
                      {item.optional && (
                        <span className="text-titan-muted/40 ml-1">(optional)</span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* ─-- Section 2: Setup Guide --──────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-titan-teal" />
              <h2 className="text-sm sm:text-base font-bold tracking-tight">
                <span className="titan-text-gradient">Setup Guide</span>
              </h2>
            </div>

            <div className="space-y-3">
              {platform.setupSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Card className="p-4 sm:p-5 bg-titan-card/30 border-titan-border/30 hover:border-titan-teal/20 transition-colors">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Step number */}
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 text-xs sm:text-sm font-bold font-mono"
                        style={{
                          background: `${platform.color}15`,
                          border: `1px solid ${platform.color}25`,
                          color: platform.color,
                        }}
                      >
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-titan-text mb-1 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-mono text-titan-muted/70 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ─-- Section 3: Code Snippet --─────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-4 w-4 text-titan-teal" />
              <h2 className="text-sm sm:text-base font-bold tracking-tight">
                <span className="titan-text-gradient">Sample Code</span>
              </h2>
            </div>

            <CodeBlock
              title={platform.codeSnippet.title}
              language={platform.codeSnippet.language}
              code={platform.codeSnippet.code}
            />
          </motion.section>

          {/* ─-- Section 4: Capabilities --─────────────────────────────── */}
          {platform.capabilities && platform.capabilities.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-titan-teal" />
                <h2 className="text-sm sm:text-base font-bold tracking-tight">
                  <span className="titan-text-gradient">Capabilities</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {platform.capabilities.map((cap, idx) => (
                  <motion.div
                    key={cap}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono border"
                      style={{
                        borderColor: `${platform.color}25`,
                        color: platform.color,
                        background: `${platform.color}08`,
                      }}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {cap}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─-- Section 5: Bottom CTA --───────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Card className="p-5 sm:p-6 bg-titan-card/30 border-titan-border/30 text-center relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${platform.color}08 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <p className="text-xs sm:text-sm text-titan-muted/80 font-mono mb-3 max-w-lg mx-auto">
                  Ready to deploy your Titan agent to {platform.name}?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <motion.button
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, #14B8A6, #10B981)',
                      color: '#0A0E17',
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Play className="h-3.5 w-3.5" />
                    Deploy Agent
                  </motion.button>

                  <motion.button
                    onClick={() => router.push('/robotics')}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono border border-titan-border/40 text-titan-muted/70 hover:bg-titan-card/40 transition-colors inline-flex items-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to All Platforms
                  </motion.button>
                </div>
              </div>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
