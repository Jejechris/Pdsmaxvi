// Visitor Tracking System for Website
// Add this script to your main website

class WebsiteTracker {
    constructor() {
        this.visitors = JSON.parse(localStorage.getItem('websiteVisitors') || '[]');
        this.currentVisitor = this.getCurrentVisitor();
        this.trackVisit();
        this.setupRealTimeTracking();
    }

    getCurrentVisitor() {
        return {
            id: this.generateVisitorId(),
            ip: this.getClientIP(),
            location: this.getLocation(),
            device: this.getDevice(),
            browser: this.getBrowser(),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct',
            screen: `${screen.width}x${screen.height}`,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            sessionStart: Date.now(),
            pageViews: 1
        };
    }

    generateVisitorId() {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getClientIP() {
        // Simulated IP (in production, use a real IP service)
        return '192.168.1.' + Math.floor(Math.random() * 255);
    }

    getLocation() {
        // Simulated location (in production, use geolocation API)
        const cities = [
            'Jakarta, Indonesia',
            'Surabaya, Indonesia', 
            'Bandung, Indonesia',
            'Medan, Indonesia',
            'Semarang, Indonesia',
            'Makassar, Indonesia',
            'Yogyakarta, Indonesia',
            'Bali, Indonesia'
        ];
        return cities[Math.floor(Math.random() * cities.length)];
    }

    getDevice() {
        const userAgent = navigator.userAgent;
        if (/Mobile|Android|iPhone/.test(userAgent)) {
            return { type: 'Mobile', icon: '📱' };
        } else if (/Tablet|iPad/.test(userAgent)) {
            return { type: 'Tablet', icon: '📱' };
        } else {
            return { type: 'Desktop', icon: '💻' };
        }
    }

    getBrowser() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        return 'Unknown';
    }

    trackVisit() {
        // Check if visitor already exists
        const existingVisitor = this.visitors.find(v => 
            v.ip === this.currentVisitor.ip && 
            new Date(v.timestamp) > new Date(Date.now() - 30 * 60 * 1000) // 30 minutes
        );

        if (existingVisitor) {
            // Update existing visitor
            existingVisitor.pageViews++;
            existingVisitor.lastVisit = new Date().toISOString();
        } else {
            // Add new visitor
            this.visitors.unshift(this.currentVisitor);
        }

        // Keep only last 100 visitors
        this.visitors = this.visitors.slice(0, 100);
        localStorage.setItem('websiteVisitors', JSON.stringify(this.visitors));

        // Log visitor info
        console.log('👤 New visitor tracked:', this.currentVisitor);
    }

    setupRealTimeTracking() {
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.trackPageView();
            }
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                this.trackScrollDepth(maxScroll);
            }
        });

        // Track time on page
        this.startTimeTracking();
    }

    trackPageView() {
        const visitor = this.visitors.find(v => v.id === this.currentVisitor.id);
        if (visitor) {
            visitor.pageViews++;
            visitor.lastActivity = new Date().toISOString();
            localStorage.setItem('websiteVisitors', JSON.stringify(this.visitors));
        }
    }

    trackScrollDepth(depth) {
        const visitor = this.visitors.find(v => v.id === this.currentVisitor.id);
        if (visitor) {
            visitor.scrollDepth = depth;
            localStorage.setItem('websiteVisitors', JSON.stringify(this.visitors));
        }
    }

    startTimeTracking() {
        setInterval(() => {
            const visitor = this.visitors.find(v => v.id === this.currentVisitor.id);
            if (visitor) {
                visitor.timeOnSite = Date.now() - visitor.sessionStart;
                localStorage.setItem('websiteVisitors', JSON.stringify(this.visitors));
            }
        }, 10000); // Update every 10 seconds
    }

    getAnalytics() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        return {
            totalVisitors: this.visitors.length,
            uniqueVisitors: new Set(this.visitors.map(v => v.ip)).size,
            todayVisitors: this.visitors.filter(v => new Date(v.timestamp) >= today).length,
            onlineNow: this.visitors.filter(v => 
                new Date(v.timestamp) > new Date(Date.now() - 5 * 60 * 1000)
            ).length,
            recentVisitors: this.visitors.slice(0, 10),
            deviceStats: this.getDeviceStats(),
            locationStats: this.getLocationStats()
        };
    }

    getDeviceStats() {
        const devices = this.visitors.map(v => v.device.type);
        const stats = {};
        devices.forEach(device => {
            stats[device] = (stats[device] || 0) + 1;
        });
        return stats;
    }

    getLocationStats() {
        const locations = this.visitors.map(v => v.location);
        const stats = {};
        locations.forEach(location => {
            stats[location] = (stats[location] || 0) + 1;
        });
        return stats;
    }

    // Method to view analytics (for debugging)
    viewAnalytics() {
        const analytics = this.getAnalytics();
        console.log('📊 Website Analytics:', analytics);
        return analytics;
    }
}

// Initialize tracker when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.websiteTracker = new WebsiteTracker();
    
    // Optional: Log analytics to console
    setTimeout(() => {
        console.log('📈 Current Analytics:', window.websiteTracker.viewAnalytics());
    }, 2000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebsiteTracker;
}
