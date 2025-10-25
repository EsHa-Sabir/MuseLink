// admin-dashboard.js

document.addEventListener('DOMContentLoaded', () => {

    // ===== THEME & CHART COLOR LOGIC =====
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    let themeColors = {}; // Object to hold current theme colors

    // Helper to convert hex colors from CSS to rgba for chart gradients
    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    
    // Reads CSS variables and stores them in the themeColors object
    const updateThemeColors = () => {
        const style = getComputedStyle(document.documentElement);
        themeColors = {
            accentStart: style.getPropertyValue('--accent-start').trim(),
            accentEnd: style.getPropertyValue('--accent-end').trim(),
            aurora3: style.getPropertyValue('--aurora3').trim(),
            textSecondary: style.getPropertyValue('--text-secondary').trim(),
            borderColor: style.getPropertyValue('--border-color').trim(),
            bgSecondary: style.getPropertyValue('--bg-secondary').trim(),
            // A predefined palette that uses the theme colors
            palette: [
                style.getPropertyValue('--accent-start').trim(),
                style.getPropertyValue('--aurora3').trim(),
                '#10B981', // Green for success/completed
                '#3B82F6', // Blue for info
                style.getPropertyValue('--accent-end').trim(),
            ]
        };
    };

    const applyTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        if (themeToggle) themeToggle.checked = (theme === 'dark');
        updateThemeColors(); // Update colors after setting theme
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            // Re-render charts with new colors
            renderUserGrowthChart();
            renderUserRolesChart();
            renderContentStatusChart();
        });
    }
    
    // ===== DATABASE SIMULATION (EXPANDED FOR RICHER ANALYTICS) =====
    const adminDb = {
        users: [
            { id: 1, email: 'admin@genesis.io', username: 'super_admin', first_name: 'Super', last_name: 'Admin', is_active: true, account_status: 'active', last_login: '2025-10-08T14:30:00Z' },
            { id: 101, email: 'creative.user@example.com', username: 'YouCreative', first_name: 'You', last_name: 'Creative', is_active: true, account_status: 'active', last_login: '2025-10-08T12:00:00Z' },
            { id: 102, email: 'alice@example.com', username: 'AliceDesigner', first_name: 'Alice', last_name: 'Designer', is_active: true, account_status: 'active', last_login: '2025-10-07T18:00:00Z' },
            { id: 103, email: 'bob@example.com', username: 'BobWriter', first_name: 'Bob', last_name: 'Writer', is_active: false, account_status: 'suspended', last_login: '2025-10-05T10:00:00Z' },
            { id: 104, email: 'charlie@example.com', username: 'CharlieManager', first_name: 'Charlie', last_name: 'Manager', is_active: true, account_status: 'pending_verification', last_login: null },
            { id: 105, email: 'diana@example.com', username: 'DianaAdmin', first_name: 'Diana', last_name: 'Admin', is_active: true, account_status: 'active', last_login: '2025-10-09T08:00:00Z' },
            { id: 106, email: 'edward@example.com', username: 'EdCreative', first_name: 'Edward', last_name: 'Creative', is_active: true, account_status: 'active', last_login: '2025-10-09T09:15:00Z' }
        ],
        system_roles: [
            { id: 1, name: 'super_admin', display_name: 'Super Admin', hierarchy_level: 1 },
            { id: 2, name: 'admin', display_name: 'Admin', hierarchy_level: 2 },
            { id: 3, name: 'content_manager', display_name: 'Content Manager', hierarchy_level: 3 },
            { id: 4, name: 'creative_user', display_name: 'Creative User', hierarchy_level: 4 }
        ],
        user_system_roles: [
            { user_id: 1, role_id: 1 },
            { user_id: 101, role_id: 4 },
            { user_id: 102, role_id: 4 },
            { user_id: 103, role_id: 4 },
            { user_id: 104, role_id: 3 },
            { user_id: 105, role_id: 2 },
            { user_id: 106, role_id: 4 }
        ],
        system_permissions: [
            { id: 1, name: 'manage_users', display_name: 'Manage Users', category: 'User Management' },
            { id: 2, name: 'manage_roles', display_name: 'Manage Roles', category: 'User Management' },
            { id: 3, name: 'view_audit_logs', display_name: 'View Audit Logs', category: 'Security' },
            { id: 4, name: 'view_all_content', display_name: 'View All Content', category: 'Content Oversight' },
            { id: 5, name: 'manage_system_settings', display_name: 'Manage System Settings', category: 'System' },
            { id: 6, name: 'manage_backups', display_name: 'Manage Backups', category: 'System' }
        ],
        role_permissions: [
            { role_id: 1, permission_id: 1 }, { role_id: 1, permission_id: 2 }, { role_id: 1, permission_id: 3 }, { role_id: 1, permission_id: 4 }, { role_id: 1, permission_id: 5 }, { role_id: 1, permission_id: 6 },
            { role_id: 2, permission_id: 1 }, { role_id: 2, permission_id: 3 }, { role_id: 2, permission_id: 4 },
            { role_id: 3, permission_id: 4 },
        ],
        audit_logs: [
            { timestamp: '2025-10-09T09:15:21Z', user_id: 106, action: 'create_idea', ip_address: '203.0.113.50', status: 'success', details: 'Created idea ID 125' },
            { timestamp: '2025-10-09T09:15:00Z', user_id: 106, action: 'login', ip_address: '203.0.113.50', status: 'success', details: 'Successful login' },
            { timestamp: '2025-10-09T08:00:30Z', user_id: 105, action: 'suspend_user', ip_address: '192.168.1.10', status: 'success', details: 'Suspended user BobWriter' },
            { timestamp: '2025-10-08T14:30:15Z', user_id: 1, action: 'login', ip_address: '192.168.1.1', status: 'success', details: 'Successful login to admin panel' },
            { timestamp: '2025-10-08T12:05:00Z', user_id: 102, action: 'create_idea', ip_address: '203.0.113.25', status: 'success', details: 'Created idea ID 123' },
            { timestamp: '2025-10-07T10:00:00Z', user_id: 1, action: 'update_role', ip_address: '192.168.1.1', status: 'success', details: 'Updated permissions for "Content Manager"' },
            { timestamp: '2025-10-06T09:00:00Z', user_id: 103, action: 'login_failed', ip_address: '198.51.100.10', status: 'failed', details: 'Invalid password attempt' },
        ],
        security_incidents: [
            { timestamp: '2025-10-06T09:01:00Z', type: 'brute_force_attempt', severity: 'medium', ip_address: '198.51.100.10', endpoint: '/login' },
            { timestamp: '2025-10-05T15:20:00Z', type: 'sql_injection_attempt', severity: 'high', ip_address: '103.22.10.5', endpoint: '/api/search' }
        ],
        ideas: [
            { id: 1, title: 'Q4 Holiday Campaign', owner_id: 102, team_id: 1, status: 'in_progress', created_at: '2025-10-08T11:00:00Z' },
            { id: 2, title: 'New Website Copy', owner_id: 103, team_id: 1, status: 'review', created_at: '2025-10-07T16:00:00Z' },
            { id: 3, title: 'Product Launch Video', owner_id: 101, team_id: 2, status: 'completed', created_at: '2025-10-05T09:00:00Z' },
            { id: 4, title: 'Social Media Strategy', owner_id: 104, team_id: 1, status: 'draft', created_at: '2025-10-09T10:00:00Z' },
            { id: 5, title: 'Onboarding Email Sequence', owner_id: 102, team_id: 1, status: 'review', created_at: '2025-10-09T11:00:00Z' },
            { id: 6, title: 'Brand Guideline Update', owner_id: 105, team_id: null, status: 'completed', created_at: '2025-10-04T14:00:00Z' }
        ],
        teams: [
            { id: 1, name: 'Marketing' }, { id: 2, name: 'Product Dev' }
        ],
        drive_files: [
            { id: 1, file_size: 5242880, owner_id: 101 }, // 5 MB
            { id: 2, file_size: 2097152, owner_id: 102 }, // 2 MB
            { id: 3, file_size: 8388608, team_id: 1 }, // 8 MB
            { id: 4, file_size: 1048576, team_id: 2 }, // 1 MB
        ],
        drive_backups: [
            { id: 1, created_at: '2025-10-08T02:00:00Z', backup_name: 'Weekly-Marketing-Backup', backup_type: 'full', team_id: 1, backup_size: 8388608, status: 'completed' },
            { id: 2, created_at: '2025-10-07T02:00:00Z', backup_name: 'Daily-User-102-Backup', backup_type: 'incremental', owner_id: 102, backup_size: 512000, status: 'completed' },
            { id: 3, created_at: '2025-10-06T02:00:00Z', backup_name: 'Daily-User-101-Backup', backup_type: 'incremental', owner_id: 101, backup_size: 102400, status: 'failed' },
        ],
        backup_schedules: [
            { id: 1, schedule_name: 'Weekly Marketing', team_id: 1, frequency: 'weekly', retention_days: 30, is_active: true },
            { id: 2, schedule_name: 'Daily Creative Users', user_id: null, frequency: 'daily', retention_days: 7, is_active: true, target_description: 'All Creative Users' },
            { id: 3, schedule_name: 'Monthly System Snapshot', user_id: null, frequency: 'monthly', retention_days: 180, is_active: false, target_description: 'System-wide' }
        ]
    };
    
    // ===== CORE APP LOGIC =====
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const pages = document.querySelectorAll('.page');

    const showPage = (pageId) => {
        pages.forEach(page => page.classList.toggle('is-active', page.id === pageId));
        navItems.forEach(item => item.classList.toggle('active', item.dataset.page === pageId));
        document.body.classList.remove('nav-open');
        sidebar.classList.remove('open');
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = item.dataset.page;
            if (pageId) showPage(pageId);
        });
    });

    if (sidebarToggle) sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
            sidebar.classList.toggle('open');
        });
    }

    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'BODY' && document.body.classList.contains('nav-open')) {
            document.body.classList.remove('nav-open');
            sidebar.classList.remove('open');
        }
    });

    // ===== HELPER FUNCTIONS =====
    const getUserById = (id) => adminDb.users.find(u => u.id === id) || { username: 'Unknown', first_name: '', last_name: '' };
    const getRoleById = (id) => adminDb.system_roles.find(r => r.id === id) || { display_name: 'N/A' };
    const createAvatar = (user) => {
        const initials = `${user.first_name[0] || ''}${user.last_name[0] || ''}`.toUpperCase();
        return `<div class="avatar">${initials}</div>`;
    };
    const showToast = (message, type = 'info') => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    };
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    }

    // ===== MODAL LOGIC =====
    const modalOverlay = document.getElementById('modal-overlay');
    const allModals = document.querySelectorAll('.modal');
    
    const openModal = (modalId) => {
        modalOverlay.classList.add('active');
        const modal = document.getElementById(modalId);
        if(modal) modal.classList.add('active');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        allModals.forEach(modal => modal.classList.remove('active'));
    };

    document.querySelectorAll('.close-modal-btn').forEach(btn => btn.addEventListener('click', closeModal));
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

    // ===== RENDER FUNCTIONS =====

    // --- Overview Page ---
    const renderOverview = () => {
        const statsGrid = document.getElementById('admin-stats-grid');
        const totalUsers = adminDb.users.length;
        const activeUsers = adminDb.users.filter(u => u.is_active && u.last_login && new Date(u.last_login) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
        
        statsGrid.innerHTML = `
            <div class="stat-card card">
                <div class="stat-card-icon users">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Total Users</h3>
                    <p class="stat-number">${totalUsers}</p>
                </div>
            </div>
            <div class="stat-card card">
                <div class="stat-card-icon active-users">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 14.6-.4-1"/><path d="m17.7 20.7-.4-1"/><path d="m17.1 12.2.9-.3"/><path d="m21.2 18.7.9-.3"/></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Active Users (7d)</h3>
                    <p class="stat-number">${activeUsers}</p>
                </div>
            </div>
            <div class="stat-card card">
                <div class="stat-card-icon ideas">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.03 4.97a7.5 7.5 0 0 1 0 14.06"/><path d="M9.04 4.97a7.5 7.5 0 0 0 0 14.06"/><path d="M12 2v2.5"/><path d="M12 19.5V22"/><path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Total Ideas Created</h3>
                    <p class="stat-number">${adminDb.ideas.length}</p>
                </div>
            </div>
            <div class="stat-card card">
                <div class="stat-card-icon incidents">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Security Incidents</h3>
                    <p class="stat-number">${adminDb.security_incidents.length}</p>
                </div>
            </div>
        `;
        renderUserGrowthChart();
        renderUserRolesChart();
        renderContentStatusChart();
        renderRecentActivity();
    };

    let userGrowthChart, userRolesChart, contentStatusChart;

    const renderUserGrowthChart = () => {
        const ctx = document.getElementById('user-growth-chart').getContext('2d');
        if (userGrowthChart) userGrowthChart.destroy();

        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, hexToRgba(themeColors.accentStart, 0.6));
        gradient.addColorStop(1, hexToRgba(themeColors.accentStart, 0.1));

        userGrowthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 30}, (_, i) => `${i + 1} Sep`),
                datasets: [{
                    label: 'New Users',
                    data: Array.from({length: 30}, () => Math.floor(Math.random() * 10)),
                    backgroundColor: gradient,
                    borderColor: themeColors.accentStart,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true,
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { 
                    y: { 
                        beginAtZero: true, 
                        grid: { color: themeColors.borderColor },
                        ticks: { color: themeColors.textSecondary }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: { color: themeColors.textSecondary }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    };

    const renderUserRolesChart = () => {
        const ctx = document.getElementById('user-roles-chart').getContext('2d');
        if (userRolesChart) userRolesChart.destroy();

        const roleCounts = adminDb.system_roles.map(role => {
            const count = adminDb.user_system_roles.filter(ur => ur.role_id === role.id).length;
            return { name: role.display_name, count: count };
        });

        userRolesChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: roleCounts.map(r => r.name),
                datasets: [{
                    label: 'User Roles',
                    data: roleCounts.map(r => r.count),
                    backgroundColor: themeColors.palette,
                    borderColor: themeColors.bgSecondary,
                    borderWidth: 4,
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: themeColors.textSecondary }
                    }
                }
            }
        });
    };

    const renderContentStatusChart = () => {
        const ctx = document.getElementById('content-status-chart').getContext('2d');
        if (contentStatusChart) contentStatusChart.destroy();

        const statusOrder = ['draft', 'in_progress', 'review', 'completed'];
        const statusCounts = statusOrder.map(status => {
            return adminDb.ideas.filter(idea => idea.status === status).length;
        });

        contentStatusChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: statusOrder.map(s => s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())),
                datasets: [{
                    label: 'Idea Count',
                    data: statusCounts,
                    backgroundColor: themeColors.palette,
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { 
                    y: { 
                        beginAtZero: true, 
                        grid: { color: themeColors.borderColor },
                        ticks: { color: themeColors.textSecondary }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: { color: themeColors.textSecondary }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    };

    const renderRecentActivity = () => {
        const feed = document.getElementById('recent-activity-feed');
        const recentLogs = adminDb.audit_logs.slice(0, 5); // Get latest 5 logs
        
        feed.innerHTML = recentLogs.map(log => {
            const user = getUserById(log.user_id);
            const iconClass = log.status === 'success' ? 'success' : 'failed';
            const iconSvg = log.status === 'success' 
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

            return `
                <li>
                    <div class="activity-icon ${iconClass}">${iconSvg}</div>
                    <div class="activity-details">
                        <p><strong>${user.username}</strong> ${log.action.replace('_', ' ')}: ${log.details}</p>
                        <p class="timestamp">${timeAgo(new Date(log.timestamp))}</p>
                    </div>
                </li>
            `;
        }).join('');
    };
    
    // --- User Management Page ---
    const renderUserManagementTable = (filter = '') => {
        const tbody = document.getElementById('user-management-table').querySelector('tbody');
        const filteredUsers = adminDb.users.filter(u => 
            u.username.toLowerCase().includes(filter.toLowerCase()) || 
            u.email.toLowerCase().includes(filter.toLowerCase())
        );

        tbody.innerHTML = filteredUsers.map(user => {
            const roleId = adminDb.user_system_roles.find(ur => ur.user_id === user.id)?.role_id;
            const role = getRoleById(roleId);
            return `
                <tr data-user-id="${user.id}">
                    <td><div class="user-cell">${createAvatar(user)} ${user.first_name} ${user.last_name}</div></td>
                    <td>${user.email}</td>
                    <td>${role.display_name}</td>
                    <td><span class="status-badge status-${user.account_status.replace('_', '-')}">${user.account_status.replace('_', ' ')}</span></td>
                    <td>${user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="edit-user-btn" title="Edit User"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                            <button class="delete-user-btn" title="Delete User"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    };

    // --- Roles & Permissions Page ---
    const renderRolesAndPermissions = () => {
        const rolesList = document.getElementById('roles-list');
        rolesList.innerHTML = adminDb.system_roles.map(role => `
            <li data-role-id="${role.id}">
                <span>${role.display_name}</span>
                ${role.id > 1 ? `<button class="delete-role-btn" data-role-id="${role.id}" title="Delete Role">&times;</button>` : ''}
            </li>
        `).join('');
    };

    const renderPermissionsForRole = (roleId) => {
        const role = getRoleById(roleId);
        document.getElementById('permissions-panel-title').textContent = `Permissions for ${role.display_name}`;
        const grid = document.getElementById('permissions-grid');
        const rolePerms = adminDb.role_permissions.filter(rp => rp.role_id === roleId).map(rp => rp.permission_id);

        const permissionsByCategory = adminDb.system_permissions.reduce((acc, perm) => {
            (acc[perm.category] = acc[perm.category] || []).push(perm);
            return acc;
        }, {});

        grid.innerHTML = Object.keys(permissionsByCategory).map(category => `
            <div class="permission-category">
                <h4>${category}</h4>
                <div class="permission-checklist">
                    ${permissionsByCategory[category].map(perm => `
                        <label class="permission-item">
                            <input type="checkbox" data-perm-id="${perm.id}" ${rolePerms.includes(perm.id) ? 'checked' : ''}>
                            <span>${perm.display_name}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
        document.getElementById('save-permissions-btn').style.display = 'inline-flex';
        grid.classList.add('has-selection');
    };

    // --- Audit & Security Page ---
    const renderAuditLogs = () => {
        const tbody = document.getElementById('audit-logs-table').querySelector('tbody');
        tbody.innerHTML = adminDb.audit_logs.map(log => {
            const user = getUserById(log.user_id);
            return `
                <tr>
                    <td>${new Date(log.timestamp).toLocaleString()}</td>
                    <td>${user.username}</td>
                    <td>${log.action.replace('_', ' ')}</td>
                    <td>${log.ip_address}</td>
                    <td><span class="status-badge status-${log.status}">${log.status}</span></td>
                    <td>${log.details}</td>
                </tr>
            `;
        }).join('');
    };

    const renderSecurityIncidents = () => {
        const tbody = document.getElementById('security-incidents-table').querySelector('tbody');
        tbody.innerHTML = adminDb.security_incidents.map(incident => `
            <tr>
                <td>${new Date(incident.timestamp).toLocaleString()}</td>
                <td>${incident.type.replace('_', ' ')}</td>
                <td><span class="status-badge status-${incident.severity}">${incident.severity}</span></td>
                <td>${incident.ip_address}</td>
                <td>${incident.endpoint}</td>
            </tr>
        `).join('');
    };

    // --- Content Oversight Page ---
    const renderContentOversight = () => {
        const statsGrid = document.getElementById('content-stats-grid');
        statsGrid.innerHTML = `
            <div class="stat-card card">
                <div class="stat-card-icon ideas">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.03 4.97a7.5 7.5 0 0 1 0 14.06"/><path d="M9.04 4.97a7.5 7.5 0 0 0 0 14.06"/><path d="M12 2v2.5"/><path d="M12 19.5V22"/><path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Total Ideas</h3>
                    <p class="stat-number">${adminDb.ideas.length}</p>
                </div>
            </div>
            <div class="stat-card card">
                <div class="stat-card-icon teams">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Total Teams</h3>
                    <p class="stat-number">${adminDb.teams.length}</p>
                </div>
            </div>
        `;
        const tbody = document.getElementById('recent-ideas-table').querySelector('tbody');
        tbody.innerHTML = adminDb.ideas.map(idea => {
            const owner = getUserById(idea.owner_id);
            const team = adminDb.teams.find(t => t.id === idea.team_id);
            return `
                <tr>
                    <td>${idea.title}</td>
                    <td>${owner.username}</td>
                    <td>${team ? team.name : 'N/A'}</td>
                    <td><span class="status-badge status-${idea.status.replace('_', '-')}">${idea.status}</span></td>
                    <td>${new Date(idea.created_at).toLocaleString()}</td>
                </tr>
            `;
        }).join('');
    };

    // --- Drive & Backups Page ---
    const renderDriveAndBackups = () => {
        const statsGrid = document.getElementById('drive-stats-grid');
        const totalStorageUsed = adminDb.drive_files.reduce((sum, file) => sum + file.file_size, 0);
        const totalFiles = adminDb.drive_files.length;
        const scheduledBackups = adminDb.backup_schedules.filter(s => s.is_active).length;

        statsGrid.innerHTML = `
             <div class="stat-card card">
                <div class="stat-card-icon backups">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Total Storage Used</h3>
                    <p class="stat-number">${formatBytes(totalStorageUsed)}</p>
                </div>
            </div>
             <div class="stat-card card">
                <div class="stat-card-icon ideas">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Total Files</h3>
                    <p class="stat-number">${totalFiles}</p>
                </div>
            </div>
            <div class="stat-card card">
                <div class="stat-card-icon active-users">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div class="stat-card-info">
                    <h3>Active Schedules</h3>
                    <p class="stat-number">${scheduledBackups}</p>
                </div>
            </div>
        `;

        const tbody = document.getElementById('recent-backups-table').querySelector('tbody');
        tbody.innerHTML = adminDb.drive_backups.map(backup => {
            const owner = backup.owner_id ? getUserById(backup.owner_id) : null;
            const team = backup.team_id ? adminDb.teams.find(t => t.id === backup.team_id) : null;
            const ownerName = owner ? `User: ${owner.username}` : (team ? `Team: ${team.name}`: 'N/A');
            return `
                 <tr>
                    <td>${new Date(backup.created_at).toLocaleString()}</td>
                    <td>${backup.backup_name}</td>
                    <td>${backup.backup_type}</td>
                    <td>${ownerName}</td>
                    <td>${formatBytes(backup.backup_size)}</td>
                    <td><span class="status-badge status-${backup.status}">${backup.status}</span></td>
                </tr>
            `;
        }).join('');
    };

    // --- System Settings -> Backup Schedules ---
    const renderBackupSchedules = () => {
        const tbody = document.getElementById('backup-schedules-table').querySelector('tbody');
        tbody.innerHTML = adminDb.backup_schedules.map(schedule => {
            const target = schedule.user_id ? `User: ${schedule.user_id}` : (schedule.team_id ? `Team: ${schedule.team_id}` : schedule.target_description);
            return `
                <tr data-schedule-id="${schedule.id}">
                    <td>${schedule.schedule_name}</td>
                    <td>${target}</td>
                    <td>${schedule.frequency}</td>
                    <td>${schedule.retention_days}</td>
                    <td><span class="status-badge status-${schedule.is_active ? 'active' : 'suspended'}">${schedule.is_active ? 'Active' : 'Inactive'}</span></td>
                    <td>
                         <div class="action-buttons">
                            <button class="edit-schedule-btn" title="Edit Schedule"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                            <button class="delete-schedule-btn" title="Delete Schedule"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    };

    // ===== EVENT LISTENERS =====
    
    // User Management Search
    document.getElementById('user-search-input').addEventListener('keyup', (e) => {
        renderUserManagementTable(e.target.value);
    });

    // User Table Actions (Delegation)
    document.getElementById('user-management-table').addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-user-btn');
        if (editBtn) {
            const userId = parseInt(editBtn.closest('tr').dataset.userId);
            const user = adminDb.users.find(u => u.id === userId);
            const userRole = adminDb.user_system_roles.find(ur => ur.user_id === userId);
            
            document.getElementById('edit-user-modal-title').textContent = `Edit: ${user.username}`;
            document.getElementById('edit-user-id').value = user.id;

            const roleSelect = document.getElementById('edit-user-role');
            roleSelect.innerHTML = adminDb.system_roles.map(r => `<option value="${r.id}" ${userRole.role_id === r.id ? 'selected' : ''}>${r.display_name}</option>`).join('');
            
            document.getElementById('edit-user-status').value = user.account_status;
            openModal('edit-user-modal');
        }
        
        const deleteBtn = e.target.closest('.delete-user-btn');
        if(deleteBtn) {
             const userId = parseInt(deleteBtn.closest('tr').dataset.userId);
             const user = getUserById(userId);
             if(confirm(`Are you sure you want to delete user: ${user.username}?`)){
                 console.log(`Deleting user ${userId}`);
                 showToast(`User ${user.username} deleted.`, 'success');
             }
        }
    });

    document.getElementById('save-user-changes-btn').addEventListener('click', () => {
        const userId = document.getElementById('edit-user-id').value;
        const roleId = document.getElementById('edit-user-role').value;
        const status = document.getElementById('edit-user-status').value;
        console.log(`Saving User ${userId}: Role ID ${roleId}, Status ${status}`);
        closeModal();
        showToast('User updated successfully!', 'success');
        renderUserManagementTable();
    });

    // Roles & Permissions
    document.getElementById('roles-list').addEventListener('click', (e) => {
        const roleItem = e.target.closest('li');
        if (roleItem) {
            document.querySelectorAll('#roles-list li').forEach(li => li.classList.remove('active'));
            roleItem.classList.add('active');
            const roleId = parseInt(roleItem.dataset.roleId);
            renderPermissionsForRole(roleId);
        }
    });
    
    document.getElementById('create-role-btn').addEventListener('click', () => openModal('create-role-modal'));
    
    document.getElementById('confirm-create-role-btn').addEventListener('click', () => {
        const roleName = document.getElementById('new-role-name').value.trim();
        const displayName = document.getElementById('new-role-display-name').value.trim();
        const level = parseInt(document.getElementById('new-role-level').value);

        if (!roleName || !displayName || !level) {
            showToast('Please fill out all fields.', 'error');
            return;
        }

        const newRole = {
            id: Date.now(),
            name: roleName.toLowerCase().replace(/\s+/g, '_'),
            display_name: displayName,
            hierarchy_level: level
        };

        adminDb.system_roles.push(newRole);
        adminDb.system_roles.sort((a, b) => a.hierarchy_level - b.hierarchy_level);
        closeModal();
        document.getElementById('create-role-form').reset();
        renderRolesAndPermissions();
        showToast(`Role "${displayName}" created successfully!`, 'success');
    });

    // Audit & Security Tabs
    document.querySelector('.tabs-container').addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.tab-button');
        if (tabBtn) {
            const tabId = tabBtn.dataset.tab;
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            tabBtn.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        }
    });

    // System Settings -> Backup Schedules Event Listeners
    document.getElementById('create-schedule-btn').addEventListener('click', () => {
        document.getElementById('backup-schedule-form').reset();
        document.getElementById('schedule-id').value = '';
        document.getElementById('backup-schedule-modal-title').textContent = 'New Backup Schedule';
        openModal('backup-schedule-modal');
    });

    document.getElementById('backup-schedules-table').addEventListener('click', e => {
        const editBtn = e.target.closest('.edit-schedule-btn');
        if (editBtn) {
            const scheduleId = parseInt(editBtn.closest('tr').dataset.scheduleId);
            const schedule = adminDb.backup_schedules.find(s => s.id === scheduleId);
            
            document.getElementById('schedule-id').value = schedule.id;
            document.getElementById('schedule-name').value = schedule.schedule_name;
            document.getElementById('schedule-target').value = schedule.user_id || schedule.team_id || '';
            document.getElementById('schedule-frequency').value = schedule.frequency;
            document.getElementById('schedule-retention').value = schedule.retention_days;
            document.getElementById('schedule-active-toggle').checked = schedule.is_active;
            document.getElementById('backup-schedule-modal-title').textContent = 'Edit Backup Schedule';
            openModal('backup-schedule-modal');
        }
    });

    document.getElementById('save-schedule-btn').addEventListener('click', () => {
        const scheduleId = document.getElementById('schedule-id').value;
        const name = document.getElementById('schedule-name').value;
        
        if (!name) {
            showToast('Schedule Name is required.', 'error');
            return;
        }

        if (scheduleId) {
            console.log(`Updating schedule ${scheduleId}`);
            showToast('Backup schedule updated!', 'success');
        } else {
            console.log('Creating new schedule');
            showToast('Backup schedule created!', 'success');
        }
        
        closeModal();
        renderBackupSchedules();
    });

    // ===== INITIAL LOAD =====
    const init = () => {
        renderOverview();
        renderUserManagementTable();
        renderRolesAndPermissions();
        renderAuditLogs();
        renderSecurityIncidents();
        renderContentOversight();
        renderDriveAndBackups();
        renderBackupSchedules();
        showPage('overview-page');
    };

    init();
});