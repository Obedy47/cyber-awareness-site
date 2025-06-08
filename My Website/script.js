const passwordInput = document.getElementById('password');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.getElementById('strength-text');
const passwordRequirements = document.getElementById('password-requirements');
const lengthRequirement = document.getElementById('length-requirement');
const uppercaseRequirement = document.getElementById('uppercase-requirement');
const lowercaseRequirement = document.getElementById('lowercase-requirement');
const numberRequirement = document.getElementById('number-requirement');
const specialRequirement = document.getElementById('special-requirement');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);
    updateStrengthBar(strength);
    updatePasswordRequirements(password);
});

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

function updateStrengthBar(strength) {
    const strengthPercentage = (strength / 5) * 100;
    strengthBar.style.width = ${strengthPercentage}%;
    if (strengthPercentage < 30) {
        strengthBar.style.backgroundColor = '#FF0000';
        strengthText.textContent = 'Weak';
    } else if (strengthPercentage < 60) {
        strengthBar.style.backgroundColor = '#FFFF00';
        strengthText.textContent = 'Medium';
    } else {
        strengthBar.style.backgroundColor = '#4CAF50';
        strengthText.textContent = 'Strong';
    }
}

function updatePasswordRequirements(password) {
    if (password.length >= 8) {
        lengthRequirement.classList.add('valid');
    } else {
        lengthRequirement.classList.remove('valid');
    }
    if (/[A-Z]/.test(password)) {
        uppercaseRequirement.classList.add('valid');
    } else {
        uppercaseRequirement.classList.remove('valid');
    }
    if (/[a-z
```