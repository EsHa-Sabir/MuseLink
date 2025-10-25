// This is an IIFE (Immediately Invoked Function Expression).
// It runs as soon as the file is loaded. It's empty here, which is fine.
// It was likely intended for initial setup that is now handled by Flask server-side.
(() => {
    // Flask handles authentication server-side, so no need for a client-side session check.
    // The welcome message is also personalized on the server using Jinja2 templates.

    // The logout button works with a simple link (href="/logout"), so no JavaScript is needed for it.
    // Flask will handle destroying the user's session when they click that link.
})();


// This event listener waits for the entire HTML document to be fully loaded and parsed
// before running the JavaScript code inside it. This prevents errors from trying
// to manipulate HTML elements that haven't been created yet.
document.addEventListener('DOMContentLoaded', () => {

    // ===== THEME TOGGLE LOGIC =====
    // This section handles switching between 'light' and 'dark' themes.
    const themeToggle = document.getElementById('theme-toggle'); // The toggle switch input
    const htmlEl = document.documentElement; // The root <html> element

    // Function to apply a theme to the page
    const applyTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme); // Sets the 'data-theme' attribute on the <html> tag
        if (themeToggle) themeToggle.checked = (theme === 'dark'); // Syncs the checkbox state with the theme
    };

    // Checks if a theme is saved in the browser's local storage. If not, defaults to 'dark'.
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme); // Applies the saved or default theme on page load

    // Adds a listener to the toggle switch
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light'; // Determine the new theme
            applyTheme(newTheme); // Apply the new theme
            localStorage.setItem('theme', newTheme); // Save the new theme to local storage
        });
    }

    // ===== DATABASE SIMULATION (100% ALIGNED WITH SCHEMA) =====
    // This 'db' object acts as a fake, temporary database in the browser.
    // It holds all the sample data for users, teams, ideas, etc.,
    // allowing the dashboard to function without a real backend connection.
    const db = {
        users: {
            101: { id: 101, email: 'creative.user@example.com', username: 'CreativeUser', first_name: 'You', last_name: 'Creative', initials: 'YC', is_active: true, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-09-15T11:00:00Z' },
            102: { id: 102, email: 'alice@example.com', username: 'alice_design', first_name: 'Alice', last_name: 'Designer', initials: 'AD', is_active: true, created_at: '2025-01-02T10:00:00Z', updated_at: '2025-09-16T11:00:00Z' },
            103: { id: 103, email: 'bob@example.com', username: 'bob_writes', first_name: 'Bob', last_name: 'Writer', initials: 'BW', is_active: true, created_at: '2025-01-03T10:00:00Z', updated_at: '2025-09-17T11:00:00Z' },
            104: { id: 104, email: 'charlie@example.com', username: 'charlie_pm', first_name: 'Charlie', last_name: 'Manager', initials: 'CM', is_active: true, created_at: '2025-01-04T10:00:00Z', updated_at: '2025-09-18T11:00:00Z' }
        },
        teams: [
            { id: 1, name: 'Marketing Crew', description: 'Team for all marketing and campaign initiatives.', owner_id: 101, team_key_encrypted: '...', created_at: '2025-09-01T10:00:00Z', updated_at: '2025-09-01T10:00:00Z', is_active: true },
            { id: 2, name: 'Product Launch Pod', description: 'Dedicated pod for the upcoming Q4 product launch.', owner_id: 101, team_key_encrypted: '...', created_at: '2025-08-15T14:00:00Z', updated_at: '2025-08-15T14:00:00Z', is_active: true }
        ],
        team_members: [
            { id: 1, team_id: 1, user_id: 101, role: 'owner', team_key_encrypted: '...', joined_at: '2025-09-01T10:00:00Z', added_by: 101, is_active: true },
            { id: 2, team_id: 1, user_id: 102, role: 'admin', team_key_encrypted: '...', joined_at: '2025-09-01T10:05:00Z', added_by: 101, is_active: true },
            { id: 3, team_id: 1, user_id: 103, role: 'member', team_key_encrypted: '...', joined_at: '2025-09-02T11:00:00Z', added_by: 102, is_active: true },
            { id: 4, team_id: 2, user_id: 101, role: 'owner', team_key_encrypted: '...', joined_at: '2025-08-15T14:00:00Z', added_by: 101, is_active: true },
            { id: 5, team_id: 2, user_id: 104, role: 'member', team_key_encrypted: '...', joined_at: '2025-08-16T09:00:00Z', added_by: 101, is_active: true }
        ],
        messages: [
             // Direct Messages
            { id: 1, sender_id: 102, receiver_id: 101, team_id: null, subject: null, content_sender: 'Encrypted for Alice', content_receiver: 'Hey! Just reviewed the brief for the Q3 campaign. Looks great.', is_read: false, read_at: null, created_at: '2025-10-05T12:30:00Z' },
            { id: 2, sender_id: 101, receiver_id: 102, team_id: null, subject: null, content_sender: 'Great, I have a few ideas I want to add. Let\'s sync up tomorrow morning.', content_receiver: 'Encrypted for Alice', is_read: true, read_at: '2025-10-05T12:31:00Z', created_at: '2025-10-05T12:30:50Z' },
            { id: 3, sender_id: 103, receiver_id: 101, team_id: null, subject: null, content_sender: 'Encrypted for Bob', content_receiver: 'Just wanted to confirm the deadline for the annual report copy. Is it still this Friday?', is_read: true, read_at: '2025-10-03T18:00:00Z', created_at: '2025-10-03T17:45:00Z' },
             // Team Messages
            { id: 4, sender_id: 101, receiver_id: null, team_id: 1, subject: null, content_sender: 'Hey team, let\'s kick off the Q3 campaign discussion!', content_receiver: null, is_read: true, read_at: null, created_at: '2025-10-04T09:00:00Z' },
            { id: 5, sender_id: 102, receiver_id: null, team_id: 1, subject: null, content_sender: 'Sounds good! I have some design mockups ready.', content_receiver: null, is_read: true, read_at: null, created_at: '2025-10-04T09:05:00Z' },
            { id: 6, sender_id: 104, receiver_id: null, team_id: 2, subject: null, content_sender: 'Reminder: Final script for the launch video is due EOD.', content_receiver: null, is_read: true, read_at: null, created_at: '2025-10-05T10:00:00Z' }
        ],
        ideas: [
            { id: 1, title_encrypted: 'Q3 Social Media Blitz', description_encrypted: 'A comprehensive social media strategy for Q3.', content_encrypted: 'Initial concept for the Q3 social media campaign focusing on user-generated content and viral trends.', owner_id: 101, team_id: 1, status: 'in_progress', encryption_iv: '...', encryption_tag: '...', created_at: '2025-10-03T11:00:00Z', updated_at: '2025-10-03T11:00:00Z', is_deleted: false },
            { id: 2, title_encrypted: 'New Product Launch Script', description_encrypted: 'Video script for the new product.', content_encrypted: 'Final script for the product launch video. Ready for production.', owner_id: 101, team_id: 2, status: 'completed', encryption_iv: '...', encryption_tag: '...', created_at: '2025-09-28T09:00:00Z', updated_at: '2025-10-01T15:00:00Z', is_deleted: false },
            { id: 3, title_encrypted: 'Winter Holiday Emailer', description_encrypted: 'An email campaign for the holiday season.', content_encrypted: 'Draft of the Winter Holiday email campaign. Needs refinement and images.', owner_id: 101, team_id: null, status: 'draft', encryption_iv: '...', encryption_tag: '...', created_at: '2025-10-04T18:00:00Z', updated_at: '2025-10-04T18:00:00Z', is_deleted: false },
            { id: 4, title_encrypted: 'Annual Report Copy', description_encrypted: 'Drafting the copy for the 2025 annual report.', content_encrypted: 'Copy for the annual report, pending stakeholder review.', owner_id: 101, team_id: 1, status: 'review', encryption_iv: '...', encryption_tag: '...', created_at: '2025-10-01T12:00:00Z', updated_at: '2025-10-02T16:30:00Z', is_deleted: false },
            { id: 5, title_encrypted: 'Old Brand Campaign', description_encrypted: 'An archived campaign from a previous year.', content_encrypted: 'Archived campaign from last year.', owner_id: 101, team_id: null, status: 'archived', encryption_iv: '...', encryption_tag: '...', created_at: '2024-03-15T09:00:00Z', updated_at: '2024-04-01T10:00:00Z', is_deleted: false },
        ],
        idea_contributors: [
            { id: 1, idea_id: 1, user_id: 101, role: 'editor', added_at: '2025-10-03T11:00:00Z', added_by: 101 }, { id: 2, idea_id: 1, user_id: 102, role: 'editor', added_at: '2025-10-03T12:00:00Z', added_by: 101 },
            { id: 3, idea_id: 2, user_id: 101, role: 'editor', added_at: '2025-09-28T09:00:00Z', added_by: 101 }, { id: 4, idea_id: 2, user_id: 104, role: 'viewer', added_at: '2025-09-29T10:00:00Z', added_by: 101 },
            { id: 5, idea_id: 3, user_id: 101, role: 'editor', added_at: '2025-10-04T18:00:00Z', added_by: 101 },
            { id: 6, idea_id: 4, user_id: 101, role: 'editor', added_at: '2025-10-01T12:00:00Z', added_by: 101 }, { id: 7, idea_id: 4, user_id: 102, role: 'viewer', added_at: '2025-10-01T13:00:00Z', added_by: 101 }, { id: 8, idea_id: 4, user_id: 103, role: 'viewer', added_at: '2025-10-01T14:00:00Z', added_by: 101 },
        ],
        idea_versions: {
            1: [
                { id: 1, idea_id: 1, version_number: 1, content_encrypted: 'Just a placeholder idea.', encryption_iv: '...', encryption_tag: '...', created_by: 101, created_at: '2025-10-01T10:00:00Z', change_description_encrypted: 'Initial commit.' },
                { id: 2, idea_id: 1, version_number: 2, content_encrypted: 'Adding more detail about the viral trend aspect.', encryption_iv: '...', encryption_tag: '...', created_by: 102, created_at: '2025-10-02T15:30:00Z', change_description_encrypted: 'Expanded on viral marketing angles.' },
                { id: 3, idea_id: 1, version_number: 3, content_encrypted: 'Initial concept for the Q3 social media campaign focusing on user-generated content and viral trends.', encryption_iv: '...', encryption_tag: '...', created_by: 101, created_at: '2025-10-03T11:00:00Z', change_description_encrypted: 'Finalized initial brief content.' }
            ],
            2: [
                { id: 4, idea_id: 2, version_number: 1, content_encrypted: 'First draft of the script.', encryption_iv: '...', encryption_tag: '...', created_by: 101, created_at: '2025-09-25T14:00:00Z', change_description_encrypted: 'Script first pass.' },
                { id: 5, idea_id: 2, version_number: 2, content_encrypted: 'Final script for the product launch video. Ready for production.', encryption_iv: '...', encryption_tag: '...', created_by: 104, created_at: '2025-09-28T09:00:00Z', change_description_encrypted: 'Incorporated feedback and finalized script.' }
            ]
        },
        drive_folders: [
            { id: 1, name_encrypted: 'Personal Projects', owner_id: 101, team_id: null, parent_folder_id: null, encryption_iv: '...', created_at: '2025-01-10T09:00:00Z', updated_at: '2025-01-10T09:00:00Z', is_deleted: false },
            { id: 2, name_encrypted: 'Brand Assets', owner_id: null, team_id: 1, parent_folder_id: null, encryption_iv: '...', created_at: '2025-09-01T10:15:00Z', updated_at: '2025-09-01T10:15:00Z', is_deleted: false },
            { id: 3, name_encrypted: 'Scripts', owner_id: null, team_id: 2, parent_folder_id: null, encryption_iv: '...', created_at: '2025-08-15T14:20:00Z', updated_at: '2025-08-15T14:20:00Z', is_deleted: false },
            { id: 4, name_encrypted: 'Nested Test', owner_id: 101, team_id: null, parent_folder_id: 1, encryption_iv: '...', created_at: '2025-02-01T11:00:00Z', updated_at: '2025-02-01T11:00:00Z', is_deleted: false },
        ],
        drive_files: [
            { id: 1, filename_encrypted: 'Logo_Primary.svg', file_path: 'uuid-path-1', file_size: 15360, mime_type_encrypted: 'image/svg+xml', owner_id: null, team_id: 1, folder_id: 2, encryption_iv: '...', encryption_tag: '...', checksum: '...', created_at: '2025-09-01T10:20:00Z', updated_at: '2025-09-01T10:20:00Z', is_deleted: false, metadata_stripped: true },
            { id: 2, filename_encrypted: 'Brand_Guidelines.pdf', file_path: 'uuid-path-2', file_size: 2097152, mime_type_encrypted: 'application/pdf', owner_id: null, team_id: 1, folder_id: 2, encryption_iv: '...', encryption_tag: '...', checksum: '...', created_at: '2025-09-01T10:25:00Z', updated_at: '2025-09-01T10:25:00Z', is_deleted: false, metadata_stripped: true }
        ],
        notes: [
            { id: 1, title_encrypted: 'My Secret Ideas', content_encrypted: 'World domination plan.', owner_id: 101, team_id: null, folder_id: 1, encryption_iv: '...', encryption_tag: '...', created_at: '2025-03-20T18:00:00Z', updated_at: '2025-03-21T10:00:00Z', is_deleted: false, is_pinned: true },
            { id: 2, title_encrypted: 'Launch Video Notes', content_encrypted: 'Notes for the launch video.', owner_id: null, team_id: 2, folder_id: 3, encryption_iv: '...', encryption_tag: '...', created_at: '2025-08-17T13:00:00Z', updated_at: '2025-08-17T13:00:00Z', is_deleted: false, is_pinned: false }
        ],
        backup_schedules: [
            { id: 1, user_id: 101, team_id: null, schedule_name: 'My Personal Backup', backup_type: 'full', frequency: 'weekly', retention_days: 30, is_active: true, last_backup_at: '2025-10-01T02:00:00Z', next_backup_at: '2025-10-08T02:00:00Z', created_at: '2025-01-15T00:00:00Z', updated_at: '2025-10-01T02:00:00Z' }
        ],
        brandTrainingFiles: ['Approved_Copy_Q2.pdf', 'Brand_Voice_Guide_v3.docx'],
        projectTasks: [
            { id: 1, idea_id: 1, title: 'Design social media graphics', description: 'Create 10 Instagram posts', assignee_id: 102, status: 'in_progress', priority: 'high', due_date: '2025-10-10', created_by: 101, created_at: '2025-10-04T09:00:00Z' },
            { id: 2, idea_id: 1, title: 'Write captions', description: 'Engaging captions for all posts', assignee_id: 103, status: 'todo', priority: 'medium', due_date: '2025-10-12', created_by: 101, created_at: '2025-10-04T09:15:00Z' },
            { id: 3, idea_id: 1, title: 'Schedule posts', description: 'Use scheduling tool', assignee_id: 101, status: 'todo', priority: 'low', due_date: '2025-10-15', created_by: 101, created_at: '2025-10-04T09:30:00Z' },
            { id: 4, idea_id: 2, title: 'Final review', description: 'Review script with stakeholders', assignee_id: 104, status: 'done', priority: 'high', due_date: '2025-10-01', created_by: 101, created_at: '2025-09-28T10:00:00Z' }
        ],
        projectNotes: [
            { id: 1, idea_id: 1, title: 'Brand Guidelines', content: 'Remember to use brand colors: #C87533 for primary, keep tone casual and friendly.', created_by: 101, created_at: '2025-10-04T10:00:00Z', updated_at: '2025-10-04T10:00:00Z' },
            { id: 2, idea_id: 1, title: 'Target Audience Insights', content: 'Focus on Gen Z and Millennials, they respond well to authentic, behind-the-scenes content.', created_by: 102, created_at: '2025-10-04T11:30:00Z', updated_at: '2025-10-04T11:30:00Z' }
        ],
        projectTimeline: [
            { id: 1, idea_id: 1, event_type: 'created', title: 'Project Created', description: 'Q3 Social Media Blitz project initiated', user_id: 101, created_at: '2025-10-03T11:00:00Z' },
            { id: 2, idea_id: 1, event_type: 'member_added', title: 'Alice joined the project', description: 'Added as editor', user_id: 102, created_at: '2025-10-03T12:00:00Z' },
            { id: 3, idea_id: 1, event_type: 'task_created', title: 'Task created: Design social media graphics', description: 'Assigned to Alice', user_id: 101, created_at: '2025-10-04T09:00:00Z' },
            { id: 4, idea_id: 1, event_type: 'note_added', title: 'Note added: Brand Guidelines', description: 'Important brand information documented', user_id: 101, created_at: '2025-10-04T10:00:00Z' },
            { id: 5, idea_id: 1, event_type: 'comment', title: 'Alice commented', description: 'Looks great! I\'ll start on the graphics today.', user_id: 102, created_at: '2025-10-04T14:30:00Z' }
        ],
        projectChat: [
            { id: 1, idea_id: 1, user_id: 101, message: 'Hey team! Let\'s make this campaign amazing!', created_at: '2025-10-04T09:00:00Z' },
            { id: 2, idea_id: 1, user_id: 102, message: 'Excited to work on this! I have some great ideas for the visuals.', created_at: '2025-10-04T09:15:00Z' },
            { id: 3, idea_id: 1, user_id: 103, message: 'I\'ll focus on creating engaging captions that resonate with our audience.', created_at: '2025-10-04T09:30:00Z' }
        ],
        projectFiles: [
            { id: 1, idea_id: 1, filename: 'Brand_Colors.pdf', file_size: 524288, uploaded_by: 101, created_at: '2025-10-04T10:30:00Z' },
            { id: 2, idea_id: 1, filename: 'Mockup_v1.psd', file_size: 15728640, uploaded_by: 102, created_at: '2025-10-04T15:00:00Z' }
        ]
    };

    // --- Global State Variables ---
    const currentUser = { id: 101 }; // Simulates the currently logged-in user.
    let currentDriveLocation = { type: 'my-drive', folderId: null }; // Tracks the current folder in the Drive page.
    let activeChat = { type: null, id: null }; // Tracks the currently open conversation.
    
    // --- Helper Functions ---
    // These small functions help avoid repeating code.
    const getUser = (userId) => db.users[userId]; // Gets a user object by their ID.
    const getUserName = (userId) => {
        const user = getUser(userId);
        return user ? `${user.first_name} ${user.last_name}` : 'Unknown User';
    };
    const getUserInitials = (userId) => {
        const user = getUser(userId);
        return user ? user.initials : '??';
    }
    
    // HTML string for the little lock icon that indicates encryption.
    const encryptionIconHTML = `<span class="encryption-indicator" data-tooltip="End-to-end encrypted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>`;
    
    // Creates an HTML string for a user avatar circle with their initials.
    const createAvatar = (initials, size = '36px') => `<div class="avatar" style="width:${size}; height:${size}; font-size: calc(${size} / 2.2);">${initials}</div>`;

    // ===== CORE APP LOGIC =====
    // This section controls the main navigation and page switching.
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item, .sidebar-footer .nav-item');
    const pages = document.querySelectorAll('.page');

    // Function to show a specific page and hide all others
    const showPage = (pageId) => {
        pages.forEach(page => page.classList.toggle('is-active', page.id === pageId)); // Show the target page
        navItems.forEach(item => item.classList.toggle('active', item.dataset.page === pageId)); // Highlight the active nav link
        document.body.classList.remove('nav-open'); // Close mobile nav overlay if open
        sidebar.classList.remove('open'); // Close mobile nav if open
        // Special logic for the messages page to reset the view
        if (pageId === 'messages-page') {
            renderConversationList();
            document.getElementById('chat-view').classList.add('hidden');
            document.getElementById('chat-placeholder').classList.remove('hidden');
        }
    };

    // Add click listeners to all navigation items
    navItems.forEach(item => item.addEventListener('click', (e) => {
        const pageId = item.dataset.page;
        if (pageId) {
            e.preventDefault(); // Prevent the link from navigating away
            showPage(pageId);
        }
    }));

    // Desktop sidebar collapse/expand toggle
    if (sidebarToggle) sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    
    // Mobile sidebar open/close toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
            sidebar.classList.toggle('open');
        });
    }

    // Close mobile sidebar if user clicks outside of it
    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'BODY' && document.body.classList.contains('nav-open')) {
            document.body.classList.remove('nav-open');
            sidebar.classList.remove('open');
        }
    });

    // ===== AI STUDIO TABS =====
    // Handles switching between Text, Image, Video, and Voice tabs on the "Create Idea" page.
    const studioTabs = document.querySelectorAll('.studio-tab');
    const studioContents = document.querySelectorAll('.studio-content');

    studioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            studioTabs.forEach(t => t.classList.remove('active'));
            studioContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${targetTab}-studio`).classList.add('active');
        });
    });

    // ===== MFA MODAL LOGIC =====
    // Manages the multi-step process for setting up Multi-Factor Authentication.
    const mfaToggle = document.getElementById('mfa-toggle-checkbox');
    const mfaModalOverlay = document.getElementById('mfa-modal-overlay');
    const mfaModal = document.getElementById('mfa-setup-modal');
    const closeMfaModal = document.getElementById('close-mfa-modal');
    const mfaNextBtn = document.getElementById('mfa-next-btn');
    const mfaPrevBtn = document.getElementById('mfa-prev-btn');
    const mfaFinishBtn = document.getElementById('mfa-finish-btn');
    let currentMfaStep = 1;

    // Function to show the correct step in the MFA modal
    const showMfaStep = (step) => {
        // Show the correct step content
        document.querySelectorAll('.mfa-step').forEach((s, i) => {
            s.classList.toggle('active', i + 1 === step);
        });
        // Highlight the correct step dot indicator
        document.querySelectorAll('.step-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i + 1 === step);
        });

        // Show/hide the Previous, Next, and Finish buttons based on the current step
        mfaPrevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
        mfaNextBtn.style.display = step < 3 ? 'inline-flex' : 'none';
        mfaFinishBtn.style.display = step === 3 ? 'inline-flex' : 'none';
    };

    // When the MFA toggle is checked, open the modal
    if (mfaToggle) {
        mfaToggle.addEventListener('change', () => {
            if (mfaToggle.checked) {
                currentMfaStep = 1;
                showMfaStep(1);
                mfaModalOverlay.classList.add('active');
                mfaModal.classList.add('active');
            } else {
                alert('MFA has been disabled.'); // If unchecked
            }
        });
    }

    // Close the MFA modal
    if (closeMfaModal) {
        closeMfaModal.addEventListener('click', () => {
            mfaModalOverlay.classList.remove('active');
            mfaModal.classList.remove('active');
            if (mfaToggle) mfaToggle.checked = false; // Uncheck the toggle if setup is cancelled
        });
    }

    // Go to the next step
    if (mfaNextBtn) {
        mfaNextBtn.addEventListener('click', () => {
            if (currentMfaStep < 3) {
                currentMfaStep++;
                showMfaStep(currentMfaStep);
            }
        });
    }

    // Go to the previous step
    if (mfaPrevBtn) {
        mfaPrevBtn.addEventListener('click', () => {
            if (currentMfaStep > 1) {
                currentMfaStep--;
                showMfaStep(currentMfaStep);
            }
        });
    }

    // Finish the MFA setup
    if (mfaFinishBtn) {
        mfaFinishBtn.addEventListener('click', () => {
            const code = document.getElementById('mfa-code').value;
            if (code.length === 6) { // Simple validation
                alert('MFA has been successfully enabled!');
                mfaModalOverlay.classList.remove('active');
                mfaModal.classList.remove('active');
            } else {
                alert('Please enter a valid 6-digit code.');
            }
        });
    }
    
    // Close modal if user clicks on the overlay background
    mfaModalOverlay.addEventListener('click', (e) => {
        if (e.target === mfaModalOverlay) {
            mfaModalOverlay.classList.remove('active');
            mfaModal.classList.remove('active');
            if (mfaToggle) mfaToggle.checked = false;
        }
    });

    // ===== AI GENERATION FORM HANDLERS =====
    // These listeners handle the "Generate" buttons for Image, Video, and Voice.
    const imageForm = document.getElementById('image-form');
    const videoForm = document.getElementById('video-form');
    const voiceForm = document.getElementById('voice-form');

    if (imageForm) {
        imageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const prompt = document.getElementById('image-prompt').value;
            const style = document.getElementById('image-style').value;
            const ratio = document.getElementById('image-ratio').value;
            
            alert(`Generating images with:\nPrompt: ${prompt}\nStyle: ${style}\nRatio: ${ratio}\n\n(AI generation would happen here)`);
            
            showPage('draft-results-page');
            renderAIResults('image', { prompt, style, ratio });
        });
    }

    if (videoForm) {
        videoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const prompt = document.getElementById('video-prompt').value;
            const duration = document.getElementById('video-duration').value;
            const style = document.getElementById('video-style').value;
            
            alert(`Generating video with:\nPrompt: ${prompt}\nDuration: ${duration}s\nStyle: ${style}\n\n(AI generation would happen here)`);
            
            showPage('draft-results-page');
            renderAIResults('video', { prompt, duration, style });
        });
    }

    if (voiceForm) {
        voiceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = document.getElementById('voice-text').value;
            const voiceType = document.getElementById('voice-type').value;
            const speed = document.getElementById('voice-speed').value;
            
            alert(`Generating voice with:\nText: ${text.substring(0, 50)}...\nVoice: ${voiceType}\nSpeed: ${speed}x\n\n(AI generation would happen here)`);
            
            showPage('draft-results-page');
            renderAIResults('voice', { text, voiceType, speed });
        });
    }
    
    // Function to render the simulated AI results on the results page
    const renderAIResults = (type, data) => {
        const resultsGrid = document.getElementById('results-grid-container');
        const resultsTitle = document.getElementById('results-page-title');
        
        const typeLabels = {
            'image': 'Generated Images',
            'video': 'Generated Videos',
            'voice': 'Generated Voice',
            'text': 'Generated Drafts'
        };
        
        resultsTitle.textContent = typeLabels[type] || 'Generated Content';
        
        // Create some fake results to display
        const mockResults = [
            { id: 1, title: `${type.charAt(0).toUpperCase() + type.slice(1)} Variation 1`, preview: '🎨 AI Generated Content' },
            { id: 2, title: `${type.charAt(0).toUpperCase() + type.slice(1)} Variation 2`, preview: '✨ Creative Output' },
            { id: 3, title: `${type.charAt(0).toUpperCase() + type.slice(1)} Variation 3`, preview: '🚀 Innovative Design' }
        ];
        
        resultsGrid.innerHTML = mockResults.map(result => `
            <div class="result-card card">
                <h3>${result.title}</h3>
                <div class="result-preview">${result.preview}</div>
                <p>This is a simulated AI-generated ${type}. In production, this would show actual generated content.</p>
                <div class="result-card-actions">
                    <button class="btn btn-secondary share-result-btn" data-id="${result.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        Share
                    </button>
                    <button class="btn btn-primary download-result-btn" data-id="${result.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add listeners for the new Share and Download buttons
        document.querySelectorAll('.share-result-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('share-modal-overlay').classList.add('active');
                document.getElementById('share-modal').classList.add('active');
            });
        });
        
        document.querySelectorAll('.download-result-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Download functionality would be implemented here.');
            });
        });
    };

    // --- Share Modal Handlers ---
    const shareModalOverlay = document.getElementById('share-modal-overlay');
    const shareModal = document.getElementById('share-modal');
    const closeShareModal = document.getElementById('close-share-modal');
    const cancelShareBtn = document.getElementById('cancel-share-btn');
    const confirmShareBtn = document.getElementById('confirm-share-btn');

    if (closeShareModal) {
        closeShareModal.addEventListener('click', () => {
            shareModalOverlay.classList.remove('active');
            shareModal.classList.remove('active');
        });
    }

    if (cancelShareBtn) {
        cancelShareBtn.addEventListener('click', () => {
            shareModalOverlay.classList.remove('active');
            shareModal.classList.remove('active');
        });
    }

    if (confirmShareBtn) {
        confirmShareBtn.addEventListener('click', () => {
            const teamId = document.getElementById('share-team-select').value;
            const message = document.getElementById('share-message').value;
            
            if (teamId) {
                alert(`Content shared with team! Message: ${message || 'No message'}`);
                shareModalOverlay.classList.remove('active');
                shareModal.classList.remove('active');
            } else {
                alert('Please select a team.');
            }
        });
    }

    shareModalOverlay.addEventListener('click', (e) => {
        if (e.target === shareModalOverlay) {
            shareModalOverlay.classList.remove('active');
            shareModal.classList.remove('active');
        }
    });

    // Fills the team dropdown in the share modal
    const populateTeamSelect = () => {
        const select = document.getElementById('share-team-select');
        if (select) {
            select.innerHTML = '<option value="">Choose a team...</option>' + 
                db.teams.map(team => `<option value="${team.id}">${team.name}</option>`).join('');
        }
    };

    // ===== PROJECT WORKSPACE MODAL =====
    // This section manages the large modal for viewing and managing a single project.
    let currentProjectId = null; // Keeps track of which project is open
    const projectWorkspaceOverlay = document.getElementById('project-workspace-overlay');
    const projectWorkspaceModal = document.getElementById('project-workspace-modal');
    const closeProjectWorkspace = document.getElementById('close-project-workspace');

    // Function to open the workspace for a specific idea
    const openProjectWorkspace = (ideaId) => {
        currentProjectId = ideaId;
        const idea = db.ideas.find(i => i.id === ideaId);
        if (!idea) return;

        // Set header info (title, status)
        document.getElementById('project-workspace-title').textContent = idea.title_encrypted;
        document.getElementById('project-workspace-status').textContent = idea.status.replace('_', ' ');
        document.getElementById('project-workspace-status').className = `status-badge status-${idea.status.replace('_', '-')}`;

        // Load content for all tabs
        renderProjectOverview(ideaId);
        renderProjectTimeline(ideaId);
        renderProjectTasks(ideaId);
        renderProjectNotes(ideaId);
        renderProjectChat(ideaId);
        renderProjectFiles(ideaId);

        // Show the modal
        projectWorkspaceOverlay.classList.add('active');
        projectWorkspaceModal.classList.add('active');
    };

    // Function to close the workspace modal
    const closeProjectWorkspaceModal = () => {
        projectWorkspaceOverlay.classList.remove('active');
        projectWorkspaceModal.classList.remove('active');
        currentProjectId = null;
    };

    if (closeProjectWorkspace) {
        closeProjectWorkspace.addEventListener('click', closeProjectWorkspaceModal);
    }

    projectWorkspaceOverlay.addEventListener('click', (e) => {
        if (e.target === projectWorkspaceOverlay) {
            closeProjectWorkspaceModal();
        }
    });

    // --- Workspace tab navigation ---
    const workspaceNavItems = document.querySelectorAll('.workspace-nav-item');
    const workspaceTabContents = document.querySelectorAll('.workspace-tab-content');

    workspaceNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.dataset.workspaceTab;
            
            workspaceNavItems.forEach(nav => nav.classList.remove('active'));
            workspaceTabContents.forEach(content => content.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(`workspace-${tabId}`).classList.add('active');
        });
    });

    // --- Functions to render content for each workspace tab ---
    const renderProjectOverview = (ideaId) => {
        const idea = db.ideas.find(i => i.id === ideaId);
        document.getElementById('project-description-text').textContent = idea.description_encrypted;

        const contributors = db.idea_contributors.filter(c => c.idea_id === ideaId);
        const teamMembersGrid = document.getElementById('project-team-members');
        teamMembersGrid.innerHTML = contributors.map(c => {
            const user = db.users[c.user_id];
            return `
                <div class="team-member-card">
                    ${createAvatar(user.initials, '48px')}
                    <div class="name">${user.first_name} ${user.last_name}</div>
                    <div class="role">${c.role}</div>
                </div>
            `;
        }).join('');

        const tasks = db.projectTasks.filter(t => t.idea_id === ideaId);
        const completedTasks = tasks.filter(t => t.status === 'done');
        const notes = db.projectNotes.filter(n => n.idea_id === ideaId);
        const files = db.projectFiles.filter(f => f.idea_id === ideaId);

        document.getElementById('stat-tasks').textContent = tasks.length;
        document.getElementById('stat-completed').textContent = completedTasks.length;
        document.getElementById('stat-notes').textContent = notes.length;
        document.getElementById('stat-files').textContent = files.length;
    };

    const renderProjectTimeline = (ideaId) => {
        const timeline = db.projectTimeline.filter(t => t.idea_id === ideaId);
        const timelineContainer = document.getElementById('project-timeline');
        
        timelineContainer.innerHTML = timeline.map(event => {
            const user = db.users[event.user_id];
            const timeAgo = getTimeAgo(event.created_at);
            
            return `
                <div class="timeline-event">
                    <div class="timeline-event-header">
                        <div class="timeline-event-title">${event.title}</div>
                        <div class="timeline-event-time">${timeAgo}</div>
                    </div>
                    <div class="timeline-event-content">${event.description}</div>
                    <div class="timeline-event-meta">
                        ${createAvatar(user.initials, '20px')}
                        <span>${user.first_name} ${user.last_name}</span>
                    </div>
                </div>
            `;
        }).join('');
    };

    const renderProjectTasks = (ideaId) => {
        const tasks = db.projectTasks.filter(t => t.idea_id === ideaId);
        
        const statusColumns = {
            'todo': document.getElementById('tasks-todo'),
            'in_progress': document.getElementById('tasks-inprogress'),
            'review': document.getElementById('tasks-review'),
            'done': document.getElementById('tasks-done')
        };

        Object.values(statusColumns).forEach(col => col.innerHTML = '');

        tasks.forEach(task => {
            const assignee = task.assignee_id ? db.users[task.assignee_id] : null;
            const dueDate = task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date';
            
            const taskHTML = `
                <div class="task-card" data-task-id="${task.id}">
                    <div class="task-card-header">
                        <div class="task-card-title">${task.title}</div>
                        <div class="task-priority ${task.priority}">${task.priority}</div>
                    </div>
                    <div class="task-card-description">${task.description}</div>
                    <div class="task-card-footer">
                        <div class="task-assignee">
                            ${assignee ? createAvatar(assignee.initials, '24px') + `<span>${assignee.first_name}</span>` : '<span>Unassigned</span>'}
                        </div>
                        <div class="task-due-date">${dueDate}</div>
                    </div>
                </div>
            `;
            
            const column = statusColumns[task.status];
            if (column) {
                column.innerHTML += taskHTML;
            }
        });

        document.querySelectorAll('.task-column').forEach((col, index) => {
            const status = ['todo', 'in_progress', 'review', 'done'][index];
            const count = tasks.filter(t => t.status === status).length;
            col.querySelector('.task-count').textContent = count;
        });
    };

    const renderProjectNotes = (ideaId) => {
        const notes = db.projectNotes.filter(n => n.idea_id === ideaId);
        const notesGrid = document.getElementById('project-notes');
        
        notesGrid.innerHTML = notes.map(note => {
            const author = db.users[note.created_by];
            const timeAgo = getTimeAgo(note.created_at);
            
            return `
                <div class="note-card">
                    <div class="note-card-header">
                        <div class="note-card-title">${note.title}</div>
                        <div class="note-card-actions">
                            <button class="note-action-btn" title="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </button>
                            <button class="note-action-btn" title="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div class="note-card-content">${note.content}</div>
                    <div class="note-card-footer">
                        <span>${author.first_name} ${author.last_name}</span>
                        <span>${timeAgo}</span>
                    </div>
                </div>
            `;
        }).join('');
    };

    const renderProjectChat = (ideaId) => {
        const messages = db.projectChat.filter(m => m.idea_id === ideaId);
        const chatMessages = document.getElementById('project-chat-messages');
        
        chatMessages.innerHTML = messages.map(msg => {
            const user = db.users[msg.user_id];
            const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return `
                <div class="chat-message">
                    ${createAvatar(user.initials, '36px')}
                    <div class="chat-message-content">
                        <div class="chat-message-header">
                            <span class="chat-message-author">${user.first_name} ${user.last_name}</span>
                            <span class="chat-message-time">${time}</span>
                        </div>
                        <div class="chat-message-text">${msg.message}</div>
                    </div>
                </div>
            `;
        }).join('');

        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    };

    // Handle form submission for project chat
    const projectChatForm = document.getElementById('project-chat-form');
    if (projectChatForm) {
        projectChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('project-chat-input');
            const message = input.value.trim();
            
            if (message && currentProjectId) {
                // Add the new message to our fake database
                db.projectChat.push({
                    id: db.projectChat.length + 1,
                    idea_id: currentProjectId,
                    user_id: currentUser.id,
                    message: message,
                    created_at: new Date().toISOString()
                });
                
                renderProjectChat(currentProjectId); // Re-render the chat to show the new message
                input.value = '';
            }
        });
    }

    const renderProjectFiles = (ideaId) => {
        const files = db.projectFiles.filter(f => f.idea_id === ideaId);
        const filesGrid = document.getElementById('project-files');
        
        filesGrid.innerHTML = files.map(file => {
            const uploader = db.users[file.uploaded_by];
            const fileSize = (file.file_size / 1024 / 1024).toFixed(2) + ' MB';
            const icon = file.filename.endsWith('.pdf') ? '📄' : file.filename.endsWith('.psd') ? '🎨' : '📎';
            
            return `
                <div class="project-file-card">
                    <div class="project-file-icon">${icon}</div>
                    <div class="project-file-name">${file.filename}</div>
                    <div class="project-file-meta">
                        ${fileSize} • ${uploader.first_name}
                    </div>
                </div>
            `;
        }).join('');
    };

    // Helper function to format time differences (e.g., "5 minutes ago")
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
        return date.toLocaleDateString();
    };

    // --- Add Task Modal Logic ---
    const addTaskOverlay = document.getElementById('add-task-overlay');
    const addTaskModal = document.getElementById('add-task-modal');
    const addTaskBtn = document.getElementById('add-task-btn');
    const closeAddTask = document.getElementById('close-add-task');
    const cancelAddTask = document.getElementById('cancel-add-task');
    const confirmAddTask = document.getElementById('confirm-add-task');

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            // Populate the "Assign To" dropdown with project contributors
            const assigneeSelect = document.getElementById('task-assignee');
            const contributors = db.idea_contributors.filter(c => c.idea_id === currentProjectId);
            assigneeSelect.innerHTML = '<option value="">Unassigned</option>' + 
                contributors.map(c => {
                    const user = db.users[c.user_id];
                    return `<option value="${user.id}">${user.first_name} ${user.last_name}</option>`;
                }).join('');
            
            addTaskOverlay.classList.add('active');
            addTaskModal.classList.add('active');
        });
    }

    const closeAddTaskModal = () => {
        addTaskOverlay.classList.remove('active');
        addTaskModal.classList.remove('active');
        document.getElementById('add-task-form').reset();
    };

    if (closeAddTask) closeAddTask.addEventListener('click', closeAddTaskModal);
    if (cancelAddTask) cancelAddTask.addEventListener('click', closeAddTaskModal);

    if (confirmAddTask) {
        confirmAddTask.addEventListener('click', () => {
            const title = document.getElementById('task-title').value;
            const description = document.getElementById('task-description').value;
            const assigneeId = document.getElementById('task-assignee').value;
            const priority = document.getElementById('task-priority').value;
            const dueDate = document.getElementById('task-due-date').value;
            
            if (title && currentProjectId) {
                // Add the new task to the fake database
                db.projectTasks.push({
                    id: db.projectTasks.length + 1,
                    idea_id: currentProjectId,
                    title: title,
                    description: description,
                    assignee_id: assigneeId ? parseInt(assigneeId) : null,
                    status: 'todo', // New tasks always start in "To Do"
                    priority: priority,
                    due_date: dueDate || null,
                    created_by: currentUser.id,
                    created_at: new Date().toISOString()
                });
                
                renderProjectTasks(currentProjectId); // Refresh the task board
                renderProjectOverview(currentProjectId); // Refresh the stats
                closeAddTaskModal();
                
                alert('Task created successfully!');
            }
        });
    }

    addTaskOverlay.addEventListener('click', (e) => {
        if (e.target === addTaskOverlay) {
            closeAddTaskModal();
        }
    });

    // ===== VIDEO CONFERENCE =====
    const videoCallOverlay = document.getElementById('video-call-overlay');
    const videoCallModal = document.getElementById('video-call-modal');
    const startVideoCallBtn = document.getElementById('start-video-call-btn');
    const closeVideoCall = document.getElementById('close-video-call');
    const endCallBtn = document.getElementById('end-call-btn');
    const toggleMicBtn = document.getElementById('toggle-mic-btn');
    const toggleCameraBtn = document.getElementById('toggle-camera-btn');
    const shareScreenBtn = document.getElementById('share-screen-btn');
    const toggleParticipantsBtn = document.getElementById('toggle-participants-btn');

    const videoParticipantsSidebar = document.getElementById('video-participants-sidebar');
    const closeParticipantsBtn = document.getElementById('close-participants-sidebar');

    if (closeParticipantsBtn) {
        closeParticipantsBtn.addEventListener('click', () => {
            videoParticipantsSidebar.classList.remove('active');
        });
    }
    
    // State variables for the video call
    let callDuration = 0;
    let callTimer = null;
    let isMicOn = true;
    let isCameraOn = true;
    let isScreenSharing = false;

    // Function to start the video call UI
    const startVideoCall = () => {
        videoCallOverlay.classList.add('active');
        videoCallModal.classList.add('active');
        
        // Start a timer to show call duration
        callDuration = 0;
        callTimer = setInterval(() => {
            callDuration++;
            const minutes = Math.floor(callDuration / 60);
            const seconds = callDuration % 60;
            document.getElementById('call-duration').textContent = 
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    };

    // Function to end the video call and reset the UI
    const endVideoCall = () => {
        videoCallOverlay.classList.remove('active');
        videoCallModal.classList.remove('active');
        
        if (callTimer) {
            clearInterval(callTimer);
            callTimer = null;
        }
        
        // Reset all buttons and states
        isMicOn = true;
        isCameraOn = true;
        isScreenSharing = false;
        toggleMicBtn.classList.remove('active');
        toggleCameraBtn.classList.remove('active');
        shareScreenBtn.classList.remove('active');
        videoParticipantsSidebar.classList.remove('active');
    };

    if (startVideoCallBtn) {
        startVideoCallBtn.addEventListener('click', startVideoCall);
    }

    const startTeamVideoCallBtn = document.getElementById('start-team-video-call-btn');
    if (startTeamVideoCallBtn) {
        startTeamVideoCallBtn.addEventListener('click', () => {
            if (activeChat.type === 'team') {
                startTeamVideoCall(activeChat.id);
            }
        });
    }

    // Function to set up and start a call for a specific team
    const startTeamVideoCall = (teamId) => {
        const team = db.teams.find(t => t.id === teamId);
        const members = db.team_members.filter(m => m.team_id === teamId);
        
        document.getElementById('video-call-title').textContent = `${team.name} - Video Call`;
        document.querySelector('.participant-count').textContent = members.length;
        
        // Render team members in the video grid
        const videoGrid = document.getElementById('video-grid');
        videoGrid.innerHTML = members.map((member, index) => {
            const user = db.users[member.user_id];
            const isCurrentUser = user.id === currentUser.id;
            const isMuted = index % 2 === 1; // Simulate some muted users
            
            return `
                <div class="video-participant ${isCurrentUser ? 'active-speaker' : ''}">
                    <div class="video-placeholder">
                        <div class="avatar-large">${user.initials}</div>
                        <div class="video-overlay">
                            <span class="participant-name">${user.first_name} ${user.last_name}${isCurrentUser ? ' (You)' : ''}</span>
                            <span class="mic-status ${isMuted ? 'muted' : ''}">🎤</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Render participants in the sidebar list
        const participantsList = document.querySelector('.participants-list');
        participantsList.innerHTML = members.map((member, index) => {
            const user = db.users[member.user_id];
            const isCurrentUser = user.id === currentUser.id;
            const isMuted = index % 2 === 1;
            
            return `
                <div class="participant-item">
                    <div class="avatar">${user.initials}</div>
                    <span class="participant-name">${user.first_name} ${user.last_name}${isCurrentUser ? ' (You)' : ''}</span>
                    <span class="participant-status ${isMuted ? 'muted' : ''}">🎤</span>
                </div>
            `;
        }).join('');
        
        document.querySelector('#video-participants-sidebar h3').textContent = `Participants (${members.length})`;
        
        startVideoCall(); // Start the call UI
    };

    if (closeVideoCall) {
        closeVideoCall.addEventListener('click', () => {
            if (confirm('Are you sure you want to leave the call?')) {
                endVideoCall();
            }
        });
    }

    if (endCallBtn) {
        endCallBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to end the call for everyone?')) {
                endVideoCall();
                alert('Call ended');
            }
        });
    }
    
    // Video control button handlers
    if (toggleMicBtn) {
        toggleMicBtn.addEventListener('click', () => {
            isMicOn = !isMicOn;
            toggleMicBtn.classList.toggle('active', !isMicOn);
            
            const statusIcon = document.querySelector('.video-participant.active-speaker .mic-status');
            if (statusIcon) {
                statusIcon.textContent = isMicOn ? '🎤' : '🔇';
                statusIcon.classList.toggle('muted', !isMicOn);
            }
            
            console.log(isMicOn ? 'Microphone on' : 'Microphone muted');
        });
    }

    if (toggleCameraBtn) {
        toggleCameraBtn.addEventListener('click', () => {
            isCameraOn = !isCameraOn;
            toggleCameraBtn.classList.toggle('active', !isCameraOn);
            console.log(isCameraOn ? 'Camera on' : 'Camera off');
        });
    }

    if (shareScreenBtn) {
        shareScreenBtn.addEventListener('click', () => {
            isScreenSharing = !isScreenSharing;
            shareScreenBtn.classList.toggle('active', isScreenSharing);
            
            if (isScreenSharing) {
                alert('Screen sharing started (simulated)');
            } else {
                alert('Screen sharing stopped');
            }
        });
    }

    if (toggleParticipantsBtn) {
        toggleParticipantsBtn.addEventListener('click', () => {
            videoParticipantsSidebar.classList.toggle('active');
        });
    }

    videoCallOverlay.addEventListener('click', (e) => {
        if (e.target === videoCallOverlay) {
            if (confirm('Are you sure you want to leave the call?')) {
                endVideoCall();
            }
        }
    });

    // --- Dynamic Rendering Functions for Main Pages ---
    // These functions populate the main pages with data from the 'db' object.

    const renderDashboard = () => {
        const statsGrid = document.getElementById('stats-grid');
        if (!statsGrid) return;
        
        const activeIdeas = db.ideas.filter(i => i.status !== 'archived' && !i.is_deleted);
        const inProgressCount = activeIdeas.filter(i => i.status === 'in_progress').length;
        const completedCount = activeIdeas.filter(i => i.status === 'completed').length;
        const inReviewCount = activeIdeas.filter(i => i.status === 'review').length;

        statsGrid.innerHTML = `
            <div class="stat-card card"><div class="stat-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg></div><div class="stat-card-info"><h3>Active Ideas</h3><p class="stat-number">${activeIdeas.length}</p></div></div>
            <div class="stat-card card"><div class="stat-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><polyline points="12 6 12 12 16 14"></polyline></svg></div><div class="stat-card-info"><h3>In Progress</h3><p class="stat-number">${inProgressCount}</p></div></div>
            <div class="stat-card card"><div class="stat-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6.5A3.5 3.5 0 0 0 8.5 3A3.5 3.5 0 0 0 5 6.5a3.5 3.5 0 0 0 3.5 3.5h2a3.5 3.5 0 0 0 3.5-3.5zM15 17.5a3.5 3.5 0 0 0-3.5 3.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5a3.5 3.5 0 0 0-3.5-3.5zM8.5 14A3.5 3.5 0 0 0 5 17.5A3.5 3.5 0 0 0 8.5 21H12v-2.5a3.5 3.5 0 0 0-3.5-3.5z"/></svg></div><div class="stat-card-info"><h3>In Review</h3><p class="stat-number">${inReviewCount}</p></div></div>
            <div class="stat-card card"><div class="stat-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div><div class="stat-card-info"><h3>Completed</h3><p class="stat-number">${completedCount}</p></div></div>`;

        const recentIdeasList = document.getElementById('recent-ideas-list');
        if (!recentIdeasList) return;
        const sortedIdeas = activeIdeas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        recentIdeasList.innerHTML = sortedIdeas.length === 0 ? `<p>No recent ideas. Time to create something new!</p>` : sortedIdeas.slice(0, 3).map(idea => `
            <div class="idea-item" data-idea-id="${idea.id}" style="cursor: pointer;">
                <div class="idea-item-info">
                    ${encryptionIconHTML}
                    <div class="idea-item-details">
                        <h4>${idea.title_encrypted}</h4>
                        <p>Created: ${new Date(idea.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <span class="status-badge status-${idea.status.replace('_', '-')}">${idea.status.replace('_', ' ')}</span>
            </div>`).join('');
        
        document.querySelectorAll('.idea-item[data-idea-id]').forEach(item => {
            item.addEventListener('click', () => {
                const ideaId = parseInt(item.dataset.ideaId);
                openProjectWorkspace(ideaId);
            });
        });
    };

    const renderAllIdeas = () => {
        const tbody = document.getElementById('all-ideas-tbody');
        if (!tbody) return;
        const activeIdeas = db.ideas.filter(i => !i.is_deleted);

        tbody.innerHTML = activeIdeas.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem;">You haven't created any ideas yet.</td></tr>` : activeIdeas.map(idea => {
            const team = db.teams.find(t => t.id === idea.team_id);
            const contributors = db.idea_contributors.filter(c => c.idea_id === idea.id);
            
            const contributorsHTML = `<div class="contributors-list">${contributors.map(c => {
                const user = db.users[c.user_id];
                const tooltipText = `${user.first_name} (${c.role})`;
                return `<div class="contributor-avatar" title="${tooltipText}"><span class="tooltip">${tooltipText}</span>${user.initials}</div>`;
            }).join('')}</div>`;

            return `
            <tr data-id="${idea.id}">
                <td>
                    <div class="idea-title-cell">
                        ${encryptionIconHTML}
                        <span>${idea.title_encrypted}</span>
                    </div>
                </td>
                <td><span class="status-badge status-${idea.status.replace('_', '-')}">${idea.status.replace('_', ' ')}</span></td>
                <td>${team ? team.name : 'Personal'}</td>
                <td>${contributorsHTML}</td>
                <td>${new Date(idea.created_at).toLocaleDateString()}</td>
                <td class="action-buttons">
                    <button class="refine-btn" title="Refine">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                    </button>
                    <button class="manage-contributors-btn" title="Manage Contributors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
                    </button>
                    <button class="archive-btn" title="Archive">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                    </button>
                    <button class="delete-btn" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </td>
            </tr>`;
        }).join('');
    };

    const renderTeams = () => {
        const teamsList = document.getElementById('teams-list');
        if (!teamsList) return;
        teamsList.innerHTML = db.teams.map(team => `<li data-id="${team.id}">${team.name}</li>`).join('');
    };
    
    const renderTeamIdeas = (teamId) => {
        const teamIdeasList = document.getElementById('team-ideas-list');
        const relatedIdeas = db.ideas.filter(idea => idea.team_id === teamId && !idea.is_deleted);
        if(relatedIdeas.length > 0) {
            teamIdeasList.innerHTML = relatedIdeas.map(idea => `
                <div class="idea-item">
                    <div class="idea-item-info">
                        ${encryptionIconHTML}
                        <div class="idea-item-details">
                            <h4>${idea.title_encrypted}</h4>
                        </div>
                    </div>
                    <span class="status-badge status-${idea.status.replace('_','-')}">${idea.status.replace('_',' ')}</span>
                </div>`).join('');
        } else {
            teamIdeasList.innerHTML = `<p>No ideas found for this team.</p>`;
        }
    };

    const renderTeamDetails = (teamId) => {
        const team = db.teams.find(t => t.id == teamId);
        if (!team) return;
        document.getElementById('team-details-placeholder').classList.add('hidden');
        const contentEl = document.getElementById('team-details-content');
        contentEl.classList.remove('hidden');
        contentEl.dataset.activeTeamId = team.id;
        document.getElementById('selected-team-name').textContent = team.name;
        
        const members = db.team_members.filter(m => m.team_id === team.id);
        document.getElementById('team-members-list').innerHTML = members.map(m => {
            const user = db.users[m.user_id];
            return `<li>${user.first_name} ${user.last_name} <span class="role-badge role-${m.role.toLowerCase()}">${m.role}</span></li>`;
        }).join('');
        
        renderTeamIdeas(team.id);
    };

    const getIconForItem = (item) => {
        if (item.mime_type_encrypted) { // It's a file
            const mime = item.mime_type_encrypted;
            if (mime.startsWith('image/')) return '🖼️';
            if (mime === 'application/pdf') return '📄';
            if (mime.includes('spreadsheet') || mime.includes('excel')) return '📊';
            if (mime.includes('presentation') || mime.includes('powerpoint')) return '🖥️';
            if (mime.includes('document') || mime.includes('word')) return '📝';
            return '📎';
        }
        if (item.content_encrypted) return '🗒️'; // It's a note
        if (item.name_encrypted) return '📁'; // It's a folder
        return '❓';
    };
    
    const renderDriveSidebar = () => {
        const myDriveList = document.getElementById('my-drive-list');
        const teamDrivesList = document.getElementById('team-drives-list');
        const myDriveIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><line x1="12" y1="18" x2="12" y2="18"></line><path d="M12 14v-4"></path></svg>`;
        const teamDriveIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
        const folderIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;

        const myDriveFolders = db.drive_folders.filter(f => f.owner_id === currentUser.id && f.parent_folder_id === null && !f.is_deleted);
        myDriveList.innerHTML = `<li data-type="my-drive" data-id="null" class="${currentDriveLocation.type === 'my-drive' && currentDriveLocation.folderId === null ? 'active' : ''}">${myDriveIcon} <span>My Drive</span></li>` +
            myDriveFolders.map(folder => `<li data-type="my-drive" data-id="${folder.id}" class="${currentDriveLocation.type === 'my-drive' && currentDriveLocation.folderId === folder.id ? 'active' : ''}">${folderIcon} <span>${folder.name_encrypted}</span></li>`).join('');
        
        const userTeams = db.team_members.filter(m => m.user_id === currentUser.id).map(m => m.team_id);
        teamDrivesList.innerHTML = db.teams
            .filter(t => userTeams.includes(t.id))
            .map(team => `<li data-type="team-drive" data-id="${team.id}" class="${currentDriveLocation.type === 'team-drive' && currentDriveLocation.folderId === team.id ? 'active' : ''}">${teamDriveIcon} <span>${team.name}</span></li>`).join('');
    };
    
    const renderDriveContent = () => {
        const filesGrid = document.getElementById('files-grid');
        const breadcrumb = document.getElementById('drive-breadcrumb');
        
        let itemsInCurrentView = [];
        let breadcrumbHTML = '';

        // Helper to generate breadcrumb path for nested folders
        const getBreadcrumbPath = (folderId) => {
            let path = [];
            let currentFolder = db.drive_folders.find(f => f.id === folderId);
            while (currentFolder) {
                path.unshift(currentFolder);
                currentFolder = db.drive_folders.find(f => f.id === currentFolder.parent_folder_id);
            }
            return path;
        };

        if (currentDriveLocation.type === 'my-drive') {
            const folders = db.drive_folders.filter(f => f.owner_id === currentUser.id && f.parent_folder_id === currentDriveLocation.folderId && !f.is_deleted);
            const notes = db.notes.filter(n => n.owner_id === currentUser.id && n.folder_id === currentDriveLocation.folderId && !n.is_deleted);
            const files = db.drive_files.filter(f => f.owner_id === currentUser.id && f.folder_id === currentDriveLocation.folderId && !f.is_deleted);
            itemsInCurrentView = [...folders, ...notes, ...files];

            if (currentDriveLocation.folderId === null) {
                breadcrumbHTML = 'My Drive';
            } else {
                const path = getBreadcrumbPath(currentDriveLocation.folderId);
                breadcrumbHTML = `<span class="breadcrumb-link" data-type="my-drive" data-id="null">My Drive</span> / ` + path.map(f => `<span class="breadcrumb-link" data-type="my-drive" data-id="${f.id}">${f.name_encrypted}</span>`).join(' / ');
            }
        } else if (currentDriveLocation.type === 'team-drive') {
            const folders = db.drive_folders.filter(f => f.team_id === currentDriveLocation.folderId && f.parent_folder_id === null && !f.is_deleted);
            const files = db.drive_files.filter(f => f.team_id === currentDriveLocation.folderId && f.folder_id === null && !f.is_deleted);
            const notes = db.notes.filter(n => n.team_id === currentDriveLocation.folderId && n.folder_id === null && !n.is_deleted);
            itemsInCurrentView = [...folders, ...files, ...notes];

            const team = db.teams.find(t => t.id === currentDriveLocation.folderId);
            breadcrumbHTML = `Team Drive / ${team.name}`;
        }
        
        itemsInCurrentView.sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)); // Show pinned items first
        breadcrumb.innerHTML = breadcrumbHTML;

        if (itemsInCurrentView.length === 0) {
            filesGrid.innerHTML = `<p class="empty-folder-message">This location is empty.</p>`;
        } else {
            filesGrid.innerHTML = itemsInCurrentView.map(item => {
                const type = item.file_path ? 'file' : (item.content_encrypted ? 'note' : 'folder');
                const name = item.name_encrypted || item.filename_encrypted || item.title_encrypted;
                const icon = getIconForItem(item);
                const isNote = type === 'note';
                const isFolder = type === 'folder';
                const pinnedClass = item.is_pinned ? 'pinned' : '';
                return `
                <div class="file-item card ${pinnedClass}" data-id="${item.id}" data-type="${type}">
                    <div class="file-item-actions">
                        ${isFolder ? `<button class="item-action-btn download-item-btn" title="Download Folder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </button>` : ''}
                        ${isNote ? `<button class="item-action-btn pin-item-btn ${pinnedClass}" title="${item.is_pinned ? 'Unpin' : 'Pin'}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/></svg>
                        </button>` : ''}
                        <button class="item-action-btn delete-item-btn" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                    <div class="file-item-icon">${icon}</div>
                    <div class="file-item-name">
                        ${encryptionIconHTML}
                        <span>${name}</span>
                    </div>
                </div>`;
            }).join('');
        }
    };
    
    const renderBrandTrainingFiles = () => {
        const listEl = document.getElementById('brand-files-list');
        if (!listEl) return;
        if (db.brandTrainingFiles.length === 0) {
            listEl.innerHTML = `<p>No training files uploaded.</p>`;
        } else {
            listEl.innerHTML = db.brandTrainingFiles.map((fileName, index) => `
                <div class="brand-file-item" data-index="${index}">
                    <span>${fileName}</span>
                    <button class="delete-brand-file-btn" title="Delete File">&times;</button>
                </div>
            `).join('');
        }
    };

    const renderBackupSchedule = () => {
        const displayEl = document.getElementById('backup-schedule-display');
        const schedule = db.backup_schedules.find(s => s.user_id === currentUser.id);
        if (!displayEl) return;
        if (schedule && schedule.is_active) {
            document.getElementById('backup-schedule-name').value = schedule.schedule_name;
            document.getElementById('backup-type').value = schedule.backup_type;
            document.getElementById('backup-frequency').value = schedule.frequency;
            document.getElementById('backup-retention').value = schedule.retention_days;

            displayEl.innerHTML = `
                <p><strong>Current Status:</strong> Active</p>
                <p><strong>Schedule Name:</strong> ${schedule.schedule_name}</p>
                <p><strong>Frequency:</strong> ${schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1)}</p>
                <p><strong>Retention Policy:</strong> ${schedule.retention_days} days</p>
                <p><strong>Last Backup:</strong> ${new Date(schedule.last_backup_at).toLocaleString()}</p>
                <p><strong>Next Backup:</strong> ${new Date(schedule.next_backup_at).toLocaleString()}</p>
            `;
        } else {
            displayEl.innerHTML = `<p>No active backup schedule. Please create one below.</p>`;
        }
    };

    // Function to update the Drive view when a folder is clicked
    const updateDriveView = (type, folderId) => {
        currentDriveLocation = { type, folderId };
        renderDriveSidebar();
        renderDriveContent();
    };

    // --- NEW MESSAGES / CHAT PAGE LOGIC ---
    const renderConversationList = () => {
        const listEl = document.getElementById('conversation-list');
        if(!listEl) return;

        // --- Find and render Direct Messages ---
        const directMessagePartners = [...new Set(
            db.messages
                .filter(m => m.team_id === null && (m.sender_id === currentUser.id || m.receiver_id === currentUser.id))
                .map(m => m.sender_id === currentUser.id ? m.receiver_id : m.sender_id)
        )];
        
        let dmHtml = '<div class="conversation-group"><h3>Direct Messages</h3><ul>';
        directMessagePartners.forEach(userId => {
            const user = getUser(userId);
            const lastMessage = db.messages
                .filter(m => (m.sender_id === userId && m.receiver_id === currentUser.id) || (m.sender_id === currentUser.id && m.receiver_id === userId))
                .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0];
            
            const content = lastMessage.sender_id === currentUser.id ? lastMessage.content_sender : lastMessage.content_receiver;
            
            dmHtml += `
            <li class="conversation-item ${activeChat.type === 'user' && activeChat.id === userId ? 'active' : ''}" data-type="user" data-id="${userId}">
                ${createAvatar(user.initials)}
                <div class="conversation-info">
                    <div class="name">${user.first_name} ${user.last_name}</div>
                    <div class="last-message">${content}</div>
                </div>
            </li>`;
        });
        dmHtml += '</ul></div>';
        
        // --- Find and render Team Chats ---
        const userTeams = db.team_members.filter(m => m.user_id === currentUser.id).map(m => m.team_id);
        let teamHtml = '<div class="conversation-group"><h3>Team Channels</h3><ul>';
        db.teams
            .filter(t => userTeams.includes(t.id))
            .forEach(team => {
                const lastMessage = db.messages
                    .filter(m => m.team_id === team.id)
                    .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0];

                teamHtml += `
                <li class="conversation-item ${activeChat.type === 'team' && activeChat.id === team.id ? 'active' : ''}" data-type="team" data-id="${team.id}">
                    ${createAvatar(team.name.match(/\b(\w)/g).join('').substring(0,2))}
                    <div class="conversation-info">
                        <div class="name">${team.name}</div>
                        <div class="last-message">${lastMessage ? `${getUser(lastMessage.sender_id).first_name}: ${lastMessage.content_sender}` : 'No messages yet'}</div>
                    </div>
                </li>`;
        });
        teamHtml += '</ul></div>';

        listEl.innerHTML = dmHtml + teamHtml;
    };

    const renderChatView = (type, id) => {
        activeChat = { type, id };
        document.getElementById('chat-placeholder').classList.add('hidden');
        const chatView = document.getElementById('chat-view');
        chatView.classList.remove('hidden');

        const titleEl = document.getElementById('chat-title');
        const subtitleEl = document.getElementById('chat-subtitle');
        const messagesListEl = document.getElementById('chat-messages-list');
        const teamVideoCallBtn = document.getElementById('start-team-video-call-btn');
        
        let messages = [];
        if (type === 'user') {
            const user = getUser(id);
            titleEl.textContent = `${user.first_name} ${user.last_name}`;
            subtitleEl.textContent = `@${user.username}`;
            messages = db.messages.filter(m => (m.sender_id === id && m.receiver_id === currentUser.id) || (m.sender_id === currentUser.id && m.receiver_id === id));
            
            if (teamVideoCallBtn) teamVideoCallBtn.style.display = 'none'; // Hide video call button for DMs
        } else { // It's a team chat
            const team = db.teams.find(t => t.id === id);
            titleEl.textContent = team.name;
            const members = db.team_members.filter(m => m.team_id === id);
            subtitleEl.textContent = `${members.length} members`;
            messages = db.messages.filter(m => m.team_id === id);
            
            if (teamVideoCallBtn) teamVideoCallBtn.style.display = 'inline-flex'; // Show video call button for teams
        }
        
        messages.sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
        messagesListEl.innerHTML = messages.map(msg => {
            const sender = getUser(msg.sender_id);
            return `
            <div class="message-group">
                ${createAvatar(sender.initials)}
                <div class="message-content">
                    <div>
                        <span class="author">${sender.first_name} ${sender.last_name}</span>
                        <span class="timestamp">${new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p class="text">${msg.content_sender}</p>
                </div>
            </div>`;
        }).join('');
        
        messagesListEl.scrollTop = messagesListEl.scrollHeight; // Scroll to the latest message
        renderConversationList(); // Update the active state in the conversation list
    };
    
    // --- Event Handlers & Actions for various buttons ---
    // This uses event delegation on the table body for efficiency.
    document.getElementById('all-ideas-tbody')?.addEventListener('click', e => {
        const row = e.target.closest('tr');
        if (!row) return;
        const ideaId = parseInt(row.dataset.id);
        const idea = db.ideas.find(i => i.id === ideaId);

        if (e.target.closest('.delete-btn')) {
            if (confirm('Are you sure you want to permanently delete this idea?')) {
                idea.is_deleted = true;
                renderAllIdeas(); renderDashboard();
            }
        } else if (e.target.closest('.archive-btn')) {
            idea.status = 'archived';
            renderAllIdeas(); renderDashboard();
        } else if (e.target.closest('.refine-btn')) {
            document.getElementById('refine-page-title').textContent = `Refine: ${idea.title_encrypted}`;
            document.getElementById('refine-textarea').value = idea.content_encrypted;
            document.querySelector('#refine-editor-page').dataset.ideaId = idea.id;
            showPage('refine-editor-page');
        } else if (e.target.closest('.manage-contributors-btn')) {
            renderContributorsModal(ideaId);
            openModal('manage-contributors-modal');
        } else if (!e.target.closest('.action-buttons')) {
            // If the row is clicked but not an action button, open the workspace
            openProjectWorkspace(ideaId);
        }
    });
    
    // Handle the "Generate Drafts" form
    document.getElementById('idea-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('project-title').value;
        const resultsContainer = document.getElementById('results-grid-container');
        document.getElementById('results-page-title').textContent = `Generated Drafts for "${title}"`;
        resultsContainer.innerHTML = '<div class="loading-state"><h4>Generating creative drafts...</h4><div class="spinner"></div></div>';
        showPage('draft-results-page');
        setTimeout(() => { // Simulate a delay for AI generation
            resultsContainer.innerHTML = Array.from({ length: 3 }, (_, i) => `
                <div class="result-card card">
                    <p><strong>Variation ${i + 1}:</strong> This is a unique, AI-generated creative direction for "${title}". It explores a different angle to capture the target audience's attention.</p>
                    <div class="result-card-actions"><button class="btn btn-primary btn-sm refine-result-btn">Select & Refine</button></div>
                </div>`).join('');
        }, 1500);
    });

    document.getElementById('idea-cancel-btn')?.addEventListener('click', () => showPage('dashboard-page'));
    
    // Handle clicking "Select & Refine" on a generated draft
    document.getElementById('results-grid-container')?.addEventListener('click', e => {
        if (e.target.classList.contains('refine-result-btn')) {
            const card = e.target.closest('.result-card');
            const newContent = card.querySelector('p').textContent;
            const newTitle = document.getElementById('project-title').value;
            const newDescription = document.getElementById('project-description').value;
            const now = new Date().toISOString();
            
            // Create a new idea object and add it to the database
            const newIdea = { 
                id: Date.now(), title_encrypted: newTitle, description_encrypted: newDescription,
                content_encrypted: newContent, owner_id: currentUser.id, team_id: null,
                status: 'draft', encryption_iv: 'new-iv', encryption_tag: 'new-tag',
                created_at: now, updated_at: now, is_deleted: false
            };
            db.ideas.unshift(newIdea);
            db.idea_contributors.push({ id: Date.now(), idea_id: newIdea.id, user_id: currentUser.id, role: 'editor', added_at: now, added_by: currentUser.id });
            db.idea_versions[newIdea.id] = [{ id: Date.now(), idea_id: newIdea.id, version_number: 1, content_encrypted: newContent, encryption_iv: 'new-iv', encryption_tag: 'new-tag', created_by: currentUser.id, created_at: now, change_description_encrypted: 'Initial AI-generated draft.' }];
            
            // Navigate to the refine editor page with the new content
            document.getElementById('refine-page-title').textContent = `Refine: ${newIdea.title_encrypted}`;
            document.getElementById('refine-textarea').value = newContent;
            document.querySelector('#refine-editor-page').dataset.ideaId = newIdea.id;
            showPage('refine-editor-page');
            renderDashboard(); renderAllIdeas();
        }
    });

    // Open the "Save New Version" modal
    document.getElementById('save-final-idea-btn')?.addEventListener('click', () => openModal('save-version-modal'));

    // Handle saving a new version from the refine editor
    document.getElementById('save-version-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const ideaId = parseInt(document.querySelector('#refine-editor-page').dataset.ideaId);
        const idea = db.ideas.find(i => i.id === ideaId);
        if (idea) {
            const newContent = document.getElementById('refine-textarea').value;
            const changeDescription = document.getElementById('version-description').value || 'No description provided.';
            
            if (idea.content_encrypted !== newContent) {
                const now = new Date().toISOString();
                idea.content_encrypted = newContent;
                idea.updated_at = now;
                if(idea.status === 'draft') idea.status = 'in_progress';
                
                const versions = db.idea_versions[ideaId] || [];
                const newVersionNumber = versions.length > 0 ? Math.max(...versions.map(v => v.version_number)) + 1 : 1;
                versions.push({ id: Date.now(), idea_id: ideaId, version_number: newVersionNumber, content_encrypted: newContent, encryption_iv: '...', encryption_tag: '...', created_by: currentUser.id, created_at: now, change_description_encrypted: changeDescription });
                db.idea_versions[ideaId] = versions;

                console.log(`Idea "${idea.title_encrypted}" saved with a new version!`);
            } else {
                console.log('No changes detected. Save cancelled.');
            }
            renderAllIdeas(); renderDashboard();
            closeModal();
            showPage('my-ideas-page');
            e.target.reset();
        }
    });

    document.getElementById('dashboard-create-new-btn')?.addEventListener('click', () => showPage('create-idea-page'));

    // Handle clicking on a team in the teams list
    document.getElementById('teams-list')?.addEventListener('click', e => {
        if (e.target.tagName === 'LI') {
            document.querySelectorAll('#teams-list li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
            renderTeamDetails(parseInt(e.target.dataset.id));
        }
    });

    // Handle the "Create New Team" form
    document.getElementById('create-team-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const teamNameInput = document.getElementById('team-name');
        const now = new Date().toISOString();
        const newTeam = { id: Date.now(), name: teamNameInput.value, description: '', owner_id: currentUser.id, team_key_encrypted: '...', created_at: now, updated_at: now, is_active: true };
        db.teams.push(newTeam);
        db.team_members.push({ id: Date.now(), team_id: newTeam.id, user_id: currentUser.id, role: 'owner', team_key_encrypted: '...', joined_at: now, added_by: currentUser.id, is_active: true });
        teamNameInput.value = '';
        renderTeams();
        console.log(`Team "${newTeam.name}" created!`);
    });

    // --- NEW Message Page Handlers ---
    document.getElementById('conversation-list')?.addEventListener('click', e => {
        const item = e.target.closest('.conversation-item');
        if (item) {
            const type = item.dataset.type;
            const id = parseInt(item.dataset.id);
            renderChatView(type, id);
        }
    });

    document.getElementById('chat-input-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const input = document.getElementById('chat-message-input');
        const content = input.value.trim();
        if (!content || !activeChat.type) return;
        
        const now = new Date().toISOString();
        const newMessage = {
            id: Date.now(),
            sender_id: currentUser.id,
            receiver_id: activeChat.type === 'user' ? activeChat.id : null,
            team_id: activeChat.type === 'team' ? activeChat.id : null,
            subject: null,
            content_sender: content,
            content_receiver: activeChat.type === 'user' ? `(Encrypted for ${getUserName(activeChat.id)})` : null,
            is_read: false,
            read_at: null,
            created_at: now
        };
        db.messages.push(newMessage);
        input.value = '';
        renderChatView(activeChat.type, activeChat.id);
    });

    document.getElementById('start-conversation-btn')?.addEventListener('click', () => {
        const select = document.getElementById('conversation-recipient');
        select.innerHTML = Object.values(db.users)
            .filter(u => u.id !== currentUser.id)
            .map(u => `<option value="${u.id}">${getUserName(u.id)}</option>`)
            .join('');
        openModal('start-conversation-modal');
    });

    document.getElementById('start-conversation-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const recipientId = parseInt(document.getElementById('conversation-recipient').value);
        renderChatView('user', recipientId);
        closeModal();
    });
    
    // --- Drive Event Listeners ---
    document.querySelector('.drive-sidebar')?.addEventListener('click', e => {
        const listItem = e.target.closest('li');
        if (listItem) {
            const type = listItem.dataset.type;
            const id = listItem.dataset.id === 'null' ? null : parseInt(listItem.dataset.id);
            updateDriveView(type, id);
        }
    });
    
    document.getElementById('drive-breadcrumb')?.addEventListener('click', e => {
        const link = e.target.closest('.breadcrumb-link');
        if (link) {
            const type = link.dataset.type;
            const id = link.dataset.id === 'null' ? null : parseInt(link.dataset.id);
            updateDriveView(type, id);
        }
    });

    document.getElementById('upload-file-btn')?.addEventListener('click', () => document.getElementById('file-upload-input').click());
    document.getElementById('file-upload-input')?.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            Array.from(e.target.files).forEach(file => {
                if (file.size > 10 * 1024 * 1024) { // 10MB limit
                    console.warn(`File "${file.name}" exceeds the 10MB size limit and was not uploaded.`);
                    return;
                }
                const now = new Date().toISOString();
                const newFile = { 
                    id: Date.now(), filename_encrypted: file.name, file_path: `uuid-path-${Date.now()}`,
                    file_size: file.size, mime_type_encrypted: file.type,
                    owner_id: currentDriveLocation.type === 'my-drive' ? currentUser.id : null,
                    team_id: currentDriveLocation.type === 'team-drive' ? currentDriveLocation.folderId : null,
                    folder_id: currentDriveLocation.folderId, encryption_iv: '...', encryption_tag: '...', checksum: '...',
                    created_at: now, updated_at: now, is_deleted: false, metadata_stripped: true
                };
                db.drive_files.push(newFile);
            });
            renderDriveContent();
        }
    });
    
    document.getElementById('files-grid')?.addEventListener('click', e => {
        const itemEl = e.target.closest('.file-item');
        if (!itemEl) return;

        const itemId = parseInt(itemEl.dataset.id);
        const itemType = itemEl.dataset.type;
        let item;
        if(itemType === 'folder') item = db.drive_folders.find(i => i.id === itemId);
        if(itemType === 'note') item = db.notes.find(i => i.id === itemId);
        if(itemType === 'file') item = db.drive_files.find(i => i.id === itemId);
        if (!item) return;

        const actionBtn = e.target.closest('.item-action-btn');
        if (actionBtn) {
            const name = item.name_encrypted || item.filename_encrypted || item.title_encrypted;
            if (actionBtn.classList.contains('delete-item-btn')) {
                if (confirm(`Are you sure you want to delete "${name}"?`)) {
                    item.is_deleted = true;
                    renderDriveContent();
                }
            } else if (actionBtn.classList.contains('pin-item-btn')) {
                item.is_pinned = !item.is_pinned;
                renderDriveContent();
            } else if (actionBtn.classList.contains('download-item-btn')) {
                console.log(`Simulating download of folder "${name}" as a .zip file.`);
            }
        } else {
            if (itemType === 'folder') {
                updateDriveView(currentDriveLocation.type, itemId);
            } else {
                document.getElementById('view-content-title').textContent = item.name_encrypted || item.filename_encrypted || item.title_encrypted;
                document.getElementById('view-content-body').textContent = item.content_encrypted || `Simulated content for ${item.filename_encrypted}`;
                openModal('view-content-modal');
            }
        }
    });

    // --- Settings Forms Handlers ---
    document.getElementById('change-password-form')?.addEventListener('submit', e => { 
        e.preventDefault(); 
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        
        if (currentPassword && newPassword) {
            alert('Password updated successfully! (In production, this would update your password)');
            e.target.reset();
        }
    });

    document.getElementById('change-email-form')?.addEventListener('submit', e => { 
        e.preventDefault(); 
        const newEmail = document.getElementById('new-email').value;
        const password = document.getElementById('email-change-password').value;
        
        if (!newEmail || !password) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (confirm(`Are you sure you want to change your email to ${newEmail}?\n\nA verification email will be sent to the new address.`)) {
            alert('Email update request submitted!\n\nPlease check your new email address for a verification link.\n\n(In production, this would verify your password and send a confirmation email)');
            document.getElementById('new-email').value = '';
            document.getElementById('email-change-password').value = '';
        }
    });
    
    document.getElementById('mfa-toggle-checkbox')?.addEventListener('change', e => console.log(`MFA ${e.target.checked ? 'enabled' : 'disabled'}! (simulation)`));
    
    document.getElementById('backup-schedule-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const schedule = db.backup_schedules.find(s => s.user_id === currentUser.id);
        if(schedule) {
            schedule.is_active = true;
            schedule.schedule_name = document.getElementById('backup-schedule-name').value;
            schedule.backup_type = document.getElementById('backup-type').value;
            schedule.frequency = document.getElementById('backup-frequency').value;
            schedule.retention_days = parseInt(document.getElementById('backup-retention').value);
            schedule.last_backup_at = new Date().toISOString();
            
            let nextDate = new Date();
            if (schedule.frequency === 'daily') nextDate.setDate(nextDate.getDate() + 1);
            if (schedule.frequency === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
            if (schedule.frequency === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);
            schedule.next_backup_at = nextDate.toISOString();
            schedule.updated_at = new Date().toISOString();

            console.log('Backup schedule saved!');
            renderBackupSchedule();
        }
    });

    document.getElementById('upload-brand-data-btn')?.addEventListener('click', () => document.getElementById('brand-data-input').click());
    document.getElementById('brand-data-input')?.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            Array.from(e.target.files).forEach(file => db.brandTrainingFiles.push(file.name));
            renderBrandTrainingFiles();
        }
    });
    
    document.getElementById('brand-files-list')?.addEventListener('click', e => {
        if (e.target.closest('.delete-brand-file-btn')) {
            const item = e.target.closest('.brand-file-item');
            const index = parseInt(item.dataset.index);
            db.brandTrainingFiles.splice(index, 1);
            renderBrandTrainingFiles();
        }
    });

    document.getElementById('export-data-btn')?.addEventListener('click', () => {
        console.log("Preparing your data for export... (simulation)");
    });

    // --- MODAL LOGIC (for all general modals) ---
    const modalOverlay = document.getElementById('modal-overlay');
    const allModals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('#modal-overlay .close-modal-btn');
    const openModal = (modalId) => { modalOverlay.classList.add('active'); document.getElementById(modalId)?.classList.add('active'); };
    const closeModal = () => { modalOverlay.classList.remove('active'); allModals.forEach(modal => modal.classList.remove('active')); };
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

    document.getElementById('create-note-btn')?.addEventListener('click', () => openModal('create-note-modal'));
    document.getElementById('create-note-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;
        const now = new Date().toISOString();
        const newNote = { 
            id: Date.now(), title_encrypted: title, content_encrypted: content, 
            owner_id: currentUser.id, team_id: null,
            folder_id: currentDriveLocation.type === 'my-drive' ? currentDriveLocation.folderId : null, 
            encryption_iv: '...', encryption_tag: '...',
            created_at: now, updated_at: now,
            is_deleted: false, is_pinned: false
        };
        db.notes.push(newNote);
        renderDriveContent();
        closeModal();
        e.target.reset();
    });

    document.getElementById('create-folder-btn')?.addEventListener('click', () => openModal('create-folder-modal'));
    document.getElementById('create-folder-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const folderName = document.getElementById('folder-name').value;
        const now = new Date().toISOString();
        const newFolder = { 
            id: Date.now(), name_encrypted: folderName,
            owner_id: currentUser.id, team_id: null,
            parent_folder_id: currentDriveLocation.type === 'my-drive' ? currentDriveLocation.folderId : null, 
            encryption_iv: '...',
            created_at: now, updated_at: now, is_deleted: false
        };
        db.drive_folders.push(newFolder);
        if (currentDriveLocation.type === 'my-drive') renderDriveSidebar();
        renderDriveContent();
        closeModal();
        e.target.reset();
    });
    
    // --- Version History Modal ---
    document.getElementById('view-versions-btn')?.addEventListener('click', () => {
        const ideaId = parseInt(document.querySelector('#refine-editor-page').dataset.ideaId);
        const versions = db.idea_versions[ideaId] || [];
        const versionList = document.getElementById('version-list');
        
        if (versions.length > 0) {
            versionList.innerHTML = versions.slice().reverse().map(v => 
                `<li data-version="${v.version_number}">
                    <strong>Version ${v.version_number}</strong> - ${new Date(v.created_at).toLocaleString()}
                    <span class="version-meta">By: ${getUserName(v.created_by)} - ${v.change_description_encrypted}</span>
                </li>`
            ).join('');
        } else {
            versionList.innerHTML = '<li>No previous versions found.</li>';
        }
        
        document.getElementById('version-preview-content').textContent = 'Select a version to preview its content.';
        document.getElementById('restore-version-btn').disabled = true;
        openModal('version-history-modal');
    });

    document.getElementById('version-list')?.addEventListener('click', e => {
        const listItem = e.target.closest('li');
        if (listItem && listItem.dataset.version) {
            document.querySelectorAll('#version-list li').forEach(li => li.classList.remove('active'));
            listItem.classList.add('active');

            const ideaId = parseInt(document.querySelector('#refine-editor-page').dataset.ideaId);
            const versionNum = parseInt(listItem.dataset.version);
            const version = db.idea_versions[ideaId].find(v => v.version_number === versionNum);
            
            document.getElementById('version-preview-content').textContent = version.content_encrypted;
            
            const restoreBtn = document.getElementById('restore-version-btn');
            restoreBtn.disabled = false;
            restoreBtn.dataset.content = version.content_encrypted;
        }
    });

    document.getElementById('restore-version-btn')?.addEventListener('click', e => {
        const contentToRestore = e.target.dataset.content;
        if (contentToRestore) {
            document.getElementById('refine-textarea').value = contentToRestore;
            console.log('Content has been restored to the editor.');
            closeModal();
        }
    });
    
    // --- Manage Contributors Modal ---
    const renderContributorsModal = (ideaId) => {
        const modal = document.getElementById('manage-contributors-modal');
        modal.dataset.ideaId = ideaId;
        const idea = db.ideas.find(i => i.id === ideaId);
        document.getElementById('contributors-modal-title').textContent = `Contributors for "${idea.title_encrypted}"`;
        
        const listEl = document.getElementById('contributors-list-modal');
        const contributors = db.idea_contributors.filter(c => c.idea_id === ideaId);
        listEl.innerHTML = contributors.map(c => `
            <li class="contributor-item-modal" data-user-id="${c.user_id}">
                <span><strong>${getUserName(c.user_id)}</strong> - ${c.role}</span>
                ${c.user_id !== idea.owner_id ? `<button class="remove-contributor-btn">&times;</button>` : '<span>(Owner)</span>'}
            </li>
        `).join('');

        const userSelect = document.getElementById('contributor-user');
        const existingUserIds = contributors.map(c => c.user_id);
        userSelect.innerHTML = Object.values(db.users)
            .filter(u => !existingUserIds.includes(u.id))
            .map(u => `<option value="${u.id}">${u.first_name} (${u.username})</option>`).join('');
    };
    
    document.getElementById('manage-contributors-modal')?.addEventListener('click', e => {
        if (e.target.classList.contains('remove-contributor-btn')) {
            const ideaId = parseInt(e.target.closest('.modal').dataset.ideaId);
            const userId = parseInt(e.target.closest('li').dataset.userId);
            db.idea_contributors = db.idea_contributors.filter(c => !(c.idea_id === ideaId && c.user_id === userId));
            renderContributorsModal(ideaId);
            renderAllIdeas();
        }
    });
    
    document.getElementById('add-contributor-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const ideaId = parseInt(e.target.closest('.modal').dataset.ideaId);
        const userId = parseInt(document.getElementById('contributor-user').value);
        const role = document.getElementById('contributor-role').value;
        if (ideaId && userId && role) {
             db.idea_contributors.push({ id: Date.now(), idea_id: ideaId, user_id: userId, role: role, added_at: new Date().toISOString(), added_by: currentUser.id });
             renderContributorsModal(ideaId);
             renderAllIdeas();
        }
    });

    // --- INITIAL LOAD ---
    // This function runs once when the script loads to populate all the dynamic parts of the UI.
    const init = () => {
        renderDashboard();
        renderAllIdeas();
        renderTeams();
        renderBrandTrainingFiles();
        renderBackupSchedule();
        updateDriveView('my-drive', null);
        renderConversationList();
        populateTeamSelect();
        showPage('dashboard-page');
    };
    init();
});