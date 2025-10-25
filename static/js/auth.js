document.addEventListener('DOMContentLoaded', () => {

    // ===== DUMMY DATABASE (Based on your provided schema) =====
    // In a real app, this would be replaced by API calls to your backend.
    const db = {
        users: [
            {
                id: 101,
                email: 'creative.user@example.com',
                username: 'CreativeUser',
                password_hash: 'password123', // Storing plain text for simulation ONLY. NEVER do this in production.
                first_name: 'Creative',
                last_name: 'User',
                is_admin: false,
                is_active: true,
            },
            {
                id: 102,
                email: 'admin.user@example.com',
                username: 'AdminUser',
                password_hash: 'adminpass',
                first_name: 'Admin',
                last_name: 'Person',
                is_admin: true,
                is_active: true,
            }
        ]
    };

    // ===== HELPER FUNCTIONS =====
    
    // Function to create a user session in sessionStorage
    const createSession = (user) => {
        // In a real app, you'd store a JWT (JSON Web Token) here.
        const sessionData = {
            loggedIn: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                first_name: user.first_name,
                is_admin: user.is_admin,
            }
        };
        // sessionStorage is cleared when the tab is closed.
        sessionStorage.setItem('genesis-session', JSON.stringify(sessionData));
    };

    // Redirect to the dashboard
    const redirectToDashboard = () => {
        window.location.href = 'user-dashboard.html';
    };

    // ===== FORM HANDLERS =====

    // Handle Login Form Submission
    const handleLogin = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = db.users.find(u => u.email === email && u.password_hash === password);

        if (user) {
            if (user.is_active) {
                alert(`Welcome back, ${user.first_name}!`);
                createSession(user);
                redirectToDashboard();
            } else {
                alert('Your account is inactive. Please contact support.');
            }
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    // Handle Signup Form Submission
    const handleSignup = (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('signup-password').value;

        // Check if user already exists
        if (db.users.some(u => u.email === email)) {
            alert('An account with this email already exists. Please sign in.');
            return;
        }

        // Create a new user object (simulating DB insertion)
        const newUser = {
            id: Date.now(), // simple unique ID for simulation
            email: email,
            username: username,
            password_hash: password,
            first_name: firstName,
            last_name: lastName,
            is_admin: false,
            is_active: true, // Auto-activate for simulation
        };

        db.users.push(newUser);
        console.log("New user added to dummy DB:", newUser);

        alert(`Account created successfully for ${firstName}! You are now being logged in.`);
        createSession(newUser);
        redirectToDashboard();
    };

    // Handle Forgot Password Form Submission
    const handleForgotPassword = (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        alert(`If an account exists for ${email}, a password reset link has been sent. (Simulation)`);
        showForm('login-card'); // Switch back to login form
    };

    // Attach event listeners to forms
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('signup-form')?.addEventListener('submit', handleSignup);
    document.getElementById('forgot-form')?.addEventListener('submit', handleForgotPassword);

    // ===== UI LOGIC (Moved from auth.html) =====

    // Toggle Theme
    (function () {
        const theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
    })();

    // Orb Animation Generator
    const orb = document.getElementById('auth-orb');
    if (orb) {
        const rings = 12;
        for (let i = 0; i < rings; i++) {
            const ring = document.createElement('div');
            ring.className = 'orb-ring';
            const angle = (i / rings) * 180;
            const color = `color-mix(in srgb, var(--accent-start) ${100 - i * 6}%, var(--accent-end))`;
            ring.style.transform = `rotateY(${angle}deg) scale(${1 - Math.sin(angle * Math.PI / 180) * 0.2})`;
            ring.style.borderColor = color;
            orb.appendChild(ring);
        }
    }

    // Form Switching Logic
    const allCards = document.querySelectorAll('.auth-card');
    const showForm = (formId) => {
        allCards.forEach(card => card.classList.remove('is-active'));
        const activeCard = document.getElementById(formId);
        if (activeCard) activeCard.classList.add('is-active');
    };

    const currentHash = window.location.hash;
    if (currentHash === '#signup') {
        showForm('signup-card');
    } else {
        showForm('login-card');
    }

    document.querySelector('.auth-form-panel').addEventListener('click', (e) => {
        const targetLink = e.target.closest('[data-action]');
        if (targetLink) {
            e.preventDefault();
            const action = targetLink.dataset.action;
            if (action === 'show-login') showForm('login-card');
            if (action === 'show-signup') showForm('signup-card');
            if (action === 'show-forgot') showForm('forgot-card');
        }
    });

    // Password Visibility Toggle Logic
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            const eyeIcon = toggle.querySelector('.eye-icon');
            const eyeSlashIcon = toggle.querySelector('.eye-slash-icon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.style.display = 'none';
                eyeSlashIcon.style.display = 'block';
            } else {
                passwordInput.type = 'password';
                eyeIcon.style.display = 'block';
                eyeSlashIcon.style.display = 'none';
            }
        });
    });
});