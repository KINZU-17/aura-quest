// Form switching functionality
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
const forgetPasswordForm = document.getElementById('forgetPasswordForm');

const signUpLink = document.getElementById('signUpLink');
const loginLink = document.getElementById('loginLink');
const forgetPasswordLink = document.getElementById('forgetPasswordLink');
const backToLoginLink = document.getElementById('backToLoginLink');

function showForm(formToShow) {
    loginForm.classList.remove('active');
    signUpForm.classList.remove('active');
    forgetPasswordForm.classList.remove('active');
    formToShow.classList.add('active');

    // Clear any error messages when switching forms
    ['loginWarning', 'signUpWarning', 'forgetWarning'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = '';
            el.classList.remove('show');
        }
    });
}

// Theme initialization
(function initTheme() {
    try {
        const saved = localStorage.getItem('auraQuest_theme');
        if (saved === 'light' || saved === 'dark') {
            document.documentElement.setAttribute('data-theme', saved);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    } catch (e) {
        console.warn('Theme init failed:', e);
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(signUpForm);
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(loginForm);
});

forgetPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(forgetPasswordForm);
});

backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(loginForm);
});

// User data storage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Login - MANDATORY ACCESS
const btn = document.getElementById('vanishBtn');
const userInp = document.getElementById('username');
const passInp = document.getElementById('password');

// Evasive button
btn.addEventListener('mouseover', () => {
    if (userInp.value.trim() === "" || passInp.value.trim() === "") {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
        setTimeout(() => {
            btn.classList.remove('pop-up');
            void btn.offsetWidth;
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
            btn.classList.add('pop-up');
        }, 600);
    }
});

// Login - redirects to app ONLY on success
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loginWarning = document.getElementById('loginWarning');
    loginWarning.textContent = '';
    loginWarning.classList.remove('show');

    const username = userInp.value.trim();
    const password = passInp.value.trim();

    if (username === "" || password === "") {
        showLoginError('Please enter your username and password.');
        return;
    }

    const users = getUsers();
    const userExists = users.find(u => u.username === username);
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Save session
        localStorage.setItem('activeSession', JSON.stringify({
            username: user.username,
            email: user.email,
            loggedInAt: new Date().toISOString()
        }));
        // Link any guest progress
        const guestData = localStorage.getItem('auraQuest_Warrior');
        if (guestData) {
            localStorage.setItem(`auraQuest_${user.username}`, guestData);
        }
        window.location.href = 'index.html';
    } else if (userExists) {
        // Username is right but the password is wrong
        showLoginError('Incorrect password. Please try again.');
        passInp.value = '';
        passInp.focus();
    } else {
        showLoginError("No account found with that username. Please create an account.");
    }
});

function showLoginError(message) {
    const loginWarning = document.getElementById('loginWarning');
    loginWarning.textContent = message;
    loginWarning.classList.add('show');
    // Re-trigger the shake animation
    loginWarning.classList.remove('shake');
    void loginWarning.offsetWidth;
    loginWarning.classList.add('shake');
}

// Sign up - MANDATORY
// Only registered users can access the app
document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('signUpEmail').value.trim();
    const username = document.getElementById('signUpUsername').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();
    const confirmPassword = document.getElementById('signUpConfirmPassword').value.trim();
    const warning = document.getElementById('signUpWarning');

    warning.textContent = '';
    warning.classList.remove('success');

    if (!email || !username || !password || !confirmPassword) {
        warning.textContent = 'Please fill all fields';
        return;
    }

    if (password !== confirmPassword) {
        warning.textContent = 'Passwords do not match';
        return;
    }

    if (password.length < 6) {
        warning.textContent = 'Password must be at least 6 characters';
        return;
    }

    const users = getUsers();

    // Prevent duplicate usernames - usernames ARE your account
    if (users.some(u => u.username === username)) {
        warning.textContent = 'Username already exists. Choose another.';
        return;
    }

    if (users.some(u => u.email === email)) {
        warning.textContent = 'Email already registered.';
        return;
    }

    // Create account
    users.push({ email, username, password });
    saveUsers(users);

    // Auto-login after signup
    localStorage.setItem('activeSession', JSON.stringify({
        username: username,
        email: email,
        loggedInAt: new Date().toISOString()
    }));

    // Link any existing guest progress
    const guestData = localStorage.getItem('auraQuest_Warrior');
    if (guestData) {
        localStorage.setItem(`auraQuest_${username}`, guestData);
    }

    // Show a success banner, then head into the app
    warning.classList.add('success');
    warning.textContent = '🎉 Account created! Welcome to AuraQuest, ' + username + '!';
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1200);
});

// Forget password
document.getElementById('forgetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('forgetEmail').value.trim();
    const warning = document.getElementById('forgetWarning');

    warning.textContent = '';
    warning.classList.remove('success');

    if (!email) {
        warning.textContent = 'Please enter your email';
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        warning.classList.add('success');
        warning.textContent = '✅ Reset link sent to ' + email + '. (Demo: log in with this account.)';
        console.log('Reset code for ' + user.username + ': Use password to login');
        document.getElementById('forgetEmail').value = '';
        setTimeout(() => showForm(loginForm), 1800);
    } else {
        warning.textContent = 'Email not found. Please sign up for an account.';
    }
});
