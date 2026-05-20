#!/bin/bash
set -e
WORKSPACE=/home/captain/.openclaw/workspace
OUTPUT=$WORKSPACE/_projects/alpha-hq/index.html

# Build dashboard data using node directly
node << 'NODESCRIPT' > /tmp/dashboard-data.json
const tasks = require('/home/captain/.openclaw/workspace/tasks.json');

const priorityOrder = {P0: 0, P1: 1, P2: 2};
const priorityColors = {'P0': '#ff4757', 'P1': '#ffa502', 'P2': '#576574'};

function buildProjectCards() {
  return Object.entries(tasks.projects)
    .sort((a,b) => (priorityOrder[a[1].priority] || 99) - (priorityOrder[b[1].priority] || 99))
    .map(([key, proj]) => {
      const rows = (proj.tasks || []).map(t => `
    <div class="task-row">
      <span class="task-id">${t.id}</span>
      <span class="task-desc">${t.desc}</span>
      <span class="task-status task-${t.status}">${t.blocked_by ? '⛔ BLOCKED' : t.status.toUpperCase()}</span>
    </div>`).join('');

      const color = priorityColors[proj.priority] || '#576574';
      return `
  <div class="project-card priority-${proj.priority}">
    <div class="project-header">
      <div>
        <span class="priority-badge" style="background:${color}">${proj.priority}</span>
        <span class="project-name">${proj.name}</span>
      </div>
      <span class="project-status project-${proj.status}">${proj.status.toUpperCase()}</span>
    </div>
    <div class="project-current">▶ ${proj.current || ''}</div>
    <div class="task-list">${rows}</div>
  </div>`;
    }).join('\n');
}

function buildBlockerList() {
  return (tasks.blockers || []).map(b => `
    <div class="blocker-row">
      <span class="blocker-item">⛔ ${b.item}</span>
      <span class="blocker-who">→ ${b.who}</span>
      <span class="blocker-action">${b.action}</span>
    </div>`).join('');
}

const allTasks = Object.values(tasks.projects).flatMap(p => p.tasks || []);
const building = allTasks.filter(t => t.status === 'building').length;
const todo = allTasks.filter(t => t.status === 'todo' || t.status === 'researching').length;

const result = {
  projectsByPriority: buildProjectCards(),
  blockerList: buildBlockerList(),
  backlog: tasks.backlog || [],
  sprint: tasks.sprint || '',
  updated: tasks.updated || new Date().toISOString(),
  stats: { building, todo }
};

console.log(JSON.stringify(result));
NODESCRIPT

# Generate HTML with data injected
node << 'NODESCRIPT'
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/dashboard-data.json', 'utf8'));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>Alpha Orchestras HQ — Sprint Board</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'SF Mono','Fira Code',monospace;background:#0a0e17;color:#c8d6e5;padding:12px;font-size:13px;max-width:900px;margin:0 auto}
h1{color:#48dbfb;font-size:18px}
h2{color:#ff9f43;font-size:14px;margin:16px 0 6px;border-bottom:1px solid #1e2a3a;padding-bottom:4px}
.sub{color:#576574;font-size:11px;margin-bottom:12px}
.card{background:#111827;border:1px solid #1e2a3a;border-radius:8px;padding:10px;margin-bottom:10px}
.stat-bar{display:flex;gap:12px;margin-bottom:12px}
.stat-box{flex:1;background:#111827;border:1px solid #1e2a3a;border-radius:8px;padding:10px;text-align:center}
.stat-box .num{font-size:24px;font-weight:bold}
.stat-box .lbl{font-size:10px;color:#576574;margin-top:2px}
.green{color:#2ed573}
.orange{color:#ffa502}
.red{color:#ff4757}
.blue{color:#48dbfb}

.project-card{background:#111827;border:1px solid #1e2a3a;border-radius:8px;padding:10px;margin-bottom:10px;border-left:3px solid #1e2a3a}
.priority-P0{border-left-color:#ff4757}
.priority-P1{border-left-color:#ffa502}
.priority-P2{border-left-color:#576574}

.project-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.project-name{font-weight:bold;color:#48dbfb;font-size:14px}
.priority-badge{display:inline-block;padding:1px 6px;border-radius:3px;color:#fff;font-size:10px;font-weight:bold;margin-right:8px;vertical-align:middle}
.project-status{font-size:10px;padding:2px 8px;border-radius:4px;font-weight:bold}
.project-building{background:#0a2e0a;color:#2ed573;border:1px solid #2ed57333}
.project-researching{background:#0a1a2e;color:#48dbfb;border:1px solid #48dbfb33}
.project-planning{background:#2e2a0a;color:#ffa502;border:1px solid #ffa50233}
.project-queued{background:#1a1a1a;color:#576574;border:1px solid #1e2a3a}
.project-running{background:#0a2e0a;color:#2ed573;border:1px solid #2ed57333}
.project-blocked{background:#2e0a0a;color:#ff4757;border:1px solid #ff475733}

.project-current{color:#576574;font-size:11px;margin-bottom:8px;padding-left:2px}
.task-list{margin-top:4px}
.task-row{display:flex;gap:8px;padding:3px 0;font-size:11px;align-items:center;border-top:1px solid #0d1520}
.task-row:first-child{border-top:none}
.task-id{color:#576574;font-size:10px;width:40px;flex-shrink:0}
.task-desc{flex:1;color:#c8d6e5}
.task-status{font-size:9px;padding:1px 6px;border-radius:3px;font-weight:bold;flex-shrink:0}
.task-building{background:#0a2e0a;color:#2ed573}
.task-todo{background:#2e2a0a;color:#ffa502}
.task-queued{background:#1a1a1a;color:#576574}
.task-researching{background:#0a1a2e;color:#48dbfb}

.blockers-section{background:#111827;border:1px solid #ff475733;border-radius:8px;padding:10px;margin-bottom:10px}
.blocker-section-title{font-weight:bold;color:#ff4757;font-size:12px;margin-bottom:6px}
.blocker-row{display:flex;gap:8px;padding:3px 0;font-size:12px;border-top:1px solid #0d1520}
.blocker-row:first-child{border-top:none}
.blocker-item{flex:1;color:#ff4757}
.blocker-who{color:#ffa502;font-size:10px;flex-shrink:0}
.blocker-action{color:#576574;font-size:10px;flex-shrink:0}
.backlog-row{color:#576574;font-size:11px;padding:2px 0}
</style>
</head>
<body>
<h1>📋 Alpha Orchestras HQ <span style="color:#2ed573;font-size:13px;font-weight:normal">— ${data.sprint}</span></h1>
<div class="sub" style="margin-bottom:8px">Last updated: ${data.updated} · <span id="live-ts"></span></div>

<div class="stat-bar">
  <div class="stat-box"><div class="num green">${data.stats.building}</div><div class="lbl">Building Now</div></div>
  <div class="stat-box"><div class="num orange">${data.stats.todo}</div><div class="lbl">Tasks Remaining</div></div>
</div>

<div class="blockers-section">
  <div class="blocker-section-title">⛔ BLOCKERS</div>
  ${data.blockerList || '<div class="backlog-row">None</div>'}
</div>

<div id="project-list">${data.projectsByPriority}</div>

<h2>📌 Backlog</h2>
<div class="card">${(data.backlog || []).map(b => '<div class="backlog-row">☐ ' + b + '</div>').join('')}</div>

<script>
function updateTime(){document.getElementById('live-ts').textContent=new Date().toLocaleString('en-SG',{timeZone:'Asia/Singapore',hour12:false})}
updateTime();setInterval(updateTime,10000);
</script>
</body>
</html>`;

fs.writeFileSync('/home/captain/.openclaw/workspace/_projects/alpha-hq/index.html', html);
console.log('Dashboard written');
NODESCRIPT