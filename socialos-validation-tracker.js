// SocialOS Validation Tracker
// Tracks progress against validation goals

const validationGoals = {
    problemInterviews: { target: 10, current: 0, weight: 0.3 },
    landingPageVisitors: { target: 200, current: 0, weight: 0.2 },
    emailSignups: { target: 20, current: 0, weight: 0.25 },
    demoUsers: { target: 7, current: 0, weight: 0.15 },
    preSellCommitments: { target: 3, current: 0, weight: 0.1 }
};

const validationStartDate = new Date('2026-04-11');
const validationEndDate = new Date('2026-04-18');

class ValidationTracker {
    constructor() {
        this.loadProgress();
        this.renderDashboard();
        this.setupEventListeners();
    }

    loadProgress() {
        // Load from localStorage if available
        const saved = localStorage.getItem('socialos-validation-progress');
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(validationGoals).forEach(key => {
                if (data[key] !== undefined) {
                    validationGoals[key].current = data[key];
                }
            });
        }
    }

    saveProgress() {
        const data = {};
        Object.keys(validationGoals).forEach(key => {
            data[key] = validationGoals[key].current;
        });
        localStorage.setItem('socialos-validation-progress', JSON.stringify(data));
    }

    updateMetric(metric, value) {
        if (validationGoals[metric]) {
            validationGoals[metric].current = Math.max(0, value);
            this.saveProgress();
            this.renderDashboard();
            this.checkCompletion();
        }
    }

    incrementMetric(metric) {
        this.updateMetric(metric, validationGoals[metric].current + 1);
    }

    decrementMetric(metric) {
        this.updateMetric(metric, validationGoals[metric].current - 1);
    }

    calculateProgress() {
        let totalWeightedProgress = 0;
        let totalWeight = 0;

        Object.values(validationGoals).forEach(goal => {
            const progress = Math.min(goal.current / goal.target, 1);
            totalWeightedProgress += progress * goal.weight;
            totalWeight += goal.weight;
        });

        return totalWeightedProgress / totalWeight;
    }

    getDaysRemaining() {
        const now = new Date();
        const diffTime = validationEndDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }

    getStatusColor(progress) {
        if (progress >= 0.8) return 'bg-green-100 text-green-800';
        if (progress >= 0.5) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    }

    checkCompletion() {
        const progress = this.calculateProgress();
        if (progress >= 0.7) {
            console.log('🎉 Validation is on track!');
        } else if (this.getDaysRemaining() < 3 && progress < 0.5) {
            console.warn('⚠️ Validation is behind schedule!');
        }
    }

    renderDashboard() {
        const container = document.getElementById('validation-dashboard');
        if (!container) return;

        const progress = this.calculateProgress();
        const daysRemaining = this.getDaysRemaining();

        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">SocialOS Validation Dashboard</h2>
                    <span class="px-3 py-1 rounded-full ${this.getStatusColor(progress)} text-sm font-medium">
                        ${Math.round(progress * 100)}% Complete
                    </span>
                </div>

                <div class="mb-6">
                    <div class="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>${daysRemaining} days remaining</span>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-purple-600 rounded-full transition-all duration-300" 
                             style="width: ${progress * 100}%"></div>
                    </div>
                </div>

                <div class="space-y-4">
                    ${Object.entries(validationGoals).map(([key, goal]) => `
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-center mb-2">
                                <div>
                                    <h3 class="font-medium text-gray-900">${this.formatMetricName(key)}</h3>
                                    <p class="text-sm text-gray-600">Target: ${goal.target}</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-gray-900">${goal.current}</div>
                                    <div class="text-sm ${goal.current >= goal.target ? 'text-green-600' : 'text-gray-500'}">
                                        ${Math.round((goal.current / goal.target) * 100)}%
                                    </div>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="tracker.incrementMetric('${key}')" 
                                        class="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 py-1 rounded text-sm">
                                    +1
                                </button>
                                <button onclick="tracker.decrementMetric('${key}')" 
                                        class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 rounded text-sm">
                                    -1
                                </button>
                                <input type="number" 
                                       value="${goal.current}"
                                       onchange="tracker.updateMetric('${key}', parseInt(this.value))"
                                       class="w-20 text-center border border-gray-300 rounded py-1 text-sm">
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-medium text-gray-900 mb-2">Validation Score</h3>
                    <div class="text-3xl font-bold text-gray-900">${this.calculateValidationScore()}/100</div>
                    <p class="text-sm text-gray-600 mt-1">
                        ${this.getValidationMessage(this.calculateValidationScore())}
                    </p>
                </div>

                <div class="mt-6 text-sm text-gray-500">
                    <p>Validation Period: ${validationStartDate.toLocaleDateString()} - ${validationEndDate.toLocaleDateString()}</p>
                    <p class="mt-1">Last updated: ${new Date().toLocaleTimeString()}</p>
                </div>
            </div>
        `;
    }

    formatMetricName(key) {
        const names = {
            problemInterviews: 'Problem Interviews',
            landingPageVisitors: 'Landing Page Visitors',
            emailSignups: 'Email Signups',
            demoUsers: 'Demo Users',
            preSellCommitments: 'Pre-sell Commitments'
        };
        return names[key] || key;
    }

    calculateValidationScore() {
        let score = 0;
        Object.values(validationGoals).forEach(goal => {
            const progress = Math.min(goal.current / goal.target, 1);
            score += progress * goal.weight * 100;
        });
        return Math.round(score);
    }

    getValidationMessage(score) {
        if (score >= 80) return '🎉 Strong validation! Proceed with development.';
        if (score >= 60) return '👍 Moderate validation. Consider adjustments.';
        if (score >= 40) return '⚠️ Weak validation. Needs more evidence.';
        return '🔴 Poor validation. Reconsider or pivot.';
    }

    setupEventListeners() {
        // Auto-save every minute
        setInterval(() => this.saveProgress(), 60000);
        
        // Auto-render if container exists
        if (document.getElementById('validation-dashboard')) {
            setInterval(() => this.renderDashboard(), 30000);
        }
    }

    generateReport() {
        const progress = this.calculateProgress();
        const score = this.calculateValidationScore();
        const daysRemaining = this.getDaysRemaining();

        return {
            timestamp: new Date().toISOString(),
            progress: progress,
            score: score,
            daysRemaining: daysRemaining,
            metrics: validationGoals,
            recommendation: this.getValidationMessage(score),
            status: progress >= 0.7 ? 'on_track' : 'needs_attention'
        };
    }

    exportToJSON() {
        const report = this.generateReport();
        const dataStr = JSON.stringify(report, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `socialos-validation-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
}

// Initialize tracker
const tracker = new ValidationTracker();

// Export for use in console
window.tracker = tracker;

console.log('SocialOS Validation Tracker loaded.');
console.log('Usage: tracker.incrementMetric("problemInterviews")');
console.log('       tracker.generateReport()');
console.log('       tracker.exportToJSON()');