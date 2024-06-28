// script.js

document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const strength = checkPasswordStrength(password);

    displayResult(strength);
});

function checkPasswordStrength(password) {
    let strength = 0;

    // Check length
    if (password.length >= 8) {
        strength += 1;
    }
    if (password.length >= 12) {
        strength += 1;
    }

    // Check character types
    const regex = {
        lowercase: /[a-z]/,
        uppercase: /[A-Z]/,
        numbers: /[0-9]/,
        symbols: /[^A-Za-z0-9]/
    };

    if (regex.lowercase.test(password)) {
        strength += 1;
    }
    if (regex.uppercase.test(password)) {
        strength += 1;
    }
    if (regex.numbers.test(password)) {
        strength += 1;
    }
    if (regex.symbols.test(password)) {
        strength += 1;
    }

    // Calculate entropy (optional)
    const entropy = calculateEntropy(password);
    if (entropy >= 40) {
        strength += 1;
    }

    return strength;
}

function calculateEntropy(password) {
    // Simple entropy calculation based on character set size and password length
    const charsetSize = 95; // ASCII printable characters
    const passwordLength = password.length;

    return passwordLength * Math.log2(charsetSize);
}

function displayResult(strength) {
    const resultElement = document.getElementById('result');
    let message;

    switch (strength) {
        case 0:
        case 1:
            message = 'Weak';
            break;
        case 2:
        case 3:
            message = 'Moderate';
            break;
        case 4:
        case 5:
            message = 'Strong';
            break;
        default:
            message = 'Very Strong';
            break;
    }

    resultElement.textContent = `Password Strength: ${message}`;
}
