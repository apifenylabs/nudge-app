module.exports = {
  apps: [
    {
      name: 'directory-beast',
      script: 'npm',
      args: 'run start',
      cwd: '/home/captain/.openclaw/workspace/family-travel-directory',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'social-beast',
      script: 'npm',
      args: 'run start',
      cwd: '/home/captain/.openclaw/workspace/social-beast-components',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'kidscan-beast',
      script: 'npm',
      args: 'run start',
      cwd: '/home/captain/.openclaw/workspace/kidscan-api',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    },
    {
      name: 'appfactory-beast',
      script: 'npm',
      args: 'run start',
      cwd: '/home/captain/.openclaw/workspace/habit-tracker',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3003
      }
    },
    {
      name: 'affiliate-beast',
      script: 'npm',
      args: 'run start',
      cwd: '/home/captain/.openclaw/workspace/affiliate-tracking',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3004
      }
    },
    {
      name: 'nudge-beast',
      script: 'npm',
      args: 'run start',
      cwd: '/home/captain/.openclaw/workspace/nudge',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      }
    }
  ]
};