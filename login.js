
// Sign up functionality
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

    // Check if username or email already exists
    if (users.some(u => u.username === username)) {
        warning.textContent = 'Username already exists';
        return;
    }

    if (users.some(u => u.email === email)) {
        warning.textContent = 'Email already registered';
        return;
    }

    // Add new user
    users.push({ email, username, password });
    saveUsers(users);

    alert('Account created successfully! Please login.');
    showForm(loginForm);

    // Clear form
    document.getElementById('signUpEmail').value = '';
    document.getElementById('signUpUsername').value = '';
    document.getElementById('signUpPassword').value = '';
    document.getElementById('signUpConfirmPassword').value = '';
});