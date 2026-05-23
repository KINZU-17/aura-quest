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
    if (userInp.value.trim() === "" || passInp.value.trim() === "") {
        alert("The button is trying to tell you something... Please fill the fields.");
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.username === userInp.value.trim() && u.password === passInp.value.trim());

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
        alert("Access Granted! Welcome to AuraQuest, " + user.username + "!");
        window.location.href = 'index.html';
    } else {
        alert("Invalid username or password. Please sign up if you don't have an account.");
    }
});

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

    alert('Account created! Welcome to AuraQuest, ' + username + '!');
    
    // Link any existing guest progress
    const guestData = localStorage.getItem('auraQuest_Warrior');
    if (guestData) {
        localStorage.setItem(`auraQuest_${username}`, guestData);
    }
    
    window.location.href = 'index.html';
});

// Forget password
document.getElementById('forgetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('forgetEmail').value.trim();
    const warning = document.getElementById('forgetWarning');

    warning.textContent = '';

    if (!email) {
        warning.textContent = 'Please enter your email';
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        alert('Password reset link sent to ' + email + '. (Demo: use this account to login)');
        console.log('Reset code for ' + user.username + ': Use password to login');
        showForm(loginForm);
    } else {
        warning.textContent = 'Email not found. Please sign up for an account.';
    }

    document.getElementById('forgetEmail').value = '';
});
